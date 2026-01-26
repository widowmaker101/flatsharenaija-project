import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { Search, MapPin, DollarSign, BedDouble, SlidersHorizontal, Home, WashingMachine, Sun, Battery, Power, Tv, Wifi, ParkingSquare } from 'lucide-react';
import axios from 'axios';
import WhatsAppButton from '../components/WhatsAppButton';  // <-- make sure this path is correct

export default function FindFlats() {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    minRooms: '',
    furnished: false,
    verified: false,
    amenities: [],
  });
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(false);

  const amenitiesOptions = [
    { value: 'furnished', label: 'Furnished', icon: Home },
    { value: 'washing-machine', label: 'Washing Machine', icon: WashingMachine },
    { value: 'generator', label: 'Generator', icon: Power },
    { value: 'solar', label: 'Solar Power', icon: Sun },
    { value: 'inverter', label: 'Inverter', icon: Battery },
    { value: 'tv', label: 'TV', icon: Tv },
    { value: 'wifi', label: 'WiFi', icon: Wifi },
    { value: 'parking', label: 'Parking', icon: ParkingSquare },
  ];

  useEffect(() => {
    fetchFlats();
  }, []);

  const fetchFlats = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.location) params.append('location', filters.location);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.minRooms) params.append('minRooms', filters.minRooms);
      if (filters.amenities.length > 0) params.append('amenities', filters.amenities.join(','));

      const res = await axios.get(`/api/flats?${params.toString()}`);
      setFlats(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error('Failed to load flats');
      console.error(err);
      setFlats([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAmenityChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(value)
        ? prev.amenities.filter((a) => a !== value)
        : [...prev.amenities, value],
    }));
  };

  const applyFilters = (e) => {
    e.preventDefault();
    fetchFlats();
  };

  return (
    <div className="min-h-screen bg-base-200 pt-20 pb-16">
      <Toaster />

      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Find Your Perfect Flat in Nigeria
        </h1>

        {/* Filters */}
        <div className="card bg-base-100 shadow-2xl mb-12 rounded-3xl overflow-hidden border border-base-300/30">
          <div className="card-body p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <SlidersHorizontal className="text-primary" size={28} />
              <h2 className="text-2xl font-bold">Customize Your Search</h2>
            </div>

            <form onSubmit={applyFilters} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <label className="form-control">
                <span className="label-text font-medium mb-2">Location</span>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="Lekki, Ikeja, Abuja CBD..."
                  className="input input-bordered input-lg w-full"
                />
              </label>

              <label className="form-control">
                <span className="label-text font-medium mb-2">Min Price (₦)</span>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="0"
                  className="input input-bordered input-lg w-full"
                />
              </label>

              <label className="form-control">
                <span className="label-text font-medium mb-2">Max Price (₦)</span>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="1000000"
                  className="input input-bordered input-lg w-full"
                />
              </label>

              <label className="form-control">
                <span className="label-text font-medium mb-2">Min Rooms</span>
                <input
                  type="number"
                  name="minRooms"
                  value={filters.minRooms}
                  onChange={handleFilterChange}
                  placeholder="1"
                  min="1"
                  className="input input-bordered input-lg w-full"
                />
              </label>

              {/* Amenities */}
              <div className="col-span-full mt-6">
                <span className="label-text font-medium mb-3 block text-lg">Amenities</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {amenitiesOptions.map((amenity) => (
                    <label key={amenity.value} className="label cursor-pointer gap-3 border rounded-lg p-3 hover:border-primary transition-colors">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity.value)}
                        onChange={() => handleAmenityChange(amenity.value)}
                        className="checkbox checkbox-primary"
                      />
                      <span className="flex items-center gap-2">
                        <amenity.icon size={20} className="text-primary" />
                        {amenity.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="col-span-full mt-8">
                <button type="submit" className="btn btn-primary btn-lg w-full md:w-auto px-12" disabled={loading}>
                  {loading ? <span className="loading loading-spinner"></span> : 'Search Flats'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-32">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : flats.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-3xl font-bold mb-4">No flats found</h3>
            <p className="text-lg text-base-content/70 mb-8">
              Try different filters or popular areas like Lekki, Gwarinpa, Victoria Island...
            </p>
            <button onClick={() => window.location.reload()} className="btn btn-outline btn-lg">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flats.map((flat) => (
              <motion.div
                key={flat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border border-base-300/30"
              >
                <figure>
                  <img
                    src={flat.image || 'https://via.placeholder.com/600x400?text=Flat'}
                    alt={flat.title}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </figure>
                <div className="card-body p-6">
                  <h2 className="card-title text-xl font-bold line-clamp-2">{flat.title}</h2>
                  <p className="text-base-content/70 flex items-center gap-2 mt-1">
                    <MapPin size={18} /> {flat.location}
                  </p>
                  <div className="flex items-center gap-6 mt-3">
                    <div>
                      <span className="font-bold text-primary text-2xl">₦{flat.price?.toLocaleString()}</span>
                      <span className="text-sm opacity-70"> / month</span>
                    </div>
                    <div className="badge badge-outline text-lg">
                      {flat.rooms} {flat.rooms === 1 ? 'room' : 'rooms'}
                    </div>
                  </div>

                  {/* Amenities */}
                  {flat.amenities?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {flat.amenities.map((amenity, idx) => (
                        <span key={idx} className="badge badge-primary badge-sm">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="card-actions mt-6 flex flex-col sm:flex-row gap-3">
                    <Link
                      to={`/flat/${flat.id}`}
                      className="btn btn-primary flex-1 btn-block"
                    >
                      View Details
                    </Link>

                    <WhatsAppButton
                      variant="outline"
                      size="small"
                      message={`Hi! I'm interested in your listing:\n${flat.title}\n${flat.location}\n₦${flat.price?.toLocaleString()}`}
                      className="btn-block sm:btn-auto"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
