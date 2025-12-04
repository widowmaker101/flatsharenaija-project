import React, { useEffect, useState } from "react";
import { apiRequest } from "./api";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchListings = async () => {
    let query = "/listings";
    const params = [];
    if (location) params.push(`location=${location}`);
    if (minPrice) params.push(`min_price=${minPrice}`);
    if (maxPrice) params.push(`max_price=${maxPrice}`);
    if (params.length > 0) query += "?" + params.join("&");

    const res = await apiRequest(query);
    const data = await res.json();
    setListings(data);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div>
      <h2>Available Listings</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Filter by location"
        />
        <input
          type="number"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          placeholder="Min price"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          placeholder="Max price"
        />
        <button onClick={fetchListings}>Search</button>
      </div>
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
