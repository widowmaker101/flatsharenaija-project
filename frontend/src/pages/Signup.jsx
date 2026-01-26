import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { User, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react'

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    phoneCode: '+234',  // Default Nigeria
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Country codes with flags (focus on Nigeria + common ones)
  const countryCodes = [
    { code: '+234', flag: '🇳🇬', label: 'Nigeria (+234)' },
    { code: '+1', flag: '🇺🇸', label: 'USA (+1)' },
    { code: '+44', flag: '🇬🇧', label: 'UK (+44)' },
    { code: '+233', flag: '🇬🇭', label: 'Ghana (+233)' },
    { code: '+27', flag: '🇿🇦', label: 'South Africa (+27)' },
    // Add more if needed
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      // await axios.post('/api/auth/register', {
      //   fullName: formData.fullName,
      //   email: formData.email,
      //   phone: formData.phoneCode + formData.phone,
      //   password: formData.password,
      // })

      toast.success('Account created successfully!')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
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
        className="card bg-base-100 shadow-2xl w-full max-w-lg rounded-3xl overflow-hidden border border-base-300/30"
      >
        <div className="card-body p-8 md:p-12">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Create Your Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="form-control group">
              <span className="label-text font-medium mb-2 text-lg">Full Name</span>
              <label className="input input-bordered input-lg flex items-center gap-3">
                <User size={20} className="text-primary" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="grow text-base-content placeholder:text-base-content/60 focus:border-primary transition-colors"
                  required
                />
              </label>
            </label>

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
              <span className="label-text font-medium mb-2 text-lg">Phone Number</span>
              <div className="flex">
                <select
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleChange}
                  className="select select-bordered select-lg w-32 md:w-40 flex-shrink-0 rounded-r-none focus:border-primary transition-colors"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="7030176297"
                  className="input input-bordered input-lg grow rounded-l-none text-base-content placeholder:text-base-content/60 focus:border-primary transition-colors"
                  required
                />
              </div>
            </label>

            {/* Password fields remain the same */}

            <button
              type="submit"
              className="btn btn-primary btn-lg w-full mt-6"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Create Account'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
