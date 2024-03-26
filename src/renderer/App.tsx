import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainMenu from '../pages/MainMenu';
import PastSimulations from '../pages/PastSimulations';
import Tutorials from '../pages/Tutorials';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/past_simulation" element={<PastSimulations />} />
        <Route path="/tutorials" element={<Tutorials />} />
      </Routes>
    </Router>
  );
}
