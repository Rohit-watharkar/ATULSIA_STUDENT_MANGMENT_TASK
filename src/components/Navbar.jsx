
export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Atulsia.. </div>
      <div className="flex gap-4 items-center">
        <span>Welcome, Rohit</span>
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </nav>
  );
}
