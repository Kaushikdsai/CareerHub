import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/StudentLogin.css';
import { Link } from 'react-router-dom';
import axios from "../utils/axiosConfig.js";

export const StudentLogin = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [messages,setMessages]=useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password){
        setMessages(['Email and password are required!']);
        return;
    }
    try{
        const response=await axios.post('/auth/student/login', {
            email,password
        });
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('role',response.data.role);
        localStorage.setItem('userId',response.data.studentId);
        setMessages([response.data.message]);
    }
    catch(err){
      setMessages([err.response?.data?.message || 'Login failed']);
    }
  }

  return (
    <>
      <Navbar />
      <div className="main">
        <form method="POST" onSubmit={handleSubmit}>
          <h1>STUDENT LOGIN</h1>
          <div className="details">
            <div className="email-details">
              <label htmlFor="email">Email</label>
              <br />
              <input
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password-details">
              <label htmlFor="password">Password</label>
              <br />
              <input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {messages.length > 0 && (
              <ul className="msg-li">
                {messages.map((message, index) => (
                  <li key={index} style={{ color: 'red' }}>
                    {message}
                  </li>
                ))}
              </ul>
            )}
            <a href="forgot-password" className="a1">Forgot Password?</a>
            <br />
            <button className="login-btn" type="submit">
              Login
            </button>
            <p className="no-account">
              Don't have an Account?{' '}
              <Link to="/student-register" className="a1">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
