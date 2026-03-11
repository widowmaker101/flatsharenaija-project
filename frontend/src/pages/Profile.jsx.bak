import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Profile() {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      {user ? (
        <div className="card bg-base-100 shadow-xl p-6">
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add more fields later */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
