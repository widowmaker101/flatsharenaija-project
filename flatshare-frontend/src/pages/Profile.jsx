import { useState, useEffect } from "react"

export default function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return
    fetch("http://localhost:3001/profile", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUser(data))
  }, [])

  if (!user) return <div className="p-6">Loading profile...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="bg-white shadow rounded-lg p-4 max-w-md">
        <p><span className="font-semibold">Username:</span> {user.username}</p>
        <p><span className="font-semibold">User ID:</span> {user.id}</p>
      </div>
    </div>
  )
}
