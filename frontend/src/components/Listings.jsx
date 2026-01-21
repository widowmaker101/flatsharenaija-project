import { useEffect, useState } from "react";
import axios from "axios";

export default function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/listings")
      .then(res => setListings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {listings.map(listing => (
        <div key={listing.id} className="card bg-base-200 shadow-xl">
          <figure>
            <img src={listing.image || "https://via.placeholder.com/400"} alt={listing.title} className="h-48 w-full object-cover"/>
          </figure>
          <div className="card-body">
            <h2 className="card-title">{listing.title}</h2>
            <p>{listing.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">View</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
