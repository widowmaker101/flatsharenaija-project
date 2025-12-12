import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center transition-colors duration-500">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-indigo-400 transition-colors duration-500">
        Flatshare
      </h1>
      <ul className="flex gap-6 text-gray-700 dark:text-gray-300 transition-colors duration-500">
        <li><Link to="/" className="relative hover:text-blue-600 dark:hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full">Home</Link></li>
        <li><Link to="/listings" className="relative hover:text-blue-600 dark:hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full">Listings</Link></li>
        <li><Link to="/about" className="relative hover:text-blue-600 dark:hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full">About</Link></li>
        <li><Link to="/login" className="relative hover:text-blue-600 dark:hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full">Login</Link></li>
      </ul>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="ml-6 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:scale-110 transition-all duration-500 ease-in-out transform"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </nav>
  )
}
