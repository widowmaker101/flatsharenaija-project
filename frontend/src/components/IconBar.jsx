import { Link } from 'react-router-dom';
import { Home, User, Settings, BarChart2 } from 'lucide-react';  // Assuming lucide icons
import { useAuth } from '../context/AuthContext.jsx';

export default function IconBar() {
  const { token } = useAuth();

  return (
    <div className="flex items-center gap-4">
      {/* House icon - always visible */}
      <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
        <Home size={24} />
      </Link>

      {/* Conditional icons - only show when logged in */}
      {token && (
        <>
          {/* Human figure (profile) */}
          <Link to="/profile" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
            <User size={24} />
          </Link>

          {/* Wheel (settings) */}
          <Link to="/settings" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
            <Settings size={24} />
          </Link>

          {/* Meter (dashboard) */}
          <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
            <BarChart2 size={24} />
          </Link>
        </>
      )}
    </div>
  );
}
