import React from 'react'; 
import '../styles/navbar.css'; 

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className='navbar-left'>
          <img src="src/assets/logo" className="navbar-logo" />
          <p>CareerBridge</p>
        </div>
        <div className="navbar-right">
          <button className="student-login">Student Login</button>
          <button className="recruiter-login">Recruiter Login</button>
        </div>
        <hr></hr>
      </div>
    </div>
  );
};

export default Navbar