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

  if (loading) return <p>Loading test-wise scores...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h3 className="text-lg font-bold mb-3">All Test Scores</h3>

      {allScores.length > 0 ? (
        <ul className="space-y-2">
          {allScores.map((s, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
            >
              <span>{s.exam}</span>
              <span className="font-semibold">{s.score}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No scores available.</p>
      )}
    </div>
  );
}