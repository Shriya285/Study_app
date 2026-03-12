import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Assignment from './pages/Assignment.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Lesson from './pages/Lesson.jsx';
import Progress from './pages/Progress.jsx';
import WeeklyChallenge from './pages/WeeklyChallenge.jsx';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-wrap">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lesson" element={<Lesson />} />
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/weekly-challenge" element={<WeeklyChallenge />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
