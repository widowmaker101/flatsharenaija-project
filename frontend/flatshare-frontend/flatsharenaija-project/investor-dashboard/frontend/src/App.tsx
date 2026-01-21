import { useListings } from './hooks/useListings';
import { SearchForm } from './components/SearchForm';
import { Map } from './components/Map';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginForm } from './components/LoginForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function ListingsPage() {
  const { data: listings, isLoading } = useListings();

  if (isLoading) return <p>Loading listings...</p>;

  return (
    <div>
      <h2>Available Listings</h2>
      <SearchForm onSearch={(data) => console.log('Search data:', data)} />
      <ul>
        {listings?.map((listing) => (
          <li key={listing.id}>
            <h3>{listing.title}</h3>
            <p>{listing.location} — ₦{listing.price}</p>
            <Map lat={9.05785} lng={7.49508} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function LoginPage() {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/listings"
          element={
            <ProtectedRoute>
              <ListingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
