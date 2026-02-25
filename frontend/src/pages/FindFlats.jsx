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
  const [bedrooms, setBedrooms] = useState('');
  const [furnished, setFurnished] = useState('');
  const [serviceCharge, setServiceCharge] = useState('');

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

  // Apply filters whenever any filter value changes
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

    // Bedrooms (assuming flat.rooms is number of bedrooms)
    if (bedrooms !== '') {
      const minBeds = bedrooms === '4+' ? 4 : Number(bedrooms);
      result = result.filter(flat => Number(flat.rooms) >= minBeds);
    }

    // Furnished status (you will need to add this field to your backend model later)
    if (furnished !== '') {
      // For now we just log - add real field when backend supports it
      console.log(`Filtering for furnished: ${furnished}`);
      // result = result.filter(flat => flat.furnished_status === furnished);
    }

    // Service charge (you will need to add this field to backend)
    if (serviceCharge !== '') {
      console.log(`Filtering for service charge: ${serviceCharge}`);
      // result = result.filter(flat => flat.service_charge_included === (serviceCharge === 'included'));
    }

    setFilteredFlats(result);
  }, [minPrice, maxPrice, genderPref, bedrooms, furnished, serviceCharge, flats]);

  const resetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setGenderPref('');
    setBedrooms('');
    setFurnished('');
    setServiceCharge('');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
        Find Your Next Flat
      </h1>

      {/* Filters Section */}
      <div className="mb-10 bg-base-100 p-6 md:p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Filters</h2>
          <button 
            className="btn btn-outline btn-sm"
            onClick={resetFilters}
          >
            Reset All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* Min Price */}
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

          {/* Max Price */}
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

          {/* Gender Preference */}
          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
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

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium mb-2">Bedrooms</label>
            <select
              value={bedrooms}
              onChange={e => setBedrooms(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4+">4+</option>
            </select>
          </div>

          {/* Furnished */}
          <div>
            <label className="block text-sm font-medium mb-2">Furnishing</label>
            <select
              value={furnished}
              onChange={e => setFurnished(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Any</option>
              <option value="furnished">Furnished</option>
              <option value="semi_furnished">Semi-Furnished</option>
              <option value="unfurnished">Unfurnished</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : filteredFlats.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500 mb-4">
            No flats match your filters.
          </p>
          <button 
            className="btn btn-primary"
            onClick={resetFilters}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFlats.map(flat => (
            <div 
              key={flat.id} 
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <figure className="relative">
                <img
                  src={`${import.meta.env.VITE_API_URL}${flat.image_url}` || 'https://placehold.co/600x400?text=No+Image'}
                  alt={flat.title}
                  className="w-full h-56 object-cover"
                  onError={e => e.target.src = 'https://placehold.co/600x400?text=No+Image'}
                />
              </figure>

              <div className="card-body p-5">
                <h2 className="card-title text-lg font-bold line-clamp-2">
                  {flat.title}
                </h2>

                <p className="text-base-content/70 text-sm mt-1">
                  {flat.location}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <div className="badge badge-outline">
                    {flat.rooms} {flat.rooms === 1 ? 'room' : 'rooms'}
                  </div>

                  <div className={`badge ${
                    flat.gender_preference === 'male_only' ? 'badge-info' :
                    flat.gender_preference === 'female_only' ? 'badge-secondary' :
                    'badge-neutral'
                  }`}>
                    {flat.gender_preference === 'male_only' ? 'Male Only' :
                     flat.gender_preference === 'female_only' ? 'Female Only' : 'Any'}
                  </div>
                </div>

                <p className="text-2xl font-bold text-primary mt-4">
                  ₦{Number(flat.price).toLocaleString()}
                </p>

                <div className="card-actions mt-5">
                  <button className="btn btn-primary btn-block">
                    View Details
                  </button>
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
