import { useEffect, useState } from "react";
import { getExams } from "../api/excelTestApi";
import { useNavigate } from "react-router-dom";

export default function PracticeExams() {
  const [newTests, setNewTests] = useState([]);
  const [completedTests, setCompletedTests] = useState([]);
  const [activeTab, setActiveTab] = useState("new");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewTest, setPreviewTest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPracticeExams() {
      try {
        setLoading(true);
        const data = await getExams();
        setNewTests(data.practiceNew || []);
        setCompletedTests(data.practiceCompleted || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load practice exams");
      } finally {
        setLoading(false);
      }
    }
    fetchPracticeExams();
  }, []);

  const handleFullTest = (testName) => {
    navigate(`/test/${encodeURIComponent(testName)}`, {
      state: { mode: "take", from: "practice" },
    });
  };

  const handlePreview = (testName) => {
    setPreviewTest(testName);
  };

  const handleContinuePreview = () => {
    if (previewTest) {
      handleFullTest(previewTest.replace(" - Preview", " - Full Test"));
      setPreviewTest(null);
    }
  };

  const handleCancelPreview = () => setPreviewTest(null);

  if (loading) return <p>Loading practice exams...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Practice Exams</h2>

     
      <div className="flex border-b mb-4 space-x-2">
        {["new", "completed", "help"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

     
      {activeTab === "new" && (
        <ul className="space-y-2 bg-white shadow-md rounded-xl p-4">
          {newTests.map((test, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg hover:bg-gray-200"
            >
              <span>{test.name}</span>
              <div className="flex gap-2">
                <button
                  className="bg-purple-600 px-3 py-1 text-white rounded hover:bg-purple-700"
                  onClick={() => handlePreview(`${test.name} - Preview`)}
                >
                  Test Preview
                </button>
                <button
                  className="bg-blue-600 px-3 py-1 text-white rounded hover:bg-blue-700"
                  onClick={() => handleFullTest(`${test.name} - Full Test`)}
                >
                  Full-length Test
                </button>
              </div>
            </li>
          ))}
          {newTests.length === 0 && (
            <p className="text-gray-500">No new practice tests available.</p>
          )}
        </ul>
      )}

      
      {activeTab === "completed" && (
        <ul className="space-y-2 bg-white shadow-md rounded-xl p-4">
          {completedTests.map((test, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg hover:bg-gray-200"
            >
              <span>{test.name}</span>
              <button
                className="bg-green-600 px-3 py-1 text-white rounded hover:bg-green-700"
                onClick={() => handleFullTest(test.name)}
              >
                Open Test
              </button>
            </li>
          ))}
          {completedTests.length === 0 && (
            <p className="text-gray-500">No completed practice tests.</p>
          )}
        </ul>
      )}

      
      {activeTab === "help" && (
        <div className="space-y-2">
          <div className="bg-white shadow-md rounded-xl p-4 text-gray-600">
            <p>
              Don’t see your test here? Please contact your instructor or check
              your schedule to ensure the exam is assigned to you.
            </p>
          </div>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => navigate("/helpUs")}
          >
            Go to Help
          </button>
        </div>
      )}

     
      {previewTest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-md w-full">
            <h3 className="text-xl font-bold mb-2">Test Preview</h3>
            <p className="mb-4">
              You are viewing a preview of <strong>{previewTest}</strong>. Do
              you want to continue to the full test?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleContinuePreview}
              >
                Continue
              </button>
              <button
                className="px-4 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={handleCancelPreview}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
