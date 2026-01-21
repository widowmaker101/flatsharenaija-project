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
