import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'
import { 
  Search, MapPin, DollarSign, BedDouble, 
  Clock, ShieldCheck, Users, SlidersHorizontal 
} from 'lucide-react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [budget, setBudget] = useState('')
  const [rooms, setRooms] = useState('')
  const [flats, setFlats] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 9
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (query) params.append('location', query)
      if (budget) params.append('budget', budget)
      if (rooms) params.append('rooms', rooms)

      const res = await axios.get(`/api/flats?${params.toString()}`)
      setFlats(res.data || [])
      setCurrentPage(1)
      if (res.data?.length === 0) toast('No results — try adjusting filters', { icon: '🔍' })
    } catch (err) {
      toast.error('Failed to load listings')
    } finally {
      setLoading(false)
    }
  }

  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentItems = flats.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(flats.length / itemsPerPage)

  const paginate = (page) => setCurrentPage(page)

  const sampleFlats = [
    { id: 1, title: 'Modern 2-Bedroom Flat', location: 'Abuja', price: '₦250,000 / month', rooms: 2, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
    { id: 2, title: 'Cozy Studio Apartment', location: 'Lagos', price: '₦150,000 / month', rooms: 1, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800' },
    { id: 3, title: 'Luxury Shared Penthouse', location: 'Lekki', price: '₦420,000 / month', rooms: 3, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800' },
    { id: 4, title: 'Premium 1-Bedroom Suite', location: 'Victoria Island', price: '₦320,000 / month', rooms: 1, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800' },
    // ... keep or add more high-quality images
  ]

  const displayed = flats.length > 0 ? currentItems : sampleFlats.slice(indexOfFirst, indexOfLast)

  return (
    <div className="min-h-screen bg-base-200">
      <Toaster position="top-center" />

      {/* Hero */}
<div className="hero min-h-[85vh] hero-bg relative overflow-hidden">
  {/* Gradient overlay for depth */}
  <div className="hero-overlay bg-gradient-to-b from-transparent via-base-100/40 to-base-100/95"></div>

  <div className="hero-content text-center relative z-10 px-4 py-16 max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      className="w-full"
    >
      {/* Headline */}
      <h1 className="mb-8 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        Discover Your Perfect<br />Flatshare in Nigeria
      </h1>

      {/* Subtitle */}
      <p className="mb-12 text-xl md:text-2xl lg:text-3xl text-base-content/90 max-w-4xl mx-auto font-light">
        Verified listings • Instant messaging • Best prices in Lagos, Abuja, PH, and more
      </p>

      {/* Search Form – glassmorphism style */}
      <div className="max-w-5xl mx-auto">
        <form 
          onSubmit={handleSearch} 
          className="flex flex-col md:flex-row gap-5 bg-base-100/90 backdrop-blur-2xl p-8 md:p-10 rounded-3xl shadow-2xl border border-base-200/50"
        >
          {/* Location */}
          <label className="input input-bordered input-lg flex-1 flex items-center gap-4 text-base-content">
            <MapPin className="text-primary flex-shrink-0" size={24} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="City or neighborhood (Lagos, Abuja...)"
              className="grow text-lg placeholder:text-base-content/50 focus:outline-none"
            />
          </label>

          {/* Budget */}
          <label className="input input-bordered input-lg w-full md:w-56 flex items-center gap-4 text-base-content">
            <DollarSign className="text-primary flex-shrink-0" size={24} />
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Max ₦"
              className="grow text-lg placeholder:text-base-content/50 focus:outline-none"
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-lg px-12 min-w-[160px] font-semibold"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              'Search Now'
            )}
          </button>
        </form>
      </div>

      {/* Optional small trust badges */}
      <div className="flex flex-wrap justify-center gap-6 mt-10 opacity-90">
        <div className="badge badge-outline gap-2 text-base-content/80">
          <ShieldCheck size={16} /> Verified Landlords
        </div>
        <div className="badge badge-outline gap-2 text-base-content/80">
          <Users size={16} /> 10,000+ Users
        </div>
        <div className="badge badge-outline gap-2 text-base-content/80">
          <Clock size={16} /> Instant Chat
        </div>
      </div>
    </motion.div>
  </div>
</div>
      {/* Listings */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Featured Listings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayed.map(flat => (
            <motion.div
              key={flat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200/50 overflow-hidden group"
            >
              <figure className="relative overflow-hidden">
                <img
                  src={flat.image}
                  alt={flat.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 badge badge-secondary badge-lg font-bold">
                  Featured
                </div>
              </figure>
              <div className="card-body p-6">
                <h2 className="card-title text-2xl font-bold line-clamp-2">{flat.title}</h2>
                <div className="flex items-center gap-2 text-base-content/70 mt-2">
                  <MapPin size={18} />
                  <span>{flat.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <BedDouble size={18} />
                  <span>{flat.rooms} Bedroom{flat.rooms > 1 ? 's' : ''}</span>
                </div>
                <p className="text-3xl font-bold text-primary mt-5">
                  {flat.price}
                </p>
                <div className="card-actions mt-6">
                  <Link to={`/flat/${flat.id}`} className="btn btn-primary btn-block btn-lg">
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16">
            <div className="join">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`join-item btn ${currentPage === i + 1 ? 'btn-active btn-primary' : ''}`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Call to action */}
      <section className="bg-gradient-to-br from-primary to-accent py-20 text-white text-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your New Home?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
              Join thousands of Nigerians already living better through Flatshare Naija.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/search" className="btn btn-lg btn-outline text-white border-2 border-white hover:bg-white hover:text-primary">
                Browse Listings
              </Link>
              <Link to="/post-flat" className="btn btn-lg bg-white text-primary hover:bg-gray-100">
                List Your Property
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
