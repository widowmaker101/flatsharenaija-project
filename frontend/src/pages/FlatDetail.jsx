import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function FlatDetail() {
  const { id } = useParams();
  const [flat, setFlat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlat = async () => {
      try {
        const res = await axios.get(`/api/listings/${id}`);
        setFlat(res.data);
      } catch (err) {
        toast.error('Failed to load flat details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFlat();
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!flat) return <p className="text-center py-20 text-error">Flat not found</p>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">{flat.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={`${import.meta.env.VITE_API_URL}${flat.image_url}` || 'https://placehold.co/800x600?text=No+Image'}
            alt={flat.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            onError={(e) => e.target.src = 'https://placehold.co/800x600?text=No+Image'}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Details</h2>
            <p className="mt-2"><span className="font-medium">Location:</span> {flat.location}</p>
            <p><span className="font-medium">Price:</span> ₦{Number(flat.price).toLocaleString()}</p>
            <p><span className="font-medium">Rooms:</span> {flat.rooms}</p>

            {/* Gender preference badge */}
            {flat.gender_preference && (
              <div className="mt-4">
                <span className="font-medium">Gender Preference:</span>
                <span className={`ml-2 badge ${
                  flat.gender_preference === 'male_only'   ? 'badge-gender-male' :
                  flat.gender_preference === 'female_only' ? 'badge-gender-female' :
                  'badge-gender-any'
                }`}>
                  {flat.gender_preference === 'male_only'   ? 'Male Only' :
                   flat.gender_preference === 'female_only' ? 'Female Only' :
                   'Any Gender'}
                </span>
              </div>
            )}

            <p className="mt-4"><span className="font-medium">Description:</span> {flat.description || 'No description available'}</p>
          </div>

          <button className="btn btn-primary w-full">Contact Landlord</button>
        </div>
      </div>
    </div>
  );
}
