import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // await axios.post('/api/auth/login', formData)
      toast.success('Login successful!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4">
      <Toaster />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card bg-base-100 shadow-2xl w-full max-w-md rounded-3xl overflow-hidden border border-base-300/30"
      >
        <div className="card-body p-8 md:p-12">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome Back
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="form-control group">
              <span className="label-text font-medium mb-2 text-lg">Email</span>
              <label className="input input-bordered input-lg flex items-center gap-3">
                <Mail size={20} className="text-primary" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="grow text-base-content placeholder:text-base-content/60 focus:border-primary transition-colors"
                  required
                />
              </label>
            </label>

            <label className="form-control group">
              <span className="label-text font-medium mb-2 text-lg">Password</span>
              <label className="input input-bordered input-lg flex items-center gap-3">
                <Lock size={20} className="text-primary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="grow text-base-content placeholder:text-base-content/60 focus:border-primary transition-colors"
                  required
                />
                <button
                  type="button"
                  className="btn btn-ghost btn-circle btn-sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </label>
            </label>

            <div className="flex justify-between items-center text-sm">
              <label className="label cursor-pointer justify-start gap-2">
                <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                <span className="label-text">Remember me</span>
              </label>
              <Link to="/forgot-password" className="link link-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-full mt-4"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Sign In'}
            </button>
          </form>

          <div className="divider my-8">OR</div>

          <p className="text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="link link-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
