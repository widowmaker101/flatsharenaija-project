import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const steps = [
  {
    title: "Welcome to Flatshare",
    description: "Find your perfect shared home with ease.",
    color: "from-blue-600 via-indigo-600 to-purple-600"
  },
  {
    title: "Search Listings",
    description: "Use our powerful search to filter by city or neighborhood.",
    color: "from-green-500 via-teal-500 to-cyan-500"
  },
  {
    title: "Connect with Roommates",
    description: "Chat and connect with people who share your lifestyle.",
    color: "from-pink-500 via-red-500 to-orange-500"
  },
  {
    title: "Set Up Your Profile",
    description: "Tell us a bit about yourself to personalize your experience.",
    color: "from-indigo-500 via-purple-500 to-pink-500",
    form: true
  }
]

export default function Onboarding({ onFinish }) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [preferences, setPreferences] = useState("")

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      localStorage.setItem("onboardingComplete", "true")
      localStorage.setItem("userProfile", JSON.stringify({ name, city, preferences }))
      onFinish()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key={step}
        className={`fixed inset-0 flex flex-col items-center justify-center text-center bg-gradient-to-r ${steps[step].color} text-white z-50`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl font-extrabold mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {steps[step].title}
        </motion.h1>
        <motion.p
          className="text-lg mb-8 max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {steps[step].description}
        </motion.p>

        {steps[step].form ? (
          <div className="flex flex-col gap-4 w-full max-w-md text-gray-900">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2 rounded-md focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-4 py-2 rounded-md focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              placeholder="Preferences (e.g. quiet, social, pet-friendly)"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              className="px-4 py-2 rounded-md focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        ) : null}

        <motion.button
          onClick={nextStep}
          className="mt-6 px-6 py-3 bg-yellow-400 text-gray-900 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          {step < steps.length - 1 ? "Next ➡️" : "Finish 🚀"}
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}
