import Navbar from "./components/Navbar";
import Listings from "./components/Listings";

export default function App() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold p-6">Available Listings</h1>
        <Listings />
      </div>
    </div>
  )
}
