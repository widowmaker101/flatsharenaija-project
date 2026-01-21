import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3001/login", { username, password })
      localStorage.setItem("token", res.data.token)
      toast.success("Login successful!")
      navigate("/chat")
    } catch {
      toast.error("Login failed. Please check your credentials.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold mb-4">Login</h1>
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
        onClick={login}
        className="bg-indigo-600 text-white px-4 py-1 rounded"
      >
        Login
      </button>
    </div>
  )
}
