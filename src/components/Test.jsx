import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Test() {
  const { examName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("take");
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const fromPage = location.state?.from || "exams";

  const examQuestions = {
    "SAT Mock Test 1": [
      {
        id: 1,
        question: "Which number is a prime number?",
        options: ["4", "6", "7", "9"],
        answer: "7",
      },
      {
        id: 2,
        question: "Select the antonym of 'Difficult'.",
        options: ["Hard", "Easy", "Tough", "Complex"],
        answer: "Easy",
      },
      {
        id: 3,
        question: "If x + 5 = 12, what is x?",
        options: ["5", "6", "7", "8"],
        answer: "7",
      },
      {
        id: 4,
        question: "Choose the synonym of 'Brave'.",
        options: ["Cowardly", "Fearless", "Weak", "Timid"],
        answer: "Fearless",
      },
      {
        id: 5,
        question: "What is 15 ÷ 3?",
        options: ["3", "4", "5", "6"],
        answer: "5",
      },
    ],
    "PSAT Practice Test": [
      {
        id: 1,
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Jupiter",
      },
      {
        id: 2,
        question: "Choose the correct spelling.",
        options: ["Occurence", "Occurrence", "Ocurrence", "Occurens"],
        answer: "Occurrence",
      },
      {
        id: 3,
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Shakespeare", "Dickens", "Hemingway", "Twain"],
        answer: "Shakespeare",
      },
      {
        id: 4,
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Gold", "Iron", "Silver"],
        answer: "Oxygen",
      },
      {
        id: 5,
        question: "What is 9 × 8?",
        options: ["72", "64", "81", "69"],
        answer: "72",
      },
    ],
  };

  const questions = examQuestions[examName] || [];

  useEffect(() => {
    if (location.state?.mode) setMode(location.state.mode);
  }, [location.state]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted answers:", answers);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      navigate(fromPage === "practice" ? "/practice" : "/exams", {
        state: { tab: "completed" },
      });
    }, 1000);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto relative">
      <h2 className="text-2xl font-bold mb-4">{examName}</h2>
      <p className="mb-4 text-gray-600">
        {mode === "take"
          ? "Answer the questions and submit your test."
          : "This is a submitted test. You can review the answers."}
      </p>

      <div className="bg-gray-100 p-6 rounded-xl space-y-4">
        {questions.length === 0 && <p>No questions available for this exam.</p>}
        {questions.map((q) => (
          <div key={q.id} className="p-3 bg-white rounded shadow">
            <p className="font-semibold">
              {q.id}. {q.question}
            </p>
            <div className="mt-2 space-y-2">
              {q.options.map((opt, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={opt}
                    disabled={mode === "view"}
                    checked={answers[q.id] === opt}
                    onChange={() => handleAnswerChange(q.id, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
            {mode === "view" && (
              <p className="mt-1 text-green-600">Correct answer: {q.answer}</p>
            )}
          </div>
        ))}
      </div>

      {mode === "take" && questions.length > 0 && (
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Submit Test
        </button>
      )}

      {submitted && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
            <p>You have submitted the test successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
}
