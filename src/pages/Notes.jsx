import { useEffect, useState } from "react";
import { getExams, getNotes } from "../api/excelTestApi"; 
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
        const allTests = [...(data.current || []), ...(data.completed || []), ...(data.practiceNew || []), ...(data.practiceCompleted || [])];
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
    <div className="bg-white shadow-md rounded-xl p-4">
      <h3 className="text-lg font-bold mb-3">Student Notes</h3>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Select Test:</label>
        <select
          className="border rounded p-2 w-full"
          value={selectedTest}
          onChange={(e) => setSelectedTest(e.target.value)}
        >
          <option value="">-- Choose a Test --</option>
          {tests.map((test, i) => (
            <option key={i} value={test.name}>{test.name}</option>
          ))}
        </select>
      </div>

      {loading && <p>Loading notes...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        notes.length > 0 ? (
          <ul className="space-y-2">
            {notes.map((note, i) => (
              <li key={i} className="bg-gray-100 p-3 rounded-lg">{note}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notes available for this test.</p>
        )
      )}
    </div>
  );
}
