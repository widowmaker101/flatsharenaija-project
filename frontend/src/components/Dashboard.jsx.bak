import { Link } from "react-router-dom";

export default function Dashboard() {
  const features = [
    { name: "Polls", path: "/polls" },
    { name: "Scheduled Messages", path: "/scheduled" },
    { name: "Drafts", path: "/drafts" },
    { name: "Search", path: "/search" },
    { name: "Translation", path: "/translation" },
    { name: "Reactions", path: "/reactions" },
    { name: "Bookmarks", path: "/bookmarks" },
    { name: "Forwarding", path: "/forwarding" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 px-6 py-10">
      <h1 className="text-4xl font-bold text-blue-700 dark:text-white mb-8">
        Feature Dashboard
      </h1>

      {/* Responsive grid of features */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link
            key={feature.name}
            to={feature.path}
            className="p-6 rounded-xl shadow bg-white dark:bg-neutral-800 hover:shadow-lg transition flex items-center justify-center text-center font-semibold text-gray-700 dark:text-gray-200"
          >
            {feature.name}
          </Link>
        ))}
      </div>

      <footer className="mt-12 text-sm text-gray-500 dark:text-gray-400 text-center">
        Built for Naija. Find your next flat fast.
      </footer>
    </div>
  );
}
