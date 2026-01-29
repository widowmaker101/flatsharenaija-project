import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import IconBar from "./IconBar.jsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout, user } = useAuth();

  useEffect(() => {
    console.log("Navbar rendered — token present?", !!token);
  }, [token]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Find Flats' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-neutral-900 shadow">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-white">
          Flatshare Naija
        </h1>

        <IconBar />

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-medium transition-colors hover:text-blue-600 ${
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {token && (
            <NavLink
              to="/post-flat"
              className={({ isActive }) =>
                `font-medium transition-colors hover:text-blue-600 ${
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-300'
                }`
              }
            >
              Post a Flat
            </NavLink>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <User size={40} />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><span className="justify-between">{user?.email || 'Logged in'}</span></li>
                <li><Link to="/profile">Profile</Link></li>
                <li>
                  <button onClick={handleLogout}>
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </div>

        <button
          className="md:hidden btn btn-ghost btn-circle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden py-4 border-t border-base-300">
          <nav className="flex flex-col gap-4 px-6">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `py-2 px-4 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-gray-300'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            {token && (
              <NavLink
                to="/post-flat"
                className="py-2 px-4 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Post a Flat
              </NavLink>
            )}

            <div className="flex flex-col gap-3 pt-4 border-t border-base-300">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost btn-block"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-outline btn-block"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-primary btn-block"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
}
