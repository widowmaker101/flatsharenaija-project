import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Find Flats' },
    { to: '/post-flat', label: 'Post a Flat' },
    { to: '/about', label: 'About' },
  ];

  return (
    <header className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Flatshare</span>
            <span className="text-base-content">Naija</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-medium transition-colors hover:text-primary ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-base-content/80'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden btn btn-ghost btn-circle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Auth / CTA buttons - desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-base-300">
            <nav className="flex flex-col gap-4">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `py-2 px-4 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'hover:bg-base-200 text-base-content/80'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="flex flex-col gap-3 pt-4 border-t border-base-300">
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
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
