import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import EducationPage from "./pages/EducationPage";
import WorkPage from "./pages/WorkPage";
import ResearchPage from "./pages/ResearchPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import AchievementsPage from "./pages/AchievementsPage";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Apply theme to both data-theme and class for compatibility
    document.body.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar theme={theme} setTheme={setTheme} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
