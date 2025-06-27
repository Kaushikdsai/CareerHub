import React from 'react'; 

import '../styles/navbar.css'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className='navbar-left'>
          <img src="src/assets/logo" className="navbar-logo" />
          <p className='site-title'>CareerBridge</p>
        </div>
        <div className="navbar-right">
          <Link to="/student-login">
            <button className="student-login">Student Login</button>
          </Link>
          <Link to="/recruiter-login">
            <button className="recruiter-login">Recruiter Login</button>
          </Link>
        </div>
        <hr></hr>
      </div>
    </div>
  );
};

export default Navbar