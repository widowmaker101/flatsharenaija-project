export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Flatshare Naija. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="/dashboard" className="hover:text-white">Dashboard</a>
          <a href="/chat" className="hover:text-white">Chat</a>
          <a href="/login" className="hover:text-white">Login</a>
          <a href="/signup" className="hover:text-white">Signup</a>
        </div>
      </div>
    </footer>
  )
}
