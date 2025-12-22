import { useState, useEffect } from "react"
import { io } from "socket.io-client"

const socket = io("http://localhost:3001")

export default function Message({ msg }) {
  const [reactions, setReactions] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3001/reactions/${msg.id}`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setReactions(data))

    socket.on("newReaction", r => {
      if (r.message_id == msg.id) {
        setReactions(prev => [...prev, r])
      }
    })

    return () => {
      socket.off("newReaction")
    }
  }, [msg.id])

  const addReaction = async emoji => {
    const token = localStorage.getItem("token")
    await fetch("http://localhost:3001/reactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ message_id: msg.id, emoji })
    })
  }

  return (
    <div className="border p-2 rounded mb-2">
      <div>{msg.text}</div>
      <div className="flex space-x-2 mt-1">
        {["👍","❤️","😂"].map(e => (
          <button key={e} onClick={() => addReaction(e)} className="text-lg">
            {e}
          </button>
        ))}
      </div>
      <div className="flex space-x-1 mt-1">
        {reactions.map(r => (
          <span key={r.id}>{r.emoji}</span>
        ))}
      </div>
    </div>
  )
}
<div className="flex items-center space-x-2">
  {msg.profile_pic ? (
    <img src={msg.profile_pic} alt="avatar" className="w-8 h-8 rounded-full border" />
  ) : (
    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
  )}
  <span className="font-bold">{msg.username}</span>
</div>
<div className="flex items-center space-x-2">
  <div className="relative">
    {msg.profile_pic ? (
      <img src={msg.profile_pic} alt="avatar" className="w-8 h-8 rounded-full border" />
    ) : (
      <div className="w-8 h-8 rounded-full bg-gray-300"></div>
    )}
    {onlineUsers[msg.user_id] && (
      <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
    )}
  </div>
  <span className="font-bold">{msg.username}</span>
</div>
useEffect(() => {
  const token = localStorage.getItem("token")
  fetch(`http://localhost:3001/messages/${msg.id}/read`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` }
  })
}, [msg.id])
const [readers, setReaders] = useState([])

useEffect(() => {
  const token = localStorage.getItem("token")
  fetch(`http://localhost:3001/messages/${msg.id}/readers`, {
    headers: { "Authorization": `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => setReaders(data))
}, [msg.id])

<div className="text-xs text-gray-500 mt-1">
  Read by: {readers.map(r => r.username).join(", ")}
</div>
const [isEditing, setIsEditing] = useState(false)
const [editText, setEditText] = useState(msg.text)

const saveEdit = async () => {
  const token = localStorage.getItem("token")
  const res = await fetch(`http://localhost:3001/messages/${msg.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ text: editText })
  })
  const data = await res.json()
  setIsEditing(false)
}

{isEditing ? (
  <div>
    <input value={editText} onChange={e => setEditText(e.target.value)} />
    <button onClick={saveEdit} className="ml-2 bg-blue-600 text-white px-2 py-1 rounded">Save</button>
  </div>
) : (
  <div>
    <span>{msg.text}</span>
    {msg.user_id == localStorage.getItem("userId") && (
      <button onClick={() => setIsEditing(true)} className="ml-2 text-xs text-gray-500 underline">Edit</button>
    )}
    {msg.edited_at && <span className="ml-2 text-xs italic text-gray-400">(edited)</span>}
  </div>
)}
useEffect(() => {
  socket.on("messageEdited", updated => {
    if (updated.id === msg.id) {
      // Update the displayed text and mark as edited
      setEditText(updated.text)
    }
  })

  return () => {
    socket.off("messageEdited")
  }
}, [msg.id])
const deleteMessage = async () => {
  const token = localStorage.getItem("token")
  await fetch(`http://localhost:3001/messages/${msg.id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  })
}

<div>
  <span>{msg.text}</span>
  {msg.user_id == localStorage.getItem("userId") && (
    <button onClick={deleteMessage} className="ml-2 text-xs text-red-600 underline">Delete</button>
  )}
</div>
const deleteMessage = async () => {
  const token = localStorage.getItem("token")
  await fetch(`http://localhost:3001/messages/${msg.id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  })
}

<div>
  <span>{msg.text}</span>
  {msg.user_id == localStorage.getItem("userId") && (
    <button
      onClick={deleteMessage}
      className="ml-2 text-xs text-red-600 underline"
    >
      Delete
    </button>
  )}
</div>
const pinMessage = async () => {
  const token = localStorage.getItem("token")
  await fetch(`http://localhost:3001/messages/${msg.id}/pin`, {
    method: "PUT",
    headers: { "Authorization": `Bearer ${token}` }
  })
}

const unpinMessage = async () => {
  const token = localStorage.getItem("token")
  await fetch(`http://localhost:3001/messages/${msg.id}/unpin`, {
    method: "PUT",
    headers: { "Authorization": `Bearer ${token}` }
  })
}

<div>
  <span>{msg.text}</span>
  {msg.user_id == localStorage.getItem("userId") && (
    msg.pinned ? (
      <button onClick={unpinMessage} className="ml-2 text-xs text-yellow-600 underline">Unpin</button>
    ) : (
      <button onClick={pinMessage} className="ml-2 text-xs text-yellow-600 underline">Pin</button>
    )
  )}
  {msg.pinned && <span className="ml-2 text-xs italic text-yellow-500">📌 Pinned</span>}
</div>
const [replies, setReplies] = useState([])
const [showReplies, setShowReplies] = useState(false)
const [replyText, setReplyText] = useState("")

const sendReply = async () => {
  const token = localStorage.getItem("token")
  const res = await fetch(`http://localhost:3001/messages/${msg.id}/reply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ text: replyText })
  })
  const data = await res.json()
  setReplies(prev => [...prev, data])
  setReplyText("")
}

useEffect(() => {
  if (showReplies) {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3001/messages/${msg.id}/replies`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setReplies(data))
  }
}, [showReplies])

<div>
  <span>{msg.text}</span>
  <button onClick={() => setShowReplies(!showReplies)} className="ml-2 text-xs text-blue-600 underline">
    {showReplies ? "Hide Replies" : "View Replies"}
  </button>
  {showReplies && (
    <div className="ml-4 mt-2 border-l pl-2">
      {replies.map(r => (
        <div key={r.id} className="text-sm text-gray-700">{r.text}</div>
      ))}
      <input
        value={replyText}
        onChange={e => setReplyText(e.target.value)}
        placeholder="Write a reply..."
        className="border px-2 py-1 text-sm"
      />
      <button onClick={sendReply} className="ml-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
        Reply
      </button>
    </div>
  )}
</div>
{showReplies && (
  <div className="ml-4 mt-2 border-l pl-2">
    {replies.map(r => (
      <div key={r.id} className="text-sm text-gray-700">
        <span>{r.text}</span>
        <div className="flex space-x-2 mt-1">
          {["👍","❤️","😂"].map(e => (
            <button
              key={e}
              onClick={async () => {
                const token = localStorage.getItem("token")
                await fetch("http://localhost:3001/reactions", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify({ message_id: r.id, emoji: e })
                })
              }}
              className="text-xs"
            >
              {e}
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>
)}
useEffect(() => {
  socket.on("replyReactionAdded", reaction => {
    setReplies(prev =>
      prev.map(r =>
        r.id === reaction.message_id
          ? { ...r, reactions: [...(r.reactions || []), reaction] }
          : r
      )
    )
  })

  return () => {
    socket.off("replyReactionAdded")
  }
}, [msg.id])
const [replyFile, setReplyFile] = useState(null)

const sendReplyWithFile = async () => {
  const token = localStorage.getItem("token")
  const formData = new FormData()
  formData.append("text", replyText)
  if (replyFile) formData.append("file", replyFile)

  const res = await fetch(`http://localhost:3001/messages/${msg.id}/reply-with-file`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` },
    body: formData
  })
  const data = await res.json()
  setReplies(prev => [...prev, data])
  setReplyText("")
  setReplyFile(null)
}

<input type="file" onChange={e => setReplyFile(e.target.files[0])} className="mt-1 text-sm" />
<button onClick={sendReplyWithFile} className="ml-2 bg-green-600 text-white px-2 py-1 rounded text-sm">
  Reply with File
</button>
{replies.map(r => (
  <div key={r.id} className="text-sm text-gray-700">
    <span>{r.text}</span>
    {r.attachment_url && (
      <div className="mt-1">
        <a
          href={r.attachment_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-xs"
        >
          📎 View Attachment
        </a>
      </div>
    )}
  </div>
))}
const [translatedText, setTranslatedText] = useState(null)

const translateMessage = async (lang) => {
  const token = localStorage.getItem("token")
  const res = await fetch(`http://localhost:3001/messages/${msg.id}/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ targetLang: lang })
  })
  const data = await res.json()
  setTranslatedText(data.translated)
}

<div>
  <span>{translatedText || msg.text}</span>
  <div className="mt-1 flex space-x-2">
    {["FR","ES","DE","ZH"].map(lang => (
      <button
        key={lang}
        onClick={() => translateMessage(lang)}
        className="text-xs text-blue-600 underline"
      >
        Translate to {lang}
      </button>
    ))}
  </div>
</div>
const [reactionSummary, setReactionSummary] = useState([])

useEffect(() => {
  const token = localStorage.getItem("token")
  fetch(`http://localhost:3001/messages/${msg.id}/reactions-summary`, {
    headers: { "Authorization": `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => setReactionSummary(data))
}, [msg.id])

<div className="mt-1 text-xs text-gray-600">
  {reactionSummary.map(r => (
    <span key={r.emoji} className="mr-2">
      {r.emoji} {r.count}
    </span>
  ))}
</div>
const [reactionSummary, setReactionSummary] = useState([])

useEffect(() => {
  const token = localStorage.getItem("token")
  fetch(`http://localhost:3001/messages/${msg.id}/reactions-summary`, {
    headers: { "Authorization": `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => setReactionSummary(data))
}, [msg.id])

<div className="mt-1 text-xs text-gray-600">
  {reactionSummary.map(r => (
    <span key={r.emoji} className="mr-2">
      {r.emoji} {r.count}
    </span>
  ))}
</div>
const bookmarkMessage = async () => {
  const token = localStorage.getItem("token")
  await fetch(`http://localhost:3001/messages/${msg.id}/bookmark`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` }
  })
}

<div>
  <span>{msg.text}</span>
  <button
    onClick={bookmarkMessage}
    className="ml-2 text-xs text-green-600 underline"
  >
    Bookmark
  </button>
</div>
const forwardMessage = async (targetGroupId) => {
  const token = localStorage.getItem("token")
  await fetch(`http://localhost:3001/messages/${msg.id}/forward`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ targetGroupId })
  })
}

<div>
  <span>{msg.text}</span>
  <button
    onClick={() => forwardMessage(prompt("Enter target group ID"))}
    className="ml-2 text-xs text-purple-600 underline"
  >
    Forward
  </button>
</div>
