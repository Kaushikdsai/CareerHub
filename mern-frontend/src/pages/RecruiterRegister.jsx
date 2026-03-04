import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/RecruiterRegister.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const RecruiterRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [logo, setLogo] = useState(null);
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    if (!name) errors.push('Name is required!');
    if (!email) errors.push('Email is required!');
    if (!phoneNumber) errors.push('Phone number is required!');
    if (!companyName) errors.push('Company/Institute name is required!');
    if (!role) errors.push('Designation/Role is required!');
    if (!location) errors.push('Location is required!');
    if (!password) errors.push('Password is required!');
    if (password !== confirmPassword) errors.push('Passwords do not match!');
    if (!agreeTerms) errors.push('You must agree to the Terms and Conditions!');
    setMessages(errors);

    if (errors.length === 0) {
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('companyName', companyName);
        formData.append('role', role);
        formData.append('location', location);
        formData.append('password', password);
        if (logo) {
          formData.append('logo', logo);
        }

        const res = await axios.post(
          'http://localhost:5000/auth/recruiter/register',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        console.log(res.data);
        const { recruiterId } = res.data;
        sessionStorage.setItem('recruiterId', recruiterId);
        navigate('/recruiter-login');
      } catch (err) {
        const msg = err.response?.data?.message || 'Registration failed!';
        setMessages([msg]);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="main">
        <form method="POST" onSubmit={handleSubmit}>
          <h1>RECRUITER REGISTER</h1>
          <div className="details">
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Name</label><br />
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label><br />
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label><br />
              <input id="phoneNumber" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>

            {/* Company Name */}
            <div className="form-group">
              <label htmlFor="companyName">Company/Institute Name</label><br />
              <input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>

            {/* Logo Upload */}
            <div className="form-group">
              <label htmlFor="logo">Upload Organization Logo</label><br />
              <input id="logo" type="file" accept="image/*" onChange={(e) => setLogo(e.target.files[0])} />
            </div>

            {/* Role */}
            <div className="form-group">
              <label htmlFor="role">Designation / Role</label><br />
              <input id="role" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="location">Location</label><br />
              <input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Create a password</label><br />
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm your password</label><br />
              <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>

            {/* Terms */}
            <div className="form-group" id="terms-conditions">
              <label>
                <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                I agree to the Terms and Conditions
              </label>
            </div>

            {/* Messages */}
            {messages.length > 0 && (
              <ul className="msg-li">
                {messages.map((message, index) => (
                  <li key={index} style={{ color: 'red' }}>{message}</li>
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
