import RippleButton from './RippleButton'

export default function Hero({ searchQuery, setSearchQuery }) {
  return (
    <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-gray-800 dark:via-gray-900 dark:to-black text-white h-[60vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 animate-pulse"></div>
      <h1 className="text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg animate-fadeIn">
        Find Your Perfect Flatshare
      </h1>
      <p className="text-lg mb-6 max-w-xl opacity-90 animate-fadeIn delay-200">
        Search thousands of listings and connect with people looking to share a home.
      </p>
      <div className="flex w-full max-w-lg shadow-lg rounded-md overflow-hidden animate-fadeIn delay-300">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search by city or neighborhood..."
          className="flex-grow px-4 py-3 text-gray-900 focus:outline-none transition-all duration-500 focus:ring-4 focus:ring-yellow-400 focus:scale-105"
        />
        <RippleButton className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">
          Search
        </RippleButton>
      </div>
    </section>
  )
}
