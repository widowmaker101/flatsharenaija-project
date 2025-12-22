import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import FlatSearch from "./components/FlatSearch.jsx";
import FlatDetails from "./components/FlatDetails.jsx";
import FlatForm from "./components/FlatForm.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Profile from "./components/Profile.jsx";
import Settings from "./components/Settings.jsx";
import Navbar from "./components/Navbar.jsx";

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
<main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
  {children}
</main>      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-600">
        <div className="rounded-2xl border border-white/20 bg-white/10 dark:bg-neutral-800 p-4">
          Built for Naija. Find your next flat fast.
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flats" element={<FlatSearch />} />
          <Route path="/flats/:id" element={<FlatDetails />} />
          <Route path="/flats/new" element={<FlatForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Shell>
    </Router>
  );
}
