import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const API_URL = import.meta.env.VITE_API_URL;

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/listings?limit=${limit}&offset=${page * limit}`)
      .then((res) => res.json())
      .then((data) => {
        setListings((prev) => [...prev, ...data]);
        toast.success("Listings loaded!");
      })
      .catch(() => toast.error("Failed to fetch listings"))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div>
      <h2>Listings</h2>
      {loading && <ClipLoader color="#36d7b7" />}
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>{listing.title} – ₦{listing.price}</li>
        ))}
      </ul>
      <button onClick={() => setPage(page + 1)}>Load More</button>
    </div>
  );
}
