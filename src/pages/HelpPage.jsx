import { useNavigate } from "react-router-dom";

export default function HelpPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 max-w-md mx-auto">
      <h3 className="text-lg sm:text-xl font-bold mb-3 text-center sm:text-left">
        Help & Support
      </h3>
      <p className="text-gray-600 mb-4 text-center sm:text-left">
        Need assistance? Visit our Help Center.
      </p>
      <button
        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg text-sm sm:text-base hover:bg-blue-700 transition"
        onClick={() => navigate("/helpUs")}
      >
        Go to Help
      </button>
    </div>
  );
}
