import { useEffect, useState } from "react";
import { getExams } from "../api/excelTestApi";

export default function CurrentExams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      const data = await getExams();
      setExams(data.current || []);
    };
    fetchExams();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 max-w-2xl mx-auto">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
        Current Exams
      </h2>

      {exams.length > 0 ? (
        <ul className="space-y-3">
          {exams.map((exam, index) => (
            <li
              key={index}
              className="p-3 sm:p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer transition text-center sm:text-left"
            >
              <span className="text-gray-700 text-sm sm:text-base font-medium">
                {exam.name}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center sm:text-left">
          No current exams available.
        </p>
      )}
    </div>
  );
}
