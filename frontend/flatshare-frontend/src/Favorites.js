import React, { useEffect, useState } from "react";
import { apiRequest } from "./api";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    apiRequest("/favorites")
      .then(res => res.json())
      .then(data => setFavorites(data));
  }, []);

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet. Save some listings!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {favorites.map(listing => (
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
