// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import FindFlats from './pages/FindFlats';
import PostFlat from './pages/PostFlat';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About';
import FlatDetail from './pages/FlatDetail';
import NotFound from './components/NotFound';
import { useAuth } from './context/AuthContext.jsx';

function App() {
  const { token } = useAuth();

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-base-200">
        <Navbar key={token || 'logged-out'} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find-flats" element={<FindFlats />} />
            <Route path="/search" element={<FindFlats />} />
            <Route path="/post-flat" element={<PostFlat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/flat/:id" element={<FlatDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
