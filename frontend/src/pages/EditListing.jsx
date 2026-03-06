import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';

export default function EditListing() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    rooms: '',
    description: '',
    gender_preference: 'any',
  });
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error('Please login to edit listings');
      navigate('/login');
      return;
    }

    const fetchListing = async () => {
      try {
        const res = await axios.get(`/api/listings/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data;
        setForm({
          title: data.title || '',
          location: data.location || '',
          price: data.price?.toString() || '',
          rooms: data.rooms?.toString() || '',
          description: data.description || '',
          gender_preference: data.gender_preference || 'any',
        });
        setCurrentImage(data.image_url || '');
      } catch (err) {
        toast.error('Could not load listing data');
        navigate('/my-listings');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('location', form.location);
    formData.append('price', form.price);
    formData.append('rooms', form.rooms);
    formData.append('description', form.description);
    formData.append('gender_preference', form.gender_preference);
    if (image) formData.append('image', image);

    try {
      await axios.put(`/api/listings/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Listing updated successfully!');
      navigate('/my-listings');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to update listing');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Edit Your Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-base-100 p-8 rounded-2xl shadow-xl">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value})}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-2">Location *</label>
          <input
            type="text"
            value={form.location}
            onChange={e => setForm({...form, location: e.target.value})}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Price & Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Price (₦) *</label>
            <input
              type="number"
              value={form.price}
              onChange={e => setForm({...form, price: e.target.value})}
              className="input input-bordered w-full"
              required
              min="10000"
              step="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Rooms *</label>
            <input
              type="number"
              value={form.rooms}
              onChange={e => setForm({...form, rooms: e.target.value})}
              className="input input-bordered w-full"
              required
              min="1"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-2">Gender Preference</label>
          <select
            value={form.gender_preference}
            onChange={e => setForm({...form, gender_preference: e.target.value})}
            className="select select-bordered w-full"
          >
            <option value="any">Any Gender</option>
            <option value="male_only">Male Only</option>
            <option value="female_only">Female Only</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
            className="textarea textarea-bordered w-full min-h-[120px]"
            placeholder="Describe the flat, amenities, rules, etc..."
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Current Image</label>
          {currentImage && (
            <div className="mb-4">
              <img
                src={`${import.meta.env.VITE_API_URL}${currentImage}`}
                alt="Current listing"
                className="w-full max-h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          <label className="block text-sm font-medium mb-2">Upload New Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files?.[0] || null)}
            className="file-input file-input-bordered w-full"
          />
          <p className="text-xs text-gray-500 mt-1">Uploading a new image will replace the current one.</p>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button 
            type="submit" 
            className="btn btn-primary w-full"
            disabled={submitting || loading}
          >
            {submitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Update Listing'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
