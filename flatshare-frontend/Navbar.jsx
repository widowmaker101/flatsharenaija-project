import IconBar from "./IconBar.jsx";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-neutral-900 shadow">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-white">
          Flatshare Naija
        </h1>
        {/* Icons on the left */}
        <IconBar />
      </div>
    </nav>
  );

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [darkMode]);
}
