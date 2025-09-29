import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger icons

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Student Profile", path: "/" },
    { name: "Your Exams", path: "/exams" },
    { name: "Practice Exams", path: "/practice" },
    { name: "Notes", path: "/notes" },
    { name: "Statistics", path: "/statistics" },
    { name: "Scores", path: "/scores" },
    { name: "Help", path: "/help" },
  ];

  return (
    <div className="flex">
      {/* Mobile toggle button */}
      <button
        className="sm:hidden p-3 text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed sm:static top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 flex flex-col space-y-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 transition-transform duration-300 z-50`}
      >
        <div className="text-white text-lg font-bold">Dashboard</div>
        <nav className="flex flex-col space-y-2 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)} // close on mobile click
              className={({ isActive }) =>
                `p-3 rounded hover:bg-gray-700 transition ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
