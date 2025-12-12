import { useState } from 'react'

export default function RippleButton({ children, onClick, className }) {
  const [coords, setCoords] = useState({ x: -1, y: -1 })
  const [isRippling, setIsRippling] = useState(false)

  return (
    <button
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        setIsRippling(true)
        setTimeout(() => setIsRippling(false), 500)
        if (onClick) onClick(e)
      }}
      className={`relative overflow-hidden px-6 py-3 rounded-md font-semibold transition-transform duration-300 hover:scale-105 ${className}`}
    >
      {isRippling && (
        <span
          style={{
            left: coords.x,
            top: coords.y,
          }}
          className="absolute bg-white/50 rounded-full animate-ping w-20 h-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
      )}
      {children}
    </button>
  )
}
