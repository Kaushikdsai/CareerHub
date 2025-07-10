import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/StudentRegister.css';
import { AddSkills } from '../components/AddSkills';

export const StudentRegister = () => {
  const [name,setName]=useState('');
  const [collegeName,setCollegeName]=useState('');
  const [yearOfGraduation,setYearOfGraduation]=useState('');
  const [location,setLocation]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [messages,setMessages]=useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = [];
    if(!name) errors.push('Name is required!');
    if(!email) errors.push('Email is required!');
    if(!password) errors.push('Password is required!');
    if(password!==confirmPassword) errors.push('Passwords do not match!');
    setMessages(errors);
    if(errors.length===0){
        setMessages(['Registration Successful!']);
    }
  };

  return (
    <>
      <Navbar />
      <div className="sr-main">
        <form method="POST" onSubmit={handleSubmit}>
          <h1>STUDENT REGISTER</h1>
          <div className="details">
            <div className="form-group">
              <label htmlFor="name">Name</label><br />
              <input
                id="name"
                name="name"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label><br />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="college-name">College Name</label><br />
              <input
                id="college-name"
                name="college-name"
                placeholder="Enter your college name"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="year-of-grad">Year of Graduation</label><br />
              <input
                id="year-of-grad"
                name="year-of-grad"
                placeholder="Enter your year of graduation"
                value={yearOfGraduation}
                onChange={(e) => setYearOfGraduation(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label><br />
              <input
                id="location"
                name="location"
                placeholder="Enter your location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <AddSkills />

            <div className="form-group">
              <label htmlFor="resume">Upload your Resume</label><br />
              <input type="file" name="file" accept=".doc,.docx,.pdf" required />
            </div>

            <div className="form-group">
              <label htmlFor="password1">Create a password</label><br />
              <input
                id="password1"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password2">Confirm your password</label><br />
              <input
                id="password2"
                name="confirm_password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {messages.length>0 && (
              <ul className="msg-li">
                {messages.map((msg, idx) => (
                  <li key={idx} style={{ color: msg.includes('Success') ? 'green' : 'red' }}>
                    {msg}
                  </li>
                ))}
              </ul>
            )}

            <button className="register-btn" type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};
