import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.div
      className="p-10 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold mb-4">About Flatshare</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Flatshare helps you connect with people and find the perfect shared living space.
      </p>
    </motion.div>
  )
}
