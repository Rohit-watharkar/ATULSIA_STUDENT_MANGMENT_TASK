import { useEffect, useState } from "react";
import { getExams } from "../api/excelTestApi";

export default function CompletedExams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      const data = await getExams();
      setExams(data.completed || []);
    };
    fetchExams();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 max-w-2xl mx-auto">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
        Completed Exams
      </h3>

      {exams.length > 0 ? (
        <ul className="space-y-3">
          {exams.map((exam, i) => (
            <li
              key={i}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 bg-gray-100 p-3 sm:p-4 rounded-lg hover:bg-gray-200 transition"
            >
              <span className="text-gray-700 text-sm sm:text-base font-medium">
                {exam.name}
              </span>
              <button className="w-full sm:w-auto bg-green-600 px-4 py-2 text-white rounded-lg text-sm sm:text-base hover:bg-green-700 transition">
                Open Test
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center sm:text-left">
          No completed exams available.
        </p>
      )}
    </div>
  );
}
