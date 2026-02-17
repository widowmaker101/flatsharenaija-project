import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const FindFlats = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/listings`);
      setFlats(res.data.items || []);
      if (res.data.items?.length === 0) toast('No flats found — try again later', { icon: '🔍' });
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Find Your Next Flat</h1>
      {loading ? (
        <p className="text-center text-lg">Loading available flats...</p>
      ) : flats.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No flats available right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flats.map(flat => (
            <div key={flat.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
              <div className="card-body">
                <h2 className="card-title text-xl">{flat.title}</h2>
                <p className="text-gray-600">{flat.location}</p>
                <p className="text-2xl font-bold text-success mt-2">
                  ₦{flat.price.toLocaleString()}
                </p>
                <p className="mt-1">{flat.rooms} {flat.rooms === 1 ? 'room' : 'rooms'}</p>
             <div className="badge badge-outline mt-2">
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
