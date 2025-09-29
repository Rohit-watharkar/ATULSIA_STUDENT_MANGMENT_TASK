import { useEffect, useState } from "react";
import { getExams } from "../api/excelTestApi";

export default function Notes() {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTests() {
      try {
        const data = await getExams();
        const allTests = [
          ...(data.current || []),
          ...(data.completed || []),
          ...(data.practiceNew || []),
          ...(data.practiceCompleted || []),
        ];
        setTests(allTests);
      } catch (err) {
        console.error(err);
        setError("Failed to load tests");
      }
    }
    fetchTests();
  }, []);

  useEffect(() => {
    async function fetchNotesForTest() {
      if (!selectedTest) return;

      try {
        setLoading(true);
        setNotes([
          `Notes for ${selectedTest} - Algebra basics revision`,
          `Notes for ${selectedTest} - Important shortcuts`,
          `Notes for ${selectedTest} - Past year questions`,
        ]);
      } catch (err) {
        console.error(err);
        setError("Failed to load notes");
      } finally {
        setLoading(false);
      }
    }
    fetchNotesForTest();
  }, [selectedTest]);

  return (
    <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 max-w-md mx-auto">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
        Student Notes
      </h3>

    
      <div className="mb-4 w-full">
        <label className="block mb-2 font-semibold text-sm sm:text-base">
          Select Test:
        </label>
        <div className="relative w-full">
          <select
            className="block w-full p-2 sm:p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm sm:text-base"
            value={selectedTest}
            onChange={(e) => setSelectedTest(e.target.value)}
          >
            <option value="">-- Choose a Test --</option>
            {tests.map((test, i) => (
              <option key={i} value={test.name}>
                {test.name}
              </option>
            ))}
          </select>
         
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

     
      {loading && <p className="text-gray-600">Loading notes...</p>}
      {error && <p className="text-red-600">{error}</p>}

     
      {!loading &&
        !error &&
        (notes.length > 0 ? (
          <ul className="space-y-2">
            {notes.map((note, i) => (
              <li
                key={i}
                className="bg-gray-100 p-3 sm:p-4 rounded-lg text-sm sm:text-base break-words"
              >
                {note}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center sm:text-left">
            No notes available for this test.
          </p>
        ))}
    </div>
  );
}
