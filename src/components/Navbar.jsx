export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
      {/* Brand Logo / Name */}
      <div className="text-lg sm:text-xl font-bold text-gray-800">
        Atulsia..
      </div>

      {/* Right side: Welcome + Logout */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <span className="text-gray-700 text-sm sm:text-base">
          Welcome, Rohit
        </span>
        <button className="bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </nav>
  );
}
