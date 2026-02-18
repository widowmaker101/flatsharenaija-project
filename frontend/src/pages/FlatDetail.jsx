import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function FlatDetail() {
  const { id } = useParams();
  const [flat, setFlat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchFlat = async () => {
      try {
        const res = await axios.get(`/api/listings/${id}`);
        console.log('Fetched flat:', res.data);
        setFlat(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.detail || 'Failed to load flat details');
        toast.error('Flat not found or error loading');
      } finally {
        setLoading(false);
      }
    };
    fetchFlat();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (error || !flat) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold text-error mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6">Flat Not Found</h2>
      <p className="text-xl mb-8">{error || "The listing you're looking for doesn't exist or has been removed."}</p>
      <Link to="/" className="btn btn-primary btn-lg px-10">
        Back to Home
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Link to="/" className="btn btn-ghost mb-6">← Back to Home</Link>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">{flat.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image with zoom modal trigger */}
        <div 
          className="rounded-2xl overflow-hidden shadow-2xl cursor-zoom-in"
          onClick={() => setShowModal(true)}
        >
          <img
            src={`${import.meta.env.VITE_API_URL}${flat.image_url}` || 'https://placehold.co/800x600?text=No+Image'}
            alt={flat.title}
            className="w-full h-96 md:h-[600px] object-cover transition-transform hover:scale-105 duration-500"
            onError={(e) => e.target.src = 'https://placehold.co/800x600?text=No+Image'}
          />
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Details</h2>

            <div className="space-y-4 text-lg">
              <p><span className="font-semibold">Location:</span> {flat.location}</p>
              <p><span className="font-semibold">Price:</span> ₦{Number(flat.price).toLocaleString()}</p>
              <p><span className="font-semibold">Rooms:</span> {flat.rooms}</p>

              {/* Gender preference badge */}
              {flat.gender_preference && (
                <div className="mt-4">
                  <span className="font-semibold">Gender Preference:</span>
                  <span className={`ml-3 badge px-4 py-2 ${
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

              <p className="mt-6"><span className="font-semibold">Description:</span></p>
              <p className="text-base-content/80 whitespace-pre-line">{flat.description || 'No description provided.'}</p>
            </div>
          </div>

          <button className="btn btn-primary btn-lg w-full">Contact Landlord</button>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-5xl p-0 relative">
            <button 
              className="btn btn-circle btn-ghost absolute right-4 top-4 z-10"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <img
              src={`${import.meta.env.VITE_API_URL}${flat.image_url}` || 'https://placehold.co/1200x900?text=No+Image'}
              alt={flat.title}
              className="w-full h-auto max-h-[90vh] object-contain rounded-2xl"
            />
          </div>
          <label className="modal-backdrop" onClick={() => setShowModal(false)}></label>
        </div>
      )}
    </div>
  );
}
