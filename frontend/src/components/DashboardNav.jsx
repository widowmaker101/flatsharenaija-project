import { Home, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function DashboardNav() {
  return (
    <nav className="flex gap-6 p-4 bg-gray-100">
      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
        <Link to="/home" className="hover:text-indigo-600 transition">
          <Home size={28} />
        </Link>
      </motion.div>
      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
        <Link to="/profile" className="hover:text-indigo-600 transition">
          <User size={28} />
        </Link>
      </motion.div>
      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
        <Link to="/settings" className="hover:text-indigo-600 transition">
          <Settings size={28} />
        </Link>
      </motion.div>
    </nav>
  );
}
