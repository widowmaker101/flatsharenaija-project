import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Modern lightbox
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

// Leaflet map
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Force absolute CDN icon paths + fallback (fixes question mark / broken marker)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

import { 
  MapPin, DollarSign, BedDouble, Home, WashingMachine, Sun, Battery, 
  Power, Tv, Wifi, ParkingSquare, Share2, Heart, Flag, MessageCircle 
} from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';

export default function FlatDetail() {
  const { id } = useParams();
  const [flat, setFlat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Mock data with 5 STABLE Unsplash images (tested Jan 2026)
  useEffect(() => {
    setTimeout(() => {
      const mockFlat = {
        id,
        title: "Luxury 3-Bedroom Flat with Generator & Solar Backup",
        location: "Lekki Phase 1, Lagos",
        price: "850000",
        rooms: 3,
        bathrooms: 3,
        description: `This spacious and well-maintained 3-bedroom flat is located in the heart of Lekki Phase 1. 
          Features include: fully tiled floors, POP ceiling, modern kitchen cabinets, pre-paid meter, 
          24/7 security with CCTV, dedicated parking, constant power via solar inverter + generator backup, 
          high-speed fibre internet, clean borehole water, and proximity to malls, schools, and hospitals.`,
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
          "https://images.unsplash.com/photo-1600563438938-a9a272e7f8e1?w=1200",
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200",
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
        ],
        amenities: ['furnished', 'generator', 'solar', 'wifi', 'parking', 'inverter', 'tv'],
        landlord: {
          name: "Mrs. Aisha Bello",
          phone: "+2347030176297",
        },
        posted: "2 days ago",
        views: 342,
        lat: 6.4419,
        lng: 3.5349,
      };

      setFlat(mockFlat);
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.includes(id));
      setLoading(false);
    }, 800);
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(id)) {
      favorites = favorites.filter(favId => favId !== id);
      toast.success('Removed from favorites');
    } else {
      favorites.push(id);
      toast.success('Added to favorites');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const reportListing = () => {
    toast('Report submitted. Thank you!', { icon: '🚩', duration: 4000 });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!flat) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-6 text-primary">Flat Not Found</h2>
          <Link to="/find-flats" className="btn btn-primary btn-lg">
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 pb-20">
      <Toaster position="top-center" />

      {/* Gallery */}
      <div className="relative">
        <div className="h-[50vh] md:h-[70vh] overflow-hidden">
          <img
            src={flat.images[0]}
            alt={flat.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-100/90 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="carousel carousel-center max-w-full space-x-4 p-4 bg-base-100 rounded-2xl shadow-2xl border border-base-300/30">
            {flat.images.map((img, idx) => (
              <div 
                key={idx}
                className="carousel-item cursor-pointer"
                onClick={() => {
                  setPhotoIndex(idx);
                  setLightboxOpen(true);
                }}
              >
                <img 
                  src={img} 
                  alt={`Thumbnail ${idx + 1}`} 
                  className="w-32 h-24 md:w-40 md:h-32 object-cover rounded-lg hover:opacity-90 transition-opacity"
                  onError={(e) => {
                    e.target.src = 'https://picsum.photos/300/200?random=' + (idx + 1);
                    e.target.onerror = null;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={flat.images.map(src => ({ src }))}
        index={photoIndex}
        plugins={[Thumbnails, Zoom]}
        thumbnails={{ position: 'bottom', gap: 16, border: 0 }}
        zoom={{ maxZoomPixelRatio: 3 }}
      />

      <div className="container mx-auto px-4 md:px-6 -mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-300/30"
        >
          <div className="card-body p-6 md:p-10 lg:p-12">
            {/* Title, Price, Actions */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {flat.title}
                </h1>
                <p className="text-3xl font-bold text-primary mb-2">
                  ₦{Number(flat.price).toLocaleString()} <span className="text-xl opacity-70">/ month</span>
                </p>
                <p className="flex items-center gap-3 text-xl text-base-content/80">
                  <MapPin size={24} className="text-accent" /> {flat.location}
                </p>
                <div className="flex gap-4 mt-4 text-sm opacity-70">
                  <span>Posted {flat.posted}</span>
                  <span>•</span>
                  <span>{flat.views} views</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={toggleFavorite}
                  className={`btn btn-lg gap-2 ${isFavorite ? 'btn-error' : 'btn-outline'}`}
                >
                  <Heart size={22} fill={isFavorite ? "currentColor" : "none"} />
                  {isFavorite ? 'Saved' : 'Save'}
                </button>

                <button
                  onClick={reportListing}
                  className="btn btn-lg btn-outline btn-error gap-2"
                >
                  <Flag size={22} />
                  Report
                </button>

                <WhatsAppButton
                  variant="solid"
                  size="large"
                  message={`Hello! I'm interested in:\n${flat.title}\n${flat.location}\n₦${flat.price}/month`}
                  showText={true}
                />
              </div>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="stats shadow bg-base-200 rounded-box">
                <div className="stat place-items-center">
                  <div className="stat-title">Rooms</div>
                  <div className="stat-value text-primary">{flat.rooms}</div>
                </div>
              </div>

              <div className="stats shadow bg-base-200 rounded-box">
                <div className="stat place-items-center">
                  <div className="stat-title">Bathrooms</div>
                  <div className="stat-value text-primary">{flat.bathrooms || flat.rooms}</div>
                </div>
              </div>

              <div className="stats shadow bg-base-200 rounded-box">
                <div className="stat place-items-center">
                  <div className="stat-title">Price</div>
                  <div className="stat-value text-primary">
                    ₦{Number(flat.price).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="stats shadow bg-base-200 rounded-box">
                <div className="stat place-items-center">
                  <div className="stat-title">Status</div>
                  <div className="stat-value text-success">Available</div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-6">Amenities & Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {flat.amenities?.map((amenity) => (
                  <div key={amenity} className="badge badge-lg badge-outline gap-2 p-4 text-base-content">
                    {amenity === 'furnished' && <Home size={20} />}
                    {amenity === 'washing-machine' && <WashingMachine size={20} />}
                    {amenity === 'generator' && <Power size={20} />}
                    {amenity === 'solar' && <Sun size={20} />}
                    {amenity === 'inverter' && <Battery size={20} />}
                    {amenity === 'tv' && <Tv size={20} />}
                    {amenity === 'wifi' && <Wifi size={20} />}
                    {amenity === 'parking' && <ParkingSquare size={20} />}
                    <span className="capitalize font-medium">{amenity.replace('-', ' ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-6">Property Description</h3>
              <div className="prose max-w-none text-base-content/90 text-lg leading-relaxed">
                <p className="whitespace-pre-line">{flat.description}</p>
              </div>
            </div>

            {/* Map */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-6">Location on Map</h3>
              <div className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden border border-base-300/30 h-96">
                <MapContainer 
                  center={[flat.lat, flat.lng]} 
                  zoom={15} 
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[flat.lat, flat.lng]}>
                    <Popup>
                      {flat.title}<br />
                      {flat.location}<br />
                      ₦{Number(flat.price).toLocaleString()} / month
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Contact */}
            <div className="card bg-base-200 shadow-xl rounded-2xl">
              <div className="card-body p-8">
                <h3 className="text-3xl font-bold mb-6">Contact Landlord</h3>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-32 h-32">
                      <span className="text-5xl">{flat.landlord.name[0]}</span>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-2xl font-semibold mb-2">{flat.landlord.name}</h4>
                    <p className="text-xl opacity-70 mb-6">Landlord / Agent</p>
                    <WhatsAppButton
                      variant="solid"
                      size="large"
                      message={`Hello ${flat.landlord.name}! I'm interested in your listing:\n${flat.title}\n${flat.location}\n₦${flat.price}/month`}
                      showText={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
