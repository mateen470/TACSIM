import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainMenu from '../pages/MainMenu';
import PastSimulations from '../pages/PastSimulations';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/past_simulation" element={<PastSimulations />} />
      </Routes>
    </Router>
  );
}
