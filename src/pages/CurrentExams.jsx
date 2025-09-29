import { useEffect, useState } from "react";
import { getExams } from "../api/excelTestApi";

export default function CurrentExams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      const data = await getExams();
      setExams(data.current);
    };
    fetchExams();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Current Exams</h2>
      <ul className="space-y-3">
        {exams.map((exam, index) => (
          <li
            key={index}
            className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer"
          >
            {exam.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
