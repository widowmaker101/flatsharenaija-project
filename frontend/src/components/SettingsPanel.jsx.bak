import { useState, useEffect } from 'react'
import { DEFAULT_CURRENCY, SUPPORTED_CURRENCIES, DEFAULT_THEME, DEFAULT_ACCENT, SUPPORTED_ACCENTS } from '../config'

export default function SettingsPanel({ profile, setProfile }) {
  const [currency, setCurrency] = useState(() => localStorage.getItem("currency") || DEFAULT_CURRENCY)
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || DEFAULT_THEME)
  const [accent, setAccent] = useState(() => localStorage.getItem("accent") || DEFAULT_ACCENT)
  const [avatar, setAvatar] = useState(() => profile?.avatar || "")

  useEffect(() => {
    localStorage.setItem("currency", currency)
  }, [currency])

  useEffect(() => {
    localStorage.setItem("theme", theme)
    if (theme === "dark") document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [theme])

  useEffect(() => {
    localStorage.setItem("accent", accent)
    document.documentElement.setAttribute("data-accent", accent)
  }, [accent])

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatar(reader.result)
      setProfile({ ...profile, avatar: reader.result })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">⚙️ Settings</h2>

      {/* Currency Selector */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Preferred Currency</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}
          className="px-3 py-2 rounded-md border bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          {SUPPORTED_CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Theme Selector */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Theme</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}
          className="px-3 py-2 rounded-md border bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <option value="light">🌞 Light</option>
          <option value="dark">🌙 Dark</option>
        </select>
      </div>

      {/* Accent Selector */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Accent Color</label>
        <select value={accent} onChange={(e) => setAccent(e.target.value)}
          className="px-3 py-2 rounded-md border bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          {SUPPORTED_ACCENTS.map((a) => (
            <option key={a.code} value={a.code}>{a.label}</option>
          ))}
        </select>
      </div>

      {/* Avatar Upload */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Profile Avatar</label>
        <input type="file" accept="image/*" onChange={handleAvatarUpload}
          className="px-3 py-2 rounded-md border bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
        {avatar && (
          <img src={avatar} alt="Avatar Preview" className="mt-2 w-16 h-16 rounded-full border shadow-md" />
        )}
      </div>
    </div>
  )
}
