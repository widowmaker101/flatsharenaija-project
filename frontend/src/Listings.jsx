import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const fetchListings = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/listings`, {
        params: { limit, offset: page * limit }
      });

      const newItems = res.data.items || [];
      setListings((prev) => [...prev, ...newItems]);
      setHasMore(newItems.length === limit);
      setPage((prev) => prev + 1);
      toast.success("Listings loaded!");
    } catch (err) {
      toast.error("Failed to fetch listings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Available Listings</h2>

      {loading && (
        <div className="flex justify-center my-10">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <li
            key={listing.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="card-body">
              <h3 className="card-title text-xl">{listing.title}</h3>
              <p className="text-gray-600">{listing.location}</p>
              <p className="text-xl font-bold text-success mt-2">
                ₦{listing.price.toLocaleString()}
              </p>
              <p className="text-gray-500">{listing.rooms} rooms</p>
            </div>
          </li>
        ))}
      </ul>

      {hasMore && !loading && (
        <div className="text-center mt-10">
          <button
            onClick={fetchListings}
            className="btn btn-primary btn-wide"
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && listings.length > 0 && (
        <p className="text-center mt-10 text-gray-500">All listings loaded</p>
      )}
    </div>
  );
}
