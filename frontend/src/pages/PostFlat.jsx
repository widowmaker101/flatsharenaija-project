import { useState } from 'react'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'
import { Upload, MapPin, DollarSign, BedDouble, Image as ImageIcon, Home, WashingMachine, Sun, Battery, Power, Tv, Wifi, ParkingSquare } from 'lucide-react'
import axios from 'axios'

export default function PostFlat() {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    rooms: '',
    description: '',
    furnished: false,
    verified: false,
    amenities: [],  // New: array for selected amenities
    images: [],
  })

  const [loading, setLoading] = useState(false)
  const [previewImages, setPreviewImages] = useState([])

  // Nigeria-specific amenities
  const amenitiesOptions = [
    { value: 'furnished', label: 'Furnished', icon: Home },
    { value: 'washing-machine', label: 'Washing Machine', icon: WashingMachine },
    { value: 'generator', label: 'Generator', icon: Power },
    { value: 'solar', label: 'Solar Power', icon: Sun },
    { value: 'inverter', label: 'Inverter', icon: Battery },
    { value: 'tv', label: 'TV', icon: Tv },
    { value: 'wifi', label: 'WiFi', icon: Wifi },
    { value: 'parking', label: 'Parking', icon: ParkingSquare },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAmenityChange = (value) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(value)
        ? prev.amenities.filter(a => a !== value)
        : [...prev.amenities, value]
    }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + formData.images.length > 6) {
      toast.error('Maximum 6 images allowed')
      return
    }

    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))

    // Create previews
    const previews = files.map(file => URL.createObjectURL(file))
    setPreviewImages(prev => [...prev, ...previews])
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
    setPreviewImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      Object.keys(formData).forEach(key => {
        if (key === 'images') {
          formData.images.forEach(image => data.append('images', image))
        } else if (key === 'amenities') {
          data.append('amenities', formData.amenities.join(','))
        } else {
          data.append(key, formData[key])
        }
      })

      // await axios.post('/api/flats', data, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // })

      toast.success('Flat posted successfully! (demo mode)')
      // Reset form
      setFormData({
        title: '', location: '', price: '', rooms: '', description: '',
        furnished: false, verified: false, amenities: [], images: []
      })
      setPreviewImages([])
    } catch (err) {
      toast.error('Failed to post flat')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200 py-16">
      <Toaster />

      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-300/30"
        >
          <div className="card-body p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              List Your Flat in Nigeria
            </h1>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="form-control group">
                  <span className="label-text font-medium mb-2 text-lg">Title *</span>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Modern 2-Bedroom Flat in Lekki Phase 1"
                    className="input input-bordered input-lg w-full text-base-content placeholder:text-base-content/60 focus:border-primary transition-colors"
                    required
                  />
                  <span className="text-sm text-base-content/60 mt-1 invisible group-hover:visible">Make it attractive to attract renters</span>
                </label>

                <label className="form-control group">
                  <span className="label-text font-medium mb-2 text-lg">Location *</span>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Lekki, Lagos or Gwarinpa, Abuja"
                    className="input input-bordered input-lg w-full text-base-content placeholder:text-base-content/60 focus:border-primary transition-colors"
                    required
                  />
                  <span className="text-sm text-base-content/60 mt-1 invisible group-hover:visible">Include neighborhood for better search</span>
                </label>

                <label className="form-control group">
                  <span className="label-text font-medium mb-2 text-lg">Monthly Price (₦) *</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="250000"
                    className="input input-bordered input-lg w-full text-base-content placeholder:text-base-content/60 focus:border-primary transition-colors"
                    required
                  />
                  <span className="text-sm text-base-content/60 mt-1 invisible group-hover:visible">Enter price in Nigerian Naira</span>
                </label>

                <label className="form-control group">
                  <span className="label-text font-medium mb-2 text-lg">Number of Rooms *</span>
                  <input
                    type="number"
                    name="rooms"
                    value={formData.rooms}
                    onChange={handleChange}
                    min="1"
                    placeholder="2"
                    className="input input-bordered input-lg w-full text-base-content placeholder:text-base-content/60 focus:border-primary transition-colors"
                    required
                  />
                  <span className="text-sm text-base-content/60 mt-1 invisible group-hover:visible">Number of bedrooms available</span>
                </label>
              </div>

              {/* Description */}
              <label className="form-control group">
                <span className="label-text font-medium mb-2 text-lg">Description *</span>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the flat, amenities, nearby locations like markets, schools, hospitals. Mention power situation, water availability, etc. Be detailed to attract renters."
                  className="textarea textarea-bordered textarea-lg w-full min-h-40 text-base-content placeholder:text-base-content/60 focus:border-primary transition-colors"
                  rows={6}
                  required
                />
                <span className="text-sm text-base-content/60 mt-1 invisible group-hover:visible">Highlight Nigeria-specific features like backup power, security, etc.</span>
              </label>

              {/* Amenities Selection */}
              <div className="mt-4">
                <span className="label-text font-medium mb-4 text-lg block">Amenities</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {amenitiesOptions.map((amenity) => (
                    <label key={amenity.value} className="label cursor-pointer gap-3 border rounded-lg p-3 hover:border-primary transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity.value)}
                        onChange={() => handleAmenityChange(amenity.value)}
                        className="checkbox checkbox-primary"
                      />
                      <span className="flex items-center gap-2">
                        <amenity.icon size={20} className="text-primary" />
                        {amenity.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div className="form-control">
                <span className="label-text font-medium mb-3 text-lg flex items-center gap-2">
                  <ImageIcon size={22} /> Upload Photos (up to 6) *
                </span>

                <div className="border-2 border-dashed border-base-300 rounded-2xl p-8 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mx-auto mb-4 text-primary" size={48} />
                    <p className="text-lg font-medium">Click to upload or drag & drop</p>
                    <p className="text-sm text-base-content/60 mt-2">PNG, JPG, max 5MB each</p>
                    <p className="text-sm text-base-content/60 mt-2">Show clear photos of rooms, kitchen, compound, etc.</p>
                  </label>
                </div>

                {/* Previews */}
                {previewImages.length > 0 && (
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {previewImages.map((src, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={src}
                          alt={`preview ${index}`}
                          className="w-full h-32 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 btn btn-error btn-xs btn-circle opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="mt-12">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-full md:w-auto px-12"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Posting...
                    </>
                  ) : (
                    'Post Flat'
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
