import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { StudentLogin } from './pages/StudentLogin';
import { RecruiterLogin } from './pages/RecruiterLogin';
import { StudentRegister } from './pages/StudentRegister';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
      </Routes>
    </div>
  );
}

export default App;
