import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import LoadingBar from './components/LoadingBar'
import Onboarding from './components/Onboarding'

function AnimatedRoutes({ searchQuery, setSearchQuery, profile }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} profile={profile} />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard profile={profile} />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const completed = localStorage.getItem("onboardingComplete")
    if (!completed) {
      setShowOnboarding(true)
    } else {
      const savedProfile = localStorage.getItem("userProfile")
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile))
      }
    }
  }, [])

  return (
    <Router>
      {showOnboarding ? (
        <Onboarding onFinish={() => {
          setShowOnboarding(false)
          const savedProfile = localStorage.getItem("userProfile")
          if (savedProfile) {
            setProfile(JSON.parse(savedProfile))
          }
        }} />
      ) : (
        <>
          <Navbar />
          <AnimatedRoutes searchQuery={searchQuery} setSearchQuery={setSearchQuery} profile={profile} />
        </>
      )}
    </Router>
  )
}

// Ask for notification permission when app loads
useEffect(() => {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission()
  }
}, [])
