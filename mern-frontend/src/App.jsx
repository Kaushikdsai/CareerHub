import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { StudentLogin } from './pages/StudentLogin';
import { RecruiterLogin } from './pages/RecruiterLogin';
import { StudentRegister } from './pages/StudentRegister';
import { StudentView } from './pages/StudentView';
import { RecruiterView } from './pages/RecruiterView';
import { NewJob } from './components/NewJob';
import { RecruiterRegister } from './pages/RecruiterRegister';
import { JobDetails } from './pages/JobDetails';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/student-view" element={<StudentView />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/recruiter-register" element={<RecruiterRegister />} />
        <Route path='/recruiter-view' element={<RecruiterView/>} />
        <Route path='/add-new-job' element={<NewJob />}></Route>
      </Routes>
    </div>
  );
}

export default App;
