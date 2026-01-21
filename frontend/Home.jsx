import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { Search, MapPin, DollarSign, Bed } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [budget, setBudget] = useState("");
  const [rooms, setRooms] = useState("");
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.append("location", query);
      if (budget) params.append("budget", budget);
      if (rooms) params.append("rooms", rooms);

      const res = await axios.get(`/api/flats?${params.toString()}`);
      setFlats(res.data || []);
      setCurrentPage(1);

      if (res.data?.length === 0) {
        toast("No flats found – try adjusting your filters", { icon: "🔍" });
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Could not load listings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = flats.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(flats.length / itemsPerPage);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  // Fallback samples (expanded for better demo)
  const sampleFlats = [
    { id: 1, title: "Modern 2-Bedroom Flat", location: "Abuja", price: "₦250,000 / month", rooms: 2, image: "https://via.placeholder.com/400x260?text=Abuja+Modern+Flat" },
    { id: 2, title: "Cozy Studio Apartment", location: "Lagos", price: "₦150,000 / month", rooms: 1, image: "https://via.placeholder.com/400x260?text=Lagos+Studio" },
    { id: 3, title: "Shared 3-Bed with Balcony", location: "Port Harcourt", price: "₦180,000 / month", rooms: 3, image: "https://via.placeholder.com/400x260?text=PH+Shared" },
    { id: 4, title: "Luxury 1-Bedroom", location: "Abuja", price: "₦320,000 / month", rooms: 1, image: "https://via.placeholder.com/400x260?text=Abuja+Luxury" },
    // Add 5–12 more if desired for testing pagination
  ];

  const displayed = flats.length > 0 ? currentItems : sampleFlats.slice(indexOfFirst, indexOfLast);

  return (
    <div className="min-h-screen bg-base-200">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Hero */}
      <div className="hero bg-base-100 py-16 md:py-24">
        <div className="hero-content text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Welcome to Flatshare Naija
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 mb-10">
              Discover affordable shared flats, connect with verified landlords, and start chatting today.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 justify-center max-w-3xl mx-auto">
              <label className="input input-bordered input-lg flex items-center gap-3 flex-1 min-w-[280px]">
                <MapPin size={20} className="text-primary" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Location (Abuja, Lagos...)"
                  className="grow"
                />
              </label>

              <label className="input input-bordered input-lg flex items-center gap-3 w-full sm:w-44">
                <DollarSign size={20} className="text-primary" />
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Max ₦"
                  className="w-20"
                />
              </label>

              <label className="input input-bordered input-lg flex items-center gap-3 w-full sm:w-44">
                <Bed size={20} className="text-primary" />
                <input
                  type="number"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="Rooms"
                  className="w-16"
                />
              </label>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner loading-md"></span> : <><Search size={20} /> Search</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Listings */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayed.map((flat) => (
            <motion.div
              key={flat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                <figure>
                  <img
                    src={flat.image}
                    alt={flat.title}
                    className="w-full h-56 object-cover"
                  />
                </figure>
                <div className="card-body p-5">
                  <h2 className="card-title text-xl font-bold line-clamp-2">
                    {flat.title}
                  </h2>
                  <div className="flex items-center gap-2 text-base-content/70">
                    <MapPin size={16} />
                    <span>{flat.location}</span>
                  </div>
                  {flat.rooms && (
                    <div className="badge badge-outline mt-1">{flat.rooms} room{flat.rooms > 1 ? "s" : ""}</div>
                  )}
                  <p className="text-xl font-semibold text-primary mt-3">
                    {flat.price}
                  </p>
                  <div className="card-actions mt-4">
                    <Link to={`/flat/${flat.id}`} className="btn btn-outline btn-primary btn-block">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="join">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`join-item btn ${currentPage === page ? "btn-active" : ""}`}
                  onClick={() => paginate(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}

        {displayed.length === 0 && !loading && (
          <div className="text-center py-16 text-base-content/60">
            <p className="text-xl">No listings match your search yet.</p>
            <p>Try broadening your filters or check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}
