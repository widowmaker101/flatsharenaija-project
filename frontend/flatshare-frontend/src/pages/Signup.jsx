import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const signup = async () => {
    try {
      await axios.post("http://localhost:3001/signup", { username, password })
      alert("Signup successful! Please log in.")
      navigate("/login")
    } catch {
      alert("Signup failed")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold mb-4">Create Account</h1>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        className="border px-2 py-1 mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="border px-2 py-1 mb-2"
      />
      <button
        onClick={signup}
        className="bg-green-600 text-white px-4 py-1 rounded"
      >
        Sign Up
      </button>
    </div>
  )
}
