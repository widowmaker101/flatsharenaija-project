import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav className="flex items-center justify-between bg-indigo-600 text-white px-4 py-2">
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/chat" className="hover:underline">Chat</Link>
      </div>
      <div className="flex space-x-4">
        {!token && <Link to="/login" className="hover:underline">Login</Link>}
        {!token && <Link to="/signup" className="hover:underline">Signup</Link>}
        {token && (
          <button onClick={logout} className="hover:underline">
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}
