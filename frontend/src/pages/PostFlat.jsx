import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext.jsx';

export default function PostFlat() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [rooms, setRooms] = useState('');
  const [genderPreference, setGenderPreference] = useState('any');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error('Please login to post a flat');
      navigate('/login');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ──── DEBUG: Check token before sending ────
    console.log('Current token from context:', token);
    if (!token) {
      toast.error('No token found. Logging out...');
      localStorage.removeItem('token');
      navigate('/login');
      return;
    }
    console.log('Sending Authorization header: Bearer ' + token.substring(0, 10) + '...');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('rooms', rooms);
    formData.append('gender_preference', genderPreference);
    if (description.trim()) formData.append('description', description.trim());

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('/api/listings/', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        
      withCredentials: true,  // optional, helps with CORS if using cookies
      });

      toast.success('Flat posted successfully!');
      setTitle('');
      setLocation('');
      setPrice('');
      setRooms('');
      setDescription('');
      setGenderPreference('any');
      setImage(null);
      navigate('/');
    } catch (err) {
      console.error('Full error:', err);
      console.error('Response status:', err.response?.status);
      console.error('Response data:', err.response?.data);
      const detail = err.response?.data?.detail || err.message || 'Unknown error';
      toast.error(`Failed to post flat: ${detail}`);
    } finally {
      setLoading(false);
    }
  };

  if (!token) return null;

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Post a New Flat</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Location *</label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Price (₦) *</label>
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="input input-bordered w-full"
            required
            min="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Rooms *</label>
          <input
            type="number"
            value={rooms}
            onChange={e => setRooms(e.target.value)}
            className="input input-bordered w-full"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Gender Preference</label>
          <select
            value={genderPreference}
            onChange={e => setGenderPreference(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="any">Any Gender</option>
            <option value="male_only">Male Only</option>
            <option value="female_only">Female Only</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Upload Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files?.[0] || null)}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            'Post Flat'
          )}
        </button>
      </form>
    </div>
  );
}
