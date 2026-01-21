import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaTachometerAlt } from "react-icons/fa";

const linkClasses = ({ isActive }) =>
  `p-3 rounded-lg transition ${
    isActive
      ? "bg-blue-100 text-blue-700 dark:bg-neutral-800 dark:text-white"
      : "text-blue-600 dark:text-white hover:text-blue-800"
  }`;

export default function IconBar() {
  return (
    <div className="flex gap-6 items-center">
      <NavLink to="/" aria-label="Home" className={linkClasses}>
        <FaHome size={28} />
      </NavLink>
      <NavLink to="/profile" aria-label="Profile" className={linkClasses}>
        <FaUser size={28} />
      </NavLink>
      <NavLink to="/settings" aria-label="Settings" className={linkClasses}>
        <FaCog size={28} />
      </NavLink>
      <NavLink to="/dashboard" aria-label="Dashboard" className={linkClasses}>
        <FaTachometerAlt size={28} />
      </NavLink>
    </div>
  );
}
