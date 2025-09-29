export default function Help() {
  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
        Help & Support Center
      </h2>

      <p className="mb-4 text-gray-700 text-center sm:text-left">
        Welcome to the Help Center. Here’s how you can get assistance:
      </p>

      <ul className="space-y-3">
        {[
          "How to take a practice exam",
          "Understanding test scores and reports",
          "Accessing study notes",
          "Technical issues with the platform",
          "Contact support via email: support@example.com",
        ].map((item, i) => (
          <li
            key={i}
            className="p-3 sm:p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
          >
            <span className="text-gray-700 text-sm sm:text-base">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
