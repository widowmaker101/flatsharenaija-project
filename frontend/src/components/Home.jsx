import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'
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

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (query) params.append('location', query)
      if (budget) params.append('price_lte', budget)
      if (rooms) params.append('rooms_gte', rooms)

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/listings?${params.toString()}`)
      setFlats(res.data.items || [])
      setCurrentPage(1)
      if (res.data.items?.length === 0) toast('No results — try adjusting filters', { icon: '🔍' })
    } catch (err) {
      toast.error('Failed to load listings')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Load featured listings on mount
  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/listings?limit=6`)
        setFlats(res.data.items || [])
      } catch (err) {
        console.error(err)
        toast.error('Failed to load featured flats')
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentItems = flats.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(flats.length / itemsPerPage)

  const paginate = (page) => setCurrentPage(page)

  return (
    <div className="min-h-screen bg-base-200">
      <Toaster position="top-center" />

      {/* Hero with larger search bar */}
      <div className="hero min-h-[85vh] hero-bg relative overflow-hidden">
        <div className="hero-overlay bg-gradient-to-b from-transparent via-base-100/40 to-base-100/95"></div>
        <div className="hero-content text-center relative z-10 px-4 py-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="w-full"
          >
            <h1 className="mb-8 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Discover Your Perfect<br />Flatshare in Nigeria
            </h1>

            <p className="mb-12 text-xl md:text-2xl lg:text-3xl text-base-content/90 max-w-4xl mx-auto font-light">
              Verified listings • Instant messaging • Best prices in Lagos, Abuja, PH, and more
            </p>

            {/* Larger search form */}
            <form onSubmit={handleSearch} className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row gap-5 bg-base-100/90 backdrop-blur-2xl p-10 md:p-12 rounded-3xl shadow-2xl border border-base-200/50">
                <label className="input input-bordered input-lg flex-1 flex items-center gap-5 text-base-content text-lg">
                  <MapPin className="text-primary flex-shrink-0" size={28} />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter city or neighborhood (Lagos, Abuja, Lekki...)"
                    className="grow text-xl placeholder:text-base-content/60 focus:outline-none"
                  />
                </label>

                <label className="input input-bordered input-lg w-full md:w-64 flex items-center gap-5 text-base-content text-lg">
                  <DollarSign className="text-primary flex-shrink-0" size={28} />
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Max price ₦"
                    className="grow text-xl placeholder:text-base-content/60 focus:outline-none"
                  />
                </label>

                <label className="input input-bordered input-lg w-full md:w-48 flex items-center gap-5 text-base-content text-lg">
                  <BedDouble className="text-primary flex-shrink-0" size={28} />
                  <input
                    type="number"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    placeholder="Min rooms"
                    className="grow text-xl placeholder:text-base-content/60 focus:outline-none"
                  />
                </label>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg px-16 min-w-[180px] font-bold text-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                  ) : (
                    'Search Now'
                  )}
                </button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-6 mt-12 opacity-90">
              <div className="badge badge-outline gap-3 text-base-content/80 text-lg">
                <ShieldCheck size={20} /> Verified Landlords
              </div>
              <div className="badge badge-outline gap-3 text-base-content/80 text-lg">
                <Users size={20} /> 10,000+ Users
              </div>
              <div className="badge badge-outline gap-3 text-base-content/80 text-lg">
                <Clock size={20} /> Instant Chat
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Listings */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Featured Listings
        </h2>

        {loading ? (
          <div className="flex justify-center">
            <ClipLoader color="#36d7b7" size={60} />
          </div>
        ) : flats.length === 0 ? (
          <p className="text-center text-xl text-gray-500">No featured listings yet. Add some in the backend!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map(flat => (
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
                    src={flat.image_url || 'https://placehold.co/800x400?text=No+Image'}
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
                    ₦{flat.price.toLocaleString()}
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
        )}

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
