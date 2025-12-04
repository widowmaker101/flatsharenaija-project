import React, { useEffect, useState } from "react";
import { apiRequest } from "./api";

export default function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    apiRequest("/listings")
      .then(res => res.json())
      .then(data => setListings(data));
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
          </li>
        ))}
      </ul>
    </div>
  );
}
