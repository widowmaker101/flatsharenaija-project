import React, { useEffect, useState } from "react";
import { apiRequest } from "./api";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const fetchListings = async () => {
    const res = await apiRequest("/listings");
    const data = await res.json();
    setListings(data);
  };

  const fetchFavorites = async () => {
    const res = await apiRequest("/favorites");
    const data = await res.json();
    setFavorites(data.map(f => f.id));
  };

  const addFavorite = async (id) => {
    await apiRequest(`/favorites/${id}`, { method: "POST" });
    fetchFavorites();
  };

  useEffect(() => {
    fetchListings();
    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Available Listings</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {listings.map(listing => (
          <li key={listing.id} style={{ marginBottom: "20px" }}>
            <strong>{listing.title}</strong> — {listing.location} — ₦{listing.price}
            <p>{listing.description}</p>
            {listing.image_url && (
              <img
                src={listing.image_url}
                alt={listing.title}
                style={{ maxWidth: "300px", borderRadius: "8px" }}
              />
            )}
            <button onClick={() => addFavorite(listing.id)}>
              {favorites.includes(listing.id) ? "★ Favorited" : "☆ Save"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
