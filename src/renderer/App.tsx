import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainMenu from '../pages/MainMenu';
import PastSimulations from '../pages/PastSimulations';
import Tutorials from '../pages/Tutorials';
import SelectStudentAndInstructor from '../pages/SelectStudentAndInstructor';
import AddBatchUsers from '../pages/AddBatchUsers';
import Settings from '../pages/Settings';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/past_simulation" element={<PastSimulations />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/add_user" element={<SelectStudentAndInstructor />} />
        <Route path="/add_batch_user" element={<AddBatchUsers />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
