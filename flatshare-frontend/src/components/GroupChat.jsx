import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function GroupChat({ groupName, members }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  useEffect(() => {
    // Fetch existing messages
    const fetchMessages = async () => {
      const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true })
      setMessages(data || [])
    }
    fetchMessages()

    // Subscribe to realtime changes
    const channel = supabase
      .channel('chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        setMessages(prev => [...prev, payload.new])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const sendMessage = async () => {
    if (!input.trim()) return
    await supabase.from('messages').insert([{ sender: "You", text: input }])
    setInput("")
  }

  return (
    <div className="p-6 mt-6 border-t bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💬 {groupName}</h2>
      <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700">
            <span className="font-semibold">{msg.sender}:</span>
            <span className="ml-2">{msg.text}</span>
            <span className="ml-2 text-xs text-gray-400">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-accent-indigo text-white rounded-md hover:scale-105 hover:shadow-md transition-transform"
        >
          Send
        </button>
      </div>
    </div>
  )
}
