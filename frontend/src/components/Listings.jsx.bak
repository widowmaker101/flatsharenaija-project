import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/listings`);
        setListings(res.data.items || []);
      } catch (err) {
        toast.error("Failed to load listings");
        console.error(err);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map(l => (
          <div key={l.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
            <div className="card-body">
              <h3 className="card-title text-xl">{l.title}</h3>
              <p className="text-gray-600">{l.location}</p>
              <p className="text-2xl font-bold text-success mt-2">
                ₦{l.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
