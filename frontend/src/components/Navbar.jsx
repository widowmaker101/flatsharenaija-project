import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Home, Search, PlusSquare, User, LogIn, LogOut, Settings } from 'lucide-react';
import { List } from "lucide-react";

import toast from 'react-hot-toast';

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 shadow-lg fixed top-0 z-50 px-4 md:px-8">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
          Flatshare Naija
        </Link>
      </div>

      <div className="flex-none gap-1 md:gap-2">
        {/* Always visible */}
        <Link to="/" className="btn btn-ghost btn-circle tooltip tooltip-bottom" data-tip="Home">
          <Home size={22} />
        </Link>

        <Link to="/find-flats" className="btn btn-ghost btn-circle tooltip tooltip-bottom" data-tip="Find Flats">
          <Search size={22} />
        </Link>

        {/* Logged-in user menu */}
        {token ? (
          <>
            <Link to="/post-flat" className="btn btn-primary btn-circle tooltip tooltip-bottom" data-tip="Post Flat">
              <PlusSquare size={22} />
            </Link>

            <Link to="/my-listings" className="btn btn-ghost btn-circle tooltip tooltip-bottom" data-tip="My Listings">
              <List size={22} />
            </Link>

            <Link to="/profile" className="btn btn-ghost btn-circle tooltip tooltip-bottom" data-tip="Profile">
              <User size={22} />
            </Link>

            <Link to="/settings" className="btn btn-ghost btn-circle tooltip tooltip-bottom" data-tip="Settings">
              <Settings size={22} />
            </Link>

            <button 
              className="btn btn-ghost btn-circle tooltip tooltip-bottom" 
              data-tip="Logout"
              onClick={handleLogout}
            >
              <LogOut size={22} />
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-ghost btn-circle tooltip tooltip-bottom" data-tip="Login">
            <LogIn size={22} />
          </Link>
        )}
      </div>
    </div>
  );
}
