import React from 'react'
import { Link } from 'react-router-dom'

export default function FlatCard({ flat }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:bg-neutral-800 shadow hover:shadow-lg transition overflow-hidden">
      <Link to={`/flats/${flat.id}`} className="block">
        <img src={flat.image_url} alt={flat.title} className="h-48 w-full object-cover" />
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{flat.title}</h3>
            <span className="inline-block rounded bg-green-600 text-white px-3 py-1 text-sm font-medium">
              ₦{flat.price}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{flat.location}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{flat.rooms} rooms</p>
        </div>
      </Link>
    </div>
  )
}
