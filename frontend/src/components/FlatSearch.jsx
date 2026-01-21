import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FlatCard from './FlatCard.jsx'
import { useLocation } from 'react-router-dom'

export default function FlatSearch() {
  const loc = useLocation()
  const params = new URLSearchParams(loc.search)
  const initial = params.get('location') || ''
  const [query, setQuery] = useState(initial)
  const [priceMax, setPriceMax] = useState('')
  const [rooms, setRooms] = useState('')
  const [flats, setFlats] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchFlats = async () => {
    setLoading(true)
    try {
      const url = new URL('http://localhost:3001/flats')
      if (query) url.searchParams.set('location', query)
      if (priceMax) url.searchParams.set('price_lte', priceMax)
      const res = await axios.get(url.toString())
      const filtered = rooms ? res.data.filter(f => Number(f.rooms) >= Number(rooms)) : res.data
      setFlats(filtered)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchFlats() }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-6">
      {/* Filters */}
      <aside className="rounded-2xl border border-white/20 bg-white/60 dark:bg-white/5 backdrop-blur p-4 sticky top-20 h-fit shadow-glass">
        <div className="font-bold mb-3">Filters</div>
        <label className="block text-sm mb-2">Location</label>
        <input value={query} onChange={(e)=>setQuery(e.target.value)} className="w-full rounded-lg border-2 p-2 mb-3" placeholder="Abuja, Lagos" />
        <label className="block text-sm mb-2">Max price (₦)</label>
        <input value={priceMax} onChange={(e)=>setPriceMax(e.target.value)} className="w-full rounded-lg border-2 p-2 mb-3" placeholder="150000" />
        <label className="block text-sm mb-2">Min rooms</label>
        <input value={rooms} onChange={(e)=>setRooms(e.target.value)} className="w-full rounded-lg border-2 p-2 mb-4" placeholder="2" />
        <button onClick={fetchFlats} className="w-full rounded-lg bg-brand-600 text-white py-2 font-bold hover:bg-brand-800">
          Apply
        </button>
      </aside>

      {/* Results */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Results</h2>
          <div className="text-sm text-neutral-600 dark:text-neutral-300">
            {loading ? 'Loading…' : `${flats.length} flats`}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({length:6}).map((_,i)=>(
              <div key={i} className="h-64 rounded-2xl bg-white/40 dark:bg-white/10 animate-pulse"></div>
            ))
            : flats.map(f => <FlatCard key={f.id} flat={f}/>)
          }
        </div>
      </section>
    </div>
  )
}
