import React, { useState, useEffect } from "react";
import { apiRequest } from "./api";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [preferences, setPreferences] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    apiRequest("/profile")
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setBio(data.bio || "");
        setPhone(data.phone || "");
        setPreferences(data.preferences || "");
      });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await apiRequest("/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio, phone, preferences })
    });
    if (res.ok) {
      setMessage("Profile updated successfully!");
    } else {
      setMessage("Error updating profile");
    }
  };

  return (
    <div>
      <h2>My Profile</h2>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <form onSubmit={handleUpdate}>
        <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Bio" />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
        <input value={preferences} onChange={e => setPreferences(e.target.value)} placeholder="Preferences" />
        <button type="submit">Update Profile</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
