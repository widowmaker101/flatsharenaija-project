import { useState } from 'react';
import { Link } from 'react-router-dom';

// Placeholder listings (will replace with real API data soon)
const allListings = [
  { id: 1, title: "Cozy Room in Yaba", price: 150000, location: "Yaba, Lagos", amenities: ["WiFi", "Generator"] },
  { id: 2, title: "Modern Flat in Ikeja", price: 250000, location: "Ikeja, Lagos", amenities: ["AC", "Parking"] },
  { id: 3, title: "Spacious Room in Surulere", price: 180000, location: "Surulere, Lagos", amenities: ["Kitchen", "Security"] },
  { id: 4, title: "Affordable Room in Abuja", price: 300000, location: "Wuse, Abuja", amenities: ["WiFi", "Water"] },
];

export default function Listings() {
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);

  const filtered = allListings.filter(listing => {
    return (!location || listing.location.toLowerCase().includes(location.toLowerCase())) &&
           (!maxPrice || listing.price <= Number(maxPrice)) &&
           (amenities.every(a => listing.amenities.includes(a)));
  });

  const toggleAmenity = (a: string) => {
    setAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Find Your Flat</h1>

      {/* Filters */}
      <div className="card bg-base-200 shadow-xl p-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="form-control">
            <label className="label"><span className="label-text">Location</span></label>
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Lagos, Yaba" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Max Price (₦/month)</span></label>
            <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="300000" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Amenities</span></label>
            <div className="flex flex-wrap gap-2">
              {['WiFi', 'AC', 'Generator', 'Parking', 'Kitchen', 'Security', 'Water'].map(a => (
                <button key={a} onClick={() => toggleAmenity(a)} className={`btn ${amenities.includes(a) ? 'btn-primary' : 'btn-ghost'}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(listing => (
          <div key={listing.id} className="card bg-base-200 shadow-xl">
            <figure><div className="bg-gray-200 h-64 rounded-t-box" /></figure>
            <div className="card-body">
              <h3 className="card-title">{listing.title}</h3>
              <p className="text-lg font-bold text-primary">₦{listing.price.toLocaleString()}/month</p>
              <p>{listing.location}</p>
              <div className="card-actions justify-end mt-4">
                <Link to={`/listing/${listing.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
