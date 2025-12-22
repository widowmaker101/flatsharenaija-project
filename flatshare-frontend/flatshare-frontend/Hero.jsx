export default function Hero() {
  return (
    <section className="bg-blue-600 text-white h-[60vh] flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4">Find Your Perfect Flatshare</h1>
      <p className="text-lg mb-6 max-w-xl">
        Search thousands of listings and connect with people looking to share a home.
      </p>
      <div className="flex w-full max-w-md">
        <input
          type="text"
          placeholder="Search by city or neighborhood..."
          className="flex-grow px-4 py-2 rounded-l-md text-gray-900 focus:outline-none"
        />
        <button className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-r-md font-semibold hover:bg-yellow-500">
          Search
        </button>
      </div>
    </section>
  )
}
