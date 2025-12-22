import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useParams } from 'react-router-dom';

// Hardcoded demo data (replace with API fetch later)
const demoListing = {
  id: 1,
  title: "Cozy Single Room in Yaba",
  price: 150000,
  location: "Yaba, Lagos",
  description: "Beautiful room in a shared flat. Close to university, market, and bus stop. Includes WiFi and generator.",
  amenities: ["WiFi", "Kitchen", "Generator", "Security"],
  images: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ],
  lat: 6.5244, lng: 3.3792, // Lagos coords
  phone: "08012345678"
};

export default function ListingDetail() {
  const { id } = useParams();
  const listing = demoListing; // In future: fetch by id

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="carousel w-full rounded-box">
            {listing.images.map((img, i) => (
              <div key={i} className="carousel-item w-full">
                <img src={img} className="w-full object-cover h-96" alt={`Image ${i+1}`} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{listing.title}</h1>
          <p className="text-3xl font-bold text-primary mb-4">₦{listing.price.toLocaleString()}/month</p>
          <p className="text-xl mb-6">{listing.location}</p>
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">Description</h3>
            <p>{listing.description}</p>
          </div>
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {listing.amenities.map(a => (
                <span key={a} className="badge badge-primary badge-lg">{a}</span>
              ))}
            </div>
          </div>
          <div className="card bg-base-200 p-6">
            <h3 className="text-xl font-semibold mb-4">Contact Landlord</h3>
            <p className="mb-4">Call or WhatsApp:</p>
            <a href={`tel:${listing.phone}`} className="btn btn-primary btn-lg w-full">{listing.phone}</a>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Location on Map</h3>
        <div className="h-96 rounded-box overflow-hidden">
          <MapContainer center={[listing.lat, listing.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[listing.lat, listing.lng]} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
