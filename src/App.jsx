import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout";
import YourExams from "./pages/YourExams";
import Test from "./components/Test";
import ProfileCard from "./pages/ProfileCard";
import PracticeExams from "./pages/PracticeExams";
import Notes from "./pages/Notes";
import Statistics from "./pages/Statistics";
import Scores from "./pages/Scrores";
import AllScores from "./components/AllScores";
import Help from "./components/Help";
import HelpPage from "./pages/HelpPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<ProfileCard />} />
          <Route path="exams" element={<YourExams />} />
          <Route path="/test/:examName" element={<Test />} />
          <Route path="practice" element={<PracticeExams />} />
          <Route path="notes" element={<Notes />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="scores" element={<Scores />} />
          <Route path="/scores/all" element={<AllScores />} />
          <Route path="helpUs" element={<Help />} />
          <Route path="/help" element={<HelpPage />} />

        </Route>
      </Routes>
  );
}

export default App;
