
import { NavLink } from "react-router-dom";

export default function Sidebar() {
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
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col space-y-4">
      <div className="text-white">
        <h2>Dashboard</h2>
      </div>
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className={({ isActive }) =>
            `p-3 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}
