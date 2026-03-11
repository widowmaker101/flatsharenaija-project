import React, { useState } from 'react'
import axios from 'axios'

export default function FlatForm() {
  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    rooms: '',
    description: '',
    image_url: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3001/flats', form)
      alert(`Flat listed successfully: ${res.data.title}`)
      setForm({
        title: '',
        location: '',
        price: '',
        rooms: '',
        description: '',
        image_url: ''
      })
    } catch (err) {
      console.error(err)
      alert('Error listing flat')
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">List a Flat</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 w-full" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2 w-full" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2 w-full" />
        <input name="rooms" value={form.rooms} onChange={handleChange} placeholder="Rooms" className="border p-2 w-full" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full" />
        <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL" className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
          Submit
        </button>
      </form>
    </div>
  )
}
