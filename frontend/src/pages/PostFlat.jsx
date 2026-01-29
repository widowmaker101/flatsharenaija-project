import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function PostFlat() {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error('Please login to post a flat');
      navigate('/login');
    }
  }, [token, navigate]);

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [rooms, setRooms] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('rooms', rooms);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/listings`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Flat posted successfully!');
      setTitle(''); setLocation(''); setPrice(''); setRooms(''); setDescription(''); setImage(null);
    } catch (err) {
      toast.error('Failed to post flat');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!token) return null; // Already redirected

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Post a New Flat</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Price (₦)</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Rooms</label>
          <input type="number" value={rooms} onChange={e => setRooms(e.target.value)} className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="textarea textarea-bordered w-full" rows="4" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Upload Image</label>
          <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="file-input file-input-bordered w-full" />
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? 'Posting...' : 'Post Flat'}
        </button>
      </form>
    </div>
  );
}
