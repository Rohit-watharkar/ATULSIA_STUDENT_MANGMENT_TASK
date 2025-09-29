import { useNavigate } from "react-router-dom";

export default function HelpPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h3 className="text-lg font-bold mb-3">Help & Support</h3>
      <p className="text-gray-600">Need assistance? Visit our Help Center.</p>
      <button
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => navigate("/helpUs")}
      >
        Go to Help
      </button>
    </div>
  );
}
