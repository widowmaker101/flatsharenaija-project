import { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { useLocation } from "react-router-dom"
import toast from "react-hot-toast"

const socket = io("http://localhost:3001")

export default function GroupChat() {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [file, setFile] = useState(null)
  const chatEndRef = useRef(null)
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const groupId = params.get("group")

  useEffect(() => {
    if (!groupId) return
    fetch(`http://localhost:3001/groups/${groupId}/messages`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setMessages(data))

    socket.on("newMessage", msg => {
      if (msg.group_id === parseInt(groupId)) {
        setMessages(prev => [...prev, msg])
        toast(`${msg.sender}: ${msg.text}`, { icon: "💬" })
      }
    })

    return () => {
      socket.off("newMessage")
    }
  }, [groupId])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    const formData = new FormData()
    formData.append("text", text)
    formData.append("group_id", groupId)
    if (file) formData.append("file", file)

    await fetch("http://localhost:3001/messages/upload", {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      body: formData
    })
    setText("")
    setFile(null)
  }

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-xl font-bold mb-2">Group Chat {groupId}</h1>
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map(m => (
          <div key={m.id} className="flex flex-col space-y-1">
            <div className="flex items-start space-x-2">
              <img src={m.avatar} alt={m.sender} className="w-8 h-8 rounded-full" />
              <div>
                <div className="text-sm font-bold">{m.sender}</div>
                <div className="text-sm">{m.text}</div>
                <div className="text-xs text-gray-400">
                  {new Date(m.created_at).toLocaleTimeString()}
                </div>
              </div>
            </div>
            {m.file_url && (
              /\.(jpeg|jpg|png|gif|webp)$/i.test(m.file_url) ? (
                <img
                  src={m.file_url}
                  alt="shared file"
                  className="max-w-xs rounded-lg mt-2 border"
                />
              ) : (
                <a
                  href={m.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mt-2 block"
                >
                  Download File
                </a>
              )
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="flex mt-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type a message..."
        />
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          className="ml-2"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-indigo-600 text-white px-4 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  )
}
useEffect(() => {
  socket.on("groupCreated", group => {
    toast.success(`New group created: ${group.name}`)
  })

  socket.on("userJoinedGroup", data => {
    toast(`${data.user} joined group ${data.groupId}`, { icon: "👥" })
  })

  return () => {
    socket.off("groupCreated")
    socket.off("userJoinedGroup")
  }
}, [])
useEffect(() => {
  // Reset unread count when entering a group
  setUnreadCount(prev => ({ ...prev, [groupId]: 0 }))
}, [groupId])
useEffect(() => {
  // Reset unread count when entering a group
  setUnreadCount(prev => ({ ...prev, [groupId]: 0 }))
}, [groupId])
useEffect(() => {
  socket.on("displayTyping", data => {
    if (data.groupId == groupId) {
      setTypingUser(data.user)
    }
  })

  socket.on("hideTyping", data => {
    if (data.groupId == groupId) {
      setTypingUser(null)
    }
  })

  return () => {
    socket.off("displayTyping")
    socket.off("hideTyping")
  }
}, [groupId])
useEffect(() => {
  // Reset unread count when entering a group
  setUnreadCount(prev => ({ ...prev, [groupId]: 0 }))
}, [groupId])
const createInvite = async () => {
  const token = localStorage.getItem("token")
  const res = await fetch(`http://localhost:3001/groups/${groupId}/invite`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` }
  })
  const data = await res.json()
  alert(`Invite link: ${data.link}`)
}

export default function GroupChat({ groupId }) {
  return (
    <div>
      {/* existing chat UI */}
      <button
        onClick={createInvite}
        className="ml-2 bg-green-600 text-white px-4 py-1 rounded"
      >
        Create Invite
      </button>
    </div>
  )
}
const createInvite = async () => {
  const token = localStorage.getItem("token")
  const res = await fetch(`http://localhost:3001/groups/${groupId}/invite`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` }
  })
  const data = await res.json()
  alert(`Invite link: ${data.link}`)
}
...
<button onClick={createInvite} className="ml-2 bg-green-600 text-white px-4 py-1 rounded">
  Create Invite
</button>
useEffect(() => {
  socket.on("inviteCreated", data => {
    if (data.groupId == groupId) {
      alert(`${data.inviter} created an invite link!`)
    }
  })

  socket.on("inviteAccepted", data => {
    if (data.groupId == groupId) {
      alert(`${data.newUser} joined the group via invite!`)
    }
  })

  return () => {
    socket.off("inviteCreated")
    socket.off("inviteAccepted")
  }
}, [groupId])
const pinnedMessages = messages.filter(m => m.pinned)

return (
  <div>
    {pinnedMessages.length > 0 && (
      <div className="bg-yellow-100 p-2 mb-2 rounded">
        <h4 className="font-bold">📌 Pinned Messages</h4>
        {pinnedMessages.map(pm => (
          <div key={pm.id} className="text-sm">{pm.text}</div>
        ))}
      </div>
    )}
    {/* normal chat messages below */}
  </div>
)
const [polls, setPolls] = useState([])

useEffect(() => {
  socket.on("newPoll", data => setPolls(prev => [...prev, data]))
  socket.on("pollVoted", update => {
    setPolls(prev => prev.map(p =>
      p.poll.id === update.poll_id
        ? { ...p, votes: [...(p.votes || []), update] }
        : p
    ))
  })
  return () => {
    socket.off("newPoll")
    socket.off("pollVoted")
  }
}, [])

<div>
  {polls.map(p => (
    <div key={p.poll.id} className="border p-2 mb-2 rounded">
      <h4 className="font-bold">{p.poll.question}</h4>
      {p.options.map(opt => (
        <button
          key={opt.id || opt}
          onClick={async () => {
            const token = localStorage.getItem("token")
            await fetch(`http://localhost:3001/polls/${p.poll.id}/vote`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({ option_id: opt.id })
            })
          }}
          className="block mt-1 text-sm bg-gray-200 px-2 py-1 rounded"
        >
          {opt.option_text || opt}
        </button>
      ))}
    </div>
  ))}
</div>
const [scheduleText, setScheduleText] = useState("")
const [scheduleTime, setScheduleTime] = useState("")

const scheduleMessage = async () => {
  const token = localStorage.getItem("token")
  await fetch(`http://localhost:3001/groups/${groupId}/schedule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ text: scheduleText, scheduled_at: scheduleTime })
  })
  setScheduleText("")
  setScheduleTime("")
}

<div className="mt-2">
  <input
    type="text"
    value={scheduleText}
    onChange={e => setScheduleText(e.target.value)}
    placeholder="Message to schedule"
    className="border px-2 py-1 mr-2"
  />
  <input
    type="datetime-local"
    value={scheduleTime}
    onChange={e => setScheduleTime(e.target.value)}
    className="border px-2 py-1 mr-2"
  />
  <button onClick={scheduleMessage} className="bg-purple-600 text-white px-2 py-1 rounded">
    Schedule
  </button>
</div>
const [drafts, setDrafts] = useState([])
const [draftText, setDraftText] = useState("")

const saveDraft = async () => {
  const token = localStorage.getItem("token")
  const res = await fetch(`http://localhost:3001/groups/${groupId}/drafts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ text: draftText })
  })
  const data = await res.json()
  setDrafts(prev => [...prev, data])
  setDraftText("")
}

useEffect(() => {
  const token = localStorage.getItem("token")
  fetch(`http://localhost:3001/groups/${groupId}/drafts`, {
    headers: { "Authorization": `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => setDrafts(data))
}, [groupId])

<div className="mt-2">
  <input
    type="text"
    value={draftText}
    onChange={e => setDraftText(e.target.value)}
    placeholder="Save a draft..."
    className="border px-2 py-1 mr-2"
  />
  <button onClick={saveDraft} className="bg-gray-600 text-white px-2 py-1 rounded">
    Save Draft
  </button>
</div>

<div className="mt-4">
  <h4 className="font-bold">📝 Drafts</h4>
  {drafts.map(d => (
    <div key={d.id} className="text-sm text-gray-700 border-b py-1">
      {d.text}
    </div>
  ))}
</div>
const [searchTerm, setSearchTerm] = useState("")
const [searchResults, setSearchResults] = useState([])

const searchMessages = async () => {
  const token = localStorage.getItem("token")
  const res = await fetch(`http://localhost:3001/groups/${groupId}/search?q=${searchTerm}`, {
    headers: { "Authorization": `Bearer ${token}` }
  })
  const data = await res.json()
  setSearchResults(data)
}

<div className="mt-2">
  <input
    type="text"
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
    placeholder="Search messages..."
    className="border px-2 py-1 mr-2"
  />
  <button onClick={searchMessages} className="bg-blue-600 text-white px-2 py-1 rounded">
    Search
  </button>
</div>

{searchResults.length > 0 && (
  <div className="mt-4">
    <h4 className="font-bold">🔍 Search Results</h4>
    {searchResults.map(m => (
      <div key={m.id} className="text-sm text-gray-700 border-b py-1">
        {m.text}
      </div>
    ))}
  </div>
)}
{messages.map(m => (
  <div key={m.id} className="text-sm text-gray-700 border-b py-1">
    <span>{m.text}</span>
    {m.forwarded && (
      <span className="ml-2 text-xs italic text-gray-400">
        (forwarded)
      </span>
    )}
    {m.attachment_url && (
      <a
        href={m.attachment_url}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 text-blue-600 underline text-xs"
      >
        📎 View Attachment
      </a>
    )}
  </div>
))}
