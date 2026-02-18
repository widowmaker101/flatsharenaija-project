import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';
import { MapPin, DollarSign, Bed, Edit, Trash2, PlusSquare, List } from 'lucide-react';

export default function MyListings() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      toast.error('Please login to view your listings');
      navigate('/login');
      return;
    }

    const fetchMyListings = async () => {
      try {
        const res = await axios.get('/api/listings/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setListings(res.data.items || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load your listings');
        toast.error(err.response?.data?.detail || 'Error loading listings');
      } finally {
        setLoading(false);
      }
    };
    fetchMyListings();
  }, [token, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      await axios.delete(`/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setListings(prev => prev.filter(l => l.id !== id));
      toast.success('Listing deleted successfully');
    } catch (err) {
      toast.error('Failed to delete listing');
      console.error(err);
    }
  };

  if (!token) return null;

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">My Listings</h1>
        <Link to="/post-flat" className="btn btn-primary gap-2">
          <PlusSquare size={20} />
          Post New Flat
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-error">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <button className="btn btn-outline btn-error mt-6" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-20 bg-base-100 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">No Listings Yet</h2>
          <p className="text-xl mb-8 text-base-content/70">
            You haven't posted any flats yet. Start sharing your space today!
          </p>
          <Link to="/post-flat" className="btn btn-primary btn-lg px-10 gap-2">
            <PlusSquare size={20} />
            Post Your First Flat
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {listings.map((flat) => (
            <div key={flat.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <figure className="relative overflow-hidden h-64">
                <img
                  src={`${import.meta.env.VITE_API_URL}${flat.image_url}` || 'https://placehold.co/800x500?text=No+Image'}
                  alt={flat.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  onError={(e) => e.target.src = 'https://placehold.co/800x500?text=No+Image'}
                />
              </figure>

              <div className="card-body p-6">
                <h2 className="card-title text-xl font-bold line-clamp-2">
                  {flat.title}
                </h2>

                <div className="flex items-center gap-2 text-base-content/70">
                  <MapPin size={16} />
                  <span>{flat.location}</span>
                </div>

                {flat.rooms && (
                  <div className="badge badge-outline mt-2">
                    {flat.rooms} room{flat.rooms > 1 ? 's' : ''}
                  </div>
                )}

                {flat.gender_preference && (
                  <div className={`badge mt-2 font-medium px-3 py-1 ${
                    flat.gender_preference === 'male_only'   ? 'badge-gender-male' :
                    flat.gender_preference === 'female_only' ? 'badge-gender-female' :
                    'badge-gender-any'
                  }`}>
                    {flat.gender_preference === 'male_only'   ? 'Male Only' :
                     flat.gender_preference === 'female_only' ? 'Female Only' :
                     'Any Gender'}
                  </div>
                )}

                <p className="text-2xl font-bold text-primary mt-4">
                  ₦{Number(flat.price).toLocaleString()}
                </p>

                <div className="card-actions mt-6 grid grid-cols-2 gap-4">
                  <Link to={`/flat/${flat.id}`} className="btn btn-outline btn-primary">
                    View Details
                  </Link>
                  <Link to={`/edit-listing/${flat.id}`} className="btn btn-outline btn-info">
                    <Edit size={16} /> Edit
                  </Link>
                </div>

                <button
                  className="btn btn-outline btn-error mt-4 w-full"
                  onClick={() => handleDelete(flat.id)}
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
