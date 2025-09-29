import { useEffect, useState } from "react";
import { getExams } from "../api/excelTestApi";
import { useLocation, useNavigate } from "react-router-dom";

export default function YourExams() {
  const [currentExams, setCurrentExams] = useState([]);
  const [completedExams, setCompletedExams] = useState([]);
  const [activeTab, setActiveTab] = useState("current");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchExams = async () => {
      const data = await getExams();
      setCurrentExams(data.current || []);
      setCompletedExams(data.completed || []);
    };
    fetchExams();
  }, []);

  useEffect(() => {
    if (location.state?.tab) setActiveTab(location.state.tab);
  }, [location.state]);

  const handleOpenTest = (examName, mode) => {
    navigate(`/test/${encodeURIComponent(examName)}`, {
      state: { mode, from: "exams" },
    });
  };

  const ExamList = ({ exams, mode }) => {
    if (!exams.length)
      return <p className="text-gray-500">No exams available.</p>;
    return (
      <ul className="space-y-3">
        {exams.map((exam, i) => (
          <li
            key={i}
            className="flex justify-between items-center bg-gray-300 p-3 rounded-lg hover:bg-gray-200"
          >
            <span>{exam.name}</span>
            <button
              className={`px-3 py-1 text-white rounded hover:opacity-90 ${
                mode === "take"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              onClick={() => handleOpenTest(exam.name, mode)}
            >
              Open Test
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Exams</h2>

    
      <div className="flex border-b mb-4">
        {["current", "completed", "help"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
              activeTab === tab
                ? `border-${
                    tab === "current"
                      ? "blue"
                      : tab === "completed"
                      ? "green"
                      : "gray"
                  }-600 text-${
                    tab === "current"
                      ? "blue"
                      : tab === "completed"
                      ? "green"
                      : "gray"
                  }-600`
                : "border-transparent text-gray-600 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "current" && <ExamList exams={currentExams} mode="take" />}
      {activeTab === "completed" && (
        <ExamList exams={completedExams} mode="view" />
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
    </div>
  );
}
