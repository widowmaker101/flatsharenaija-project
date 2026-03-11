import { useState } from 'react'

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("emergencyContacts") || "[]")
  })
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [phone, setPhone] = useState("")

  const addContact = () => {
    if (!name || !role || !phone) return
    const newContact = { name, role, phone }
    const updated = [...contacts, newContact]
    setContacts(updated)
    localStorage.setItem("emergencyContacts", JSON.stringify(updated))
    setName("")
    setRole("")
    setPhone("")
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🚨 Emergency Contacts</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Role (Doctor, Plumber, Family)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <button
          onClick={addContact}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Add
        </button>
      </div>
      {contacts.length > 0 ? (
        <ul className="space-y-2">
          {contacts.map((c, i) => (
            <li key={i} className="flex justify-between items-center px-3 py-2 rounded-md bg-white/50 dark:bg-gray-800/50">
              <span>{c.name} ({c.role}) — 📞 {c.phone}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No emergency contacts yet. Add doctors, plumbers, or family numbers for quick access.</p>
      )}
    </div>
  )
}
