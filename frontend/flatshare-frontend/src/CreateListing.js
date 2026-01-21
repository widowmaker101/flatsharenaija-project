import React, { useState } from "react";
import { apiRequest } from "./api";

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("Available");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("availability", availability);

    const res = await apiRequest("/listings", {
      method: "POST",
      body: formData
    });

    if (res.ok) {
      setMessage("Listing created successfully!");
      setTitle(""); setDescription(""); setLocation(""); setPrice("");
    } else {
      const err = await res.json();
      setMessage("Error: " + err.detail);
    }
  };

  return (
    <div>
      <h2>Create a New Listing</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" required />
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required />
        <select value={availability} onChange={e => setAvailability(e.target.value)}>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        <button type="submit">Create Listing</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
<input type="file" onChange={e => formData.append("image", e.target.files[0])} />
