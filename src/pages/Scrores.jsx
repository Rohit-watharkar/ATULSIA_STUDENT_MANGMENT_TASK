import { useEffect, useState } from "react";
import { getScores } from "../api/excelTestApi";
import { useNavigate } from "react-router-dom";

export default function Scores() {
  const [scores, setScores] = useState({ highest: 0, last3: [], all: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchScores() {
      try {
        setLoading(true);
        const data = await getScores();
        setScores(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load scores");
      } finally {
        setLoading(false);
      }
    }
    fetchScores();
  }, []);

  const handleViewAll = () => {
    navigate("/scores/all");
  };

  if (loading) return <p className="text-center py-6">Loading scores...</p>;
  if (error) return <p className="text-red-600 text-center py-6">{error}</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 max-w-md mx-auto">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
        Test Scores
      </h3>

      <p className="mb-3 text-gray-700 text-sm sm:text-base">
        <strong>Highest Score:</strong> {scores.highest}
      </p>

      <h4 className="font-semibold mt-2 mb-2 text-gray-800 text-sm sm:text-base">
        Last 3 Scores
      </h4>
      <ul className="list-disc pl-5 mb-4 text-gray-700 text-sm sm:text-base">
        {scores.last3.map((s, i) => (
          <li key={i}>
            {s.exam} - {s.score}
          </li>
        ))}
      </ul>

      <button
        onClick={handleViewAll}
        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        View All Scores
      </button>
    </div>
  );
}
