import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [query, setQuery] = useState("");
  const [flats, setFlats] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/flats?location=${encodeURIComponent(query)}`);
      setFlats(res.data);
    } catch (err) {
      console.error("Error fetching flats:", err);
    }
  };

  const sampleFlats = [
    {
      id: 1,
      title: "Modern 2-Bedroom Flat",
      location: "Abuja",
      price: "₦250,000 / month",
      image: "https://via.placeholder.com/400x250.png?text=Flat+1",
    },
    {
      id: 2,
      title: "Cozy Studio Apartment",
      location: "Lagos",
      price: "₦150,000 / month",
      image: "https://via.placeholder.com/400x250.png?text=Flat+2",
    },
    {
      id: 3,
      title: "Shared Flat with Balcony",
      location: "Port Harcourt",
      price: "₦180,000 / month",
      image: "https://via.placeholder.com/400x250.png?text=Flat+3",
    },
  ];

  return (
    <div className="min-h-screen bg-hero-gradient dark:bg-brandGray flex flex-col items-center px-6 py-12">
      {/* Hero Section */}
      <h1 className="text-6xl font-extrabold text-brandBlue dark:text-white mb-8 text-center">
        Welcome to Flatshare Naija
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 text-center max-w-2xl">
        Find affordable flats, connect with landlords, and chat instantly.
      </p>

      {/* Big Search Bar with Button Below */}
      <form onSubmit={handleSearch} className="flex flex-col items-center w-full mb-16 px-4">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by location (e.g., Abuja, Lagos)"
          className="w-full max-w-3xl px-8 py-6 text-2xl font-bold rounded-lg text-gray-900 dark:text-white dark:bg-brandGray focus:outline-none focus:ring-4 focus:ring-brandBlue mb-6"
        />
        <button
          type="submit"
          className="w-full max-w-xs bg-brandBlue text-white px-10 py-6 text-2xl font-extrabold rounded-lg hover:bg-brandPeach hover:text-white transition"
        >
          Search
        </button>
      </form>

      {/* Listings Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {(flats.length > 0 ? flats : sampleFlats).map((flat) => (
          <Link
            key={flat.id}
            to={`/flats/${flat.id}`}
            className="bg-white dark:bg-brandGray rounded-xl shadow-glass hover:shadow-lg transition overflow-hidden"
          >
            <img src={flat.image} alt={flat.title} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-brandBlue dark:text-white mb-2">
                {flat.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{flat.location}</p>
              <p className="text-brandPeach font-bold mt-2">{flat.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
