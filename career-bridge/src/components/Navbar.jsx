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
        <nav className="navbar-right">
          <Link to="/student-login">
              <button>Student Login</button>
            </Link>
            <Link to="/recruiter-login">
              <button>Recruiter Login</button>
            </Link>
        </nav>
        <hr></hr>
      </div>
    </div>
  );
};

export default Navbar