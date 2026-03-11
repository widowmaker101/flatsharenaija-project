import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';

const amenitiesOptions = [
  'Stable Electricity / Generator',
  'Reliable Water Supply / Borehole',
  'Air Conditioning',
  'High-speed Wi-Fi',
  'Parking Space',
  'Security / Gate Man',
  'Furnished Kitchen',
  'Swimming Pool',
  'Gym / Fitness Center',
  'Prepaid Electricity Meter',
];

export default function PostFlat() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [rooms, setRooms] = useState('');
  const [description, setDescription] = useState('');
  const [genderPreference, setGenderPreference] = useState('any');
  const [furnishedStatus, setFurnishedStatus] = useState('unfurnished');
  const [serviceChargeIncluded, setServiceChargeIncluded] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAmenityToggle = (amenity) => {
    setAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!token) {
      toast.error('Please login to post');
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('rooms', rooms);
    formData.append('description', description);
    formData.append('gender_preference', genderPreference);
    formData.append('furnished_status', furnishedStatus);
    formData.append('service_charge_included', serviceChargeIncluded);
    formData.append('amenities', amenities.join(', ')); // comma separated string
    if (image) formData.append('image', image);

    try {
      await axios.post('/api/listings/', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Flat posted successfully!');
      navigate('/my-listings');
    } catch (err) {
      toast.error('Failed to post flat');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Post a Flat</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
            placeholder="e.g. Cozy 2 Bedroom Flat in Lekki"
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
            placeholder="e.g. Lekki Phase 1, Lagos"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Price (₦) *</label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="input input-bordered w-full"
              required
              min="0"
              placeholder="e.g. 1500000"
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
              placeholder="e.g. 2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Gender Preference</label>
          <select
            value={genderPreference}
            onChange={e => setGenderPreference(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="any">Any</option>
            <option value="male_only">Male Only</option>
            <option value="female_only">Female Only</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Furnishing Status</label>
          <select
            value={furnishedStatus}
            onChange={e => setFurnishedStatus(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="unfurnished">Unfurnished</option>
            <option value="semi_furnished">Semi-Furnished</option>
            <option value="furnished">Furnished</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Service Charge Included</label>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Yes</span>
              <input
                type="checkbox"
                checked={serviceChargeIncluded}
                onChange={e => setServiceChargeIncluded(e.target.checked)}
                className="checkbox checkbox-primary"
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Amenities (select all that apply)</label>
          <div className="grid grid-cols-2 gap-2">
            {amenitiesOptions.map(amenity => (
              <div key={amenity} className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text text-sm">{amenity}</span>
                  <input
                    type="checkbox"
                    checked={amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Describe the flat, amenities, nearby facilities, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image (optional)</label>
          <input
            type="file"
            onChange={e => setImage(e.target.files[0])}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? 'Posting...' : 'Post Flat'}
        </button>
      </form>
    </div>
  );
}
