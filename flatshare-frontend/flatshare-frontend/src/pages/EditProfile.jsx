import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function EditProfile() {
  const [avatar, setAvatar] = useState("")
  const [bio, setBio] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const res = await fetch("http://localhost:3001/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ avatar, bio })
    })
    if (res.ok) {
      alert("Profile updated successfully!")
      navigate("/profile")
    } else {
      alert("Failed to update profile")
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Avatar URL</label>
          <input
            value={avatar}
            onChange={e => setAvatar(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}
