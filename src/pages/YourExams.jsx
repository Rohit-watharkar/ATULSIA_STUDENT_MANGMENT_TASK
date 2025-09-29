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
      return (
        <p className="text-gray-500 py-4 text-center">No exams available.</p>
      );
    return (
      <ul className="space-y-3">
        {exams.map((exam, i) => (
          <li
            key={i}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition"
          >
            <span className="mb-2 sm:mb-0">{exam.name}</span>
            <button
              className={`px-4 py-2 rounded text-white text-sm sm:text-base hover:opacity-90 transition ${
                mode === "take"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              onClick={() => handleOpenTest(exam.name, mode)}
            >
              {mode === "take" ? "Start Test" : "View Test"}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const tabs = [
    { id: "current", label: "Current", color: "blue" },
    { id: "completed", label: "Completed", color: "green" },
    { id: "help", label: "Help", color: "gray" },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">
        Your Exams
      </h2>

      <div className="flex flex-wrap border-b mb-4 space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
              activeTab === tab.id
                ? `border-${tab.color}-600 text-${tab.color}-600`
                : "border-transparent text-gray-600 hover:text-gray-700"
            } transition`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
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
            <p className="text-sm sm:text-base">
              Don’t see your test here? Please contact your instructor or check
              your schedule to ensure the exam is assigned to you.
            </p>
          </div>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full sm:w-auto"
            onClick={() => navigate("/helpUs")}
          >
            Go to Help
          </button>
        </div>
      )}
    </div>
  );
}
