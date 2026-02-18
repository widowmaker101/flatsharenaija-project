import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function FlatDetail() {
  const { id } = useParams();
  const [flat, setFlat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const fetchFlat = async () => {
      try {
        const res = await axios.get(`/api/listings/${id}`);
        setFlat(res.data);
      } catch (err) {
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
      <p className="text-xl mb-8 max-w-md">{error || "This listing may have been removed or doesn't exist."}</p>
      <Link to="/" className="btn btn-primary btn-lg px-10">
        Back to Home
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200 pb-20">
      {/* Back & Share bar */}
      <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="btn btn-ghost gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </Link>
          <button className="btn btn-ghost gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main image + gallery placeholder */}
          <div className="lg:col-span-3 space-y-4">
            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl cursor-zoom-in group"
              onClick={() => setShowImageModal(true)}
            >
              <img
                src={`${import.meta.env.VITE_API_URL}${flat.image_url}` || 'https://placehold.co/1200x800?text=No+Image'}
                alt={flat.title}
                className="w-full h-96 md:h-[600px] object-cover transition-transform group-hover:scale-105 duration-500"
                onError={(e) => e.target.src = 'https://placehold.co/1200x800?text=No+Image'}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to enlarge
                </span>
              </div>
            </div>

            {/* Small thumbnails placeholder (add more images later) */}
            <div className="grid grid-cols-4 gap-3">
              <div className="aspect-square rounded-xl overflow-hidden border-2 border-primary cursor-pointer">
                <img src={`${import.meta.env.VITE_API_URL}${flat.image_url}`} alt="Thumbnail" className="w-full h-full object-cover" />
              </div>
              {/* Add more thumbnail placeholders */}
              <div className="aspect-square rounded-xl bg-base-300"></div>
              <div className="aspect-square rounded-xl bg-base-300"></div>
              <div className="aspect-square rounded-xl bg-base-300"></div>
            </div>
          </div>

          {/* Info panel */}
          <div className="lg:col-span-2">
            <div className="bg-base-100 rounded-2xl p-8 shadow-lg sticky top-24">
              <h1 className="text-4xl font-bold mb-4">{flat.title}</h1>
              <p className="text-3xl font-bold text-primary mb-6">
                ₦{Number(flat.price).toLocaleString()} <span className="text-base font-normal text-base-content/60">/ month</span>
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-base-content/70">Location</p>
                  <p className="font-semibold">{flat.location}</p>
                </div>
                <div>
                  <p className="text-base-content/70">Rooms</p>
                  <p className="font-semibold">{flat.rooms}</p>
                </div>
                <div>
                  <p className="text-base-content/70">Gender Preference</p>
                  <span className={`badge px-4 py-2 font-medium ${
                    flat.gender_preference === 'male_only'   ? 'badge-gender-male' :
                    flat.gender_preference === 'female_only' ? 'badge-gender-female' :
                    'badge-gender-any'
                  }`}>
                    {flat.gender_preference === 'male_only'   ? 'Male Only' :
                     flat.gender_preference === 'female_only' ? 'Female Only' :
                     'Any Gender'}
                  </span>
                </div>
              </div>

              <div className="divider my-8"></div>

              <h3 className="text-xl font-bold mb-4">Description</h3>
              <p className="text-base-content/80 whitespace-pre-line mb-8">
                {flat.description || 'No description provided.'}
              </p>

              <button className="btn btn-primary btn-lg w-full gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Landlord
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen image modal */}
      {showImageModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-6xl p-0 relative bg-black/95">
            <button 
              className="btn btn-circle btn-ghost absolute right-6 top-6 z-10 text-white text-2xl"
              onClick={() => setShowImageModal(false)}
            >
              ✕
            </button>
            <img
              src={`${import.meta.env.VITE_API_URL}${flat.image_url}`}
              alt={flat.title}
              className="w-full max-h-[90vh] object-contain mx-auto"
            />
          </div>
          <label className="modal-backdrop" onClick={() => setShowImageModal(false)}></label>
        </div>
      )}
    </div>
  );
}
