import { Link } from 'react-router-dom';

const placeholderListings = [
  {
    id: 1,
    title: "Cozy Single Room in Yaba",
    price: 150000,
    location: "Yaba, Lagos",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
  },
  {
    id: 2,
    title: "Modern Shared Flat in Ikeja",
    price: 250000,
    location: "Ikeja, Lagos",
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
  },
  {
    id: 3,
    title: "Spacious Room in Surulere",
    price: 180000,
    location: "Surulere, Lagos",
    images: ["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
  },
  {
    id: 4,
    title: "Affordable Room in Abuja",
    price: 300000,
    location: "Wuse, Abuja",
    images: ["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
  },
];

export default function Home() {
  const listings = placeholderListings;

  return (
    <>
      <section className="hero min-h-screen" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold">Find Your Perfect Flat in Nigeria</h1>
            <p className="mb-8 text-xl">Affordable rooms & verified roommates in Lagos, Abuja, Port Harcourt and more.</p>
            <div className="join w-full max-w-md mx-auto">
              <input type="text" placeholder="Location e.g. Lagos, Yaba" className="input input-bordered join-item w-full" />
              <input type="number" placeholder="Max Budget (₦)" className="input input-bordered join-item w-40" />
              <button className="btn btn-primary join-item">Search Flats</button>
            </div>
            <div className="mt-8">
              <Link to="/post" className="btn btn-secondary btn-lg">Post a Flat for Free</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Available Flats</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing: any) => (
              <div key={listing.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                <figure>
                  <img src={listing.images[0]} alt={listing.title} className="h-64 object-cover w-full" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{listing.title}</h3>
                  <p className="text-lg font-semibold text-primary">₦{listing.price.toLocaleString()}/month</p>
                  <p className="text-base-content/70">{listing.location}</p>
                  <div className="card-actions justify-end mt-4">
                    <Link to={`/listing/${listing.id}`} className="btn btn-primary">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg mb-4">Have a room to rent? Reach thousands of seekers!</p>
            <Link to="/post" className="btn btn-primary btn-lg">Post Your Listing Now</Link>
          </div>
        </div>
      </section>
    </>
  );
}
