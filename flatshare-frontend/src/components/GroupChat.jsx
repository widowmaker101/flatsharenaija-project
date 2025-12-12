import { useState, useEffect } from "react"

export default function GroupChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  useEffect(() => {
    fetch("http://localhost:3001/messages")
      .then(res => res.json())
      .then(data => setMessages(data))
  }, [])

  const sendMessage = async () => {
    if (!input.trim()) return
    await fetch("http://localhost:3001/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender: "You", text: input, avatar: "/avatars/you.png" })
    })
    setInput("")
  }

  return (
    <div>
      <h2>💬 Group Chat</h2>
      <div>
        {messages.map((m) => (
          <div key={m.id}><b>{m.sender}:</b> {m.text}</div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}
