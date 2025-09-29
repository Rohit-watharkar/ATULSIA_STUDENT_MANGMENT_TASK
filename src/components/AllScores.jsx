import { useEffect, useState } from "react";
import { getScores } from "../api/excelTestApi";

export default function AllScores() {
  const [allScores, setAllScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAllScores() {
      try {
        setLoading(true);
        const data = await getScores();
        setAllScores(data.all || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load test-wise scores");
      } finally {
        setLoading(false);
      }
    }
    fetchAllScores();
  }, []);

  if (loading)
    return <p className="text-center py-4">Loading test-wise scores...</p>;
  if (error) return <p className="text-center text-red-600 py-4">{error}</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
        All Test Scores
      </h3>

      {allScores.length > 0 ? (
        <ul className="space-y-3">
          {allScores.map((s, i) => (
            <li
              key={i}
              className="flex flex-col sm:flex-row justify-between sm:items-center bg-gray-100 p-3 sm:p-4 rounded-lg hover:bg-gray-200 transition"
            >
              <span className="text-sm sm:text-base font-medium text-gray-700">
                {s.exam}
              </span>
              <span className="text-base sm:text-lg font-semibold text-blue-600 mt-1 sm:mt-0">
                {s.score}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center sm:text-left">
          No scores available.
        </p>
      )}
    </div>
  );
}
