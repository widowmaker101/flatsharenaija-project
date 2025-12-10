import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetch(`${API_URL}/api/listings?limit=${limit}&offset=${page * limit}`)
      .then((res) => res.json())
      .then((data) => setListings((prev) => [...prev, ...data]))
      .catch((err) => console.error("Error fetching listings:", err));
  }, [page]);

  return (
    <div>
      <h2>Listings</h2>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>{listing.title} – ₦{listing.price}</li>
        ))}
      </ul>
      <button onClick={() => setPage(page + 1)}>Load More</button>
    </div>
  );
}
