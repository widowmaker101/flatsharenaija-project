import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { io } from "socket.io-client"

const socket = io("http://localhost:3001")

export default function Groups({ currentGroupId }) {
  const [groups, setGroups] = useState([])
  const [unreadCount, setUnreadCount] = useState({})

  useEffect(() => {
    // Fetch groups
    fetch("http://localhost:3001/groups", {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setGroups(data))

    // Listen for new messages
    socket.on("newMessage", msg => {
      if (msg.group_id !== parseInt(currentGroupId)) {
        setUnreadCount(prev => ({
          ...prev,
          [msg.group_id]: (prev[msg.group_id] || 0) + 1
        }))
      }
    })

    return () => {
      socket.off("newMessage")
    }
  }, [currentGroupId])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Groups</h1>
      <ul className="space-y-2">
        {groups.map(g => (
          <li key={g.id} className="flex items-center justify-between">
            <Link to={`/chat?group=${g.id}`} className="text-indigo-600 underline">
              {g.name}
            </Link>
            {unreadCount[g.id] > 0 && (
              <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount[g.id]}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
