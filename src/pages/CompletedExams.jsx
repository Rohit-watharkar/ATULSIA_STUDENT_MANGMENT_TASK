import { useEffect, useState } from "react";
import { getExams } from "../api/excelTestApi";

export default function CompletedExams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      const data = await getExams();
      setExams(data.completed);
    };
    fetchExams();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h3 className="text-lg font-bold mb-3">Completed Exams</h3>
      <ul className="space-y-3">
        {exams.map((exam, i) => (
          <li
            key={i}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg hover:bg-gray-200"
          >
            <span>{exam.name}</span>
            <button className="bg-green-600 px-3 py-1 text-white rounded hover:bg-green-700">
              Open Test
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
