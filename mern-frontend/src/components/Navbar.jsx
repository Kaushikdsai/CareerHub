import React from 'react';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";   

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className='navbar-left'>
          <img alt='logo' src={logo} className="navbar-logo" />  
          <p className='site-title'>CareerHub</p>
        </div>
        <nav className="navbar-right">
            <Link to="/student-login">
              <button className='btn'>Student Login</button>
            </Link>
            <Link to="/recruiter-login">
              <button className='btn'>Recruiter Login</button>
            </Link>
        </nav>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
