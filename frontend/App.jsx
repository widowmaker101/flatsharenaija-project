// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import FindFlats from './pages/FindFlats';   // ← this must be here
import NotFound from './components/NotFound'; // adjust path if different

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-base-200">
        <Navbar />
        <main className="flex-grow">
console.log("Rendering App - FindFlats component:", FindFlats);
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find-flats" element={<FindFlats />} />   {/* ← this line makes it work */}
            {/* add others when ready */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
