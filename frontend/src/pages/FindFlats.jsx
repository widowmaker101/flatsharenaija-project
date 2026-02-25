import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const FindFlats = () => {
  const [flats, setFlats] = useState([]);
  const [filteredFlats, setFilteredFlats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [genderPref, setGenderPref] = useState('');

  const fetchFlats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/listings`);
      const data = res.data.items || [];
      setFlats(data);
      setFilteredFlats(data); // initial full list
      if (data.length === 0) {
        toast('No flats found — try again later', { icon: '🔍' });
      }
    } catch (err) {
      toast.error('Failed to load flats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlats();
  }, []);

  // Apply filters whenever inputs change
  useEffect(() => {
    let result = [...flats];

    // Price range
    if (minPrice !== '') {
      result = result.filter(flat => Number(flat.price) >= Number(minPrice));
    }
    if (maxPrice !== '') {
      result = result.filter(flat => Number(flat.price) <= Number(maxPrice));
    }

    // Gender preference
    if (genderPref !== '') {
      result = result.filter(flat => flat.gender_preference === genderPref);
    }

    setFilteredFlats(result);
  }, [minPrice, maxPrice, genderPref, flats]);

  const resetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setGenderPref('');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Find Your Next Flat</h1>

      {/* Filters Section */}
      <div className="mb-8 bg-base-100 p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Filters</h2>
          <button 
            className="btn btn-ghost btn-sm"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Min Price (₦)</label>
            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Max Price (₦)</label>
            <input
              type="number"
              placeholder="1000000"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Gender Preference</label>
            <select
              value={genderPref}
              onChange={e => setGenderPref(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Any</option>
              <option value="male_only">Male Only</option>
              <option value="female_only">Female Only</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-lg">Loading available flats...</p>
      ) : filteredFlats.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No flats match your filters. Try adjusting them or reset.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFlats.map(flat => (
            <div 
              key={flat.id} 
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="card-body">
                <h2 className="card-title text-xl">{flat.title}</h2>
                <p className="text-gray-600">{flat.location}</p>
                <p className="text-2xl font-bold text-success mt-2">
                  ₦{Number(flat.price).toLocaleString()}
                </p>
                <p className="mt-1">
                  {flat.rooms} {flat.rooms === 1 ? 'room' : 'rooms'}
                </p>

                {/* Gender badge */}
                <div className={`badge badge-outline mt-2 px-3 py-1 ${
                  flat.gender_preference === 'male_only' ? 'badge-info' :
                  flat.gender_preference === 'female_only' ? 'badge-secondary' :
                  'badge-neutral'
                }`}>
                  {flat.gender_preference === 'male_only' ? 'Male Only' :
                   flat.gender_preference === 'female_only' ? 'Female Only' : 'Any Gender'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindFlats;
