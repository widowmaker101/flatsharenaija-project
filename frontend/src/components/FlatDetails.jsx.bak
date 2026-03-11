import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function FlatDetails() {
  const { id } = useParams()
  const [flat, setFlat] = useState(null)
  const [showChat, setShowChat] = useState(false)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFlat = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/listings/${id}`)
        setFlat(res.data)
      } catch (err) {
        console.error(err)
        toast.error("Failed to load flat details")
      } finally {
        setLoading(false)
      }
    }
    fetchFlat()
  }, [id])

  const handleSend = async () => {
    if (!message.trim()) return
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/listings/${id}/messages`, {
        message,
        sender: "tenant@example.com" // replace with logged-in user later
      })
      toast.success('Message sent successfully')
      setMessage("")
      setShowChat(false)
    } catch (err) {
      console.error(err)
      toast.error('Failed to send message')
    }
  }

  if (loading) return <p className="p-6 text-gray-600">Loading flat details...</p>
  if (!flat) return <p className="p-6 text-red-600">Flat not found</p>

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-neutral-900 rounded-lg shadow border border-gray-200 dark:border-neutral-700">
      <img src={flat.image_url || 'https://via.placeholder.com/800x400?text=No+Image'} alt={flat.title} className="mb-6 rounded-lg shadow-md w-full object-cover" />
      <h2 className="text-3xl font-bold text-blue-700 dark:text-white mb-4">{flat.title}</h2>
      <div className="space-y-2 mb-6">
        <p className="text-gray-700 dark:text-gray-300"><strong>Location:</strong> {flat.location}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Price:</strong> ₦{flat.price.toLocaleString()}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Rooms:</strong> {flat.rooms}</p>
        {flat.description && <p className="text-gray-600 dark:text-gray-400">{flat.description}</p>}
      </div>

      <div className="flex gap-4">
        <Link
          to="/flats"
          className="bg-gray-600 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-700 transition"
        >
          Back to Search
        </Link>
        <button
          onClick={() => setShowChat(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Contact Landlord
        </button>
      </div>

      {showChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Message Landlord</h3>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows="4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowChat(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div> 
      )}
    </div>
  )
}
