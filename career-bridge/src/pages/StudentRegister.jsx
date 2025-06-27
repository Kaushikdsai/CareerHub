import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/StudentRegister.css';

export const StudentRegister = () => {
  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [confirmPassword, setConfirmPassword]=useState('');
  const [messages, setMessages]=useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = [];
    if(!name) errors.push('Name is required!');
    if(!email) errors.push('Email is required!');
    if(!password) errors.push('Password is required!');
    if(password !== confirmPassword) errors.push('Passwords do not match!');
    setMessages(errors);

    if(errors.length===0){
        setMessages(['Registration Successful!']);
    }
  };

  return (
    <>
        <Navbar />
        <div className="main">
            <form method="POST" onSubmit={handleSubmit}>
            <h1>STUDENT REGISTER</h1>
            <div className="details">
                <div className="form-group">
                <label htmlFor="name">Name</label>
                <br />
                <input
                    id="name"
                    name="name"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
                <div className="form-group">
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
                <div className="form-group">
                <label htmlFor="password1">Create a password</label>
                <br />
                <input
                    id="password1"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <div className="form-group">
                <label htmlFor="password2">Confirm your password</label>
                <br />
                <input
                    id="password2"
                    name="confirm_password"
                    placeholder="Confirm your password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                <button className="register-btn" type="submit">
                Register
                </button>
            </div>
            </form>
        </div>
    </>
  );
};
