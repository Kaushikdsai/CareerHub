import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/RecruiterRegister.css';
import axios from 'axios';

export const RecruiterRegister = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phoneNum,setPhoneNum]=useState('');
    const [company,setCompany]=useState('');
    const [designation,setDesignation]=useState('');
    const [location,setLocation]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [agreeTerms,setAgreeTerms]=useState(false);
    const [messages,setMessages]=useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors=[];
        if(!name) errors.push('Name is required!');
        if(!email) errors.push('Email is required!');
        if(!phoneNum) errors.push('Phone number is required!');
        if(!company) errors.push('Company/Institute name is required!');
        if(!designation) errors.push('Designation/Role is required!');
        if(!location) errors.push('Location is required!');
        if(!password) errors.push('Password is required!');
        if(password !== confirmPassword) errors.push('Passwords do not match!');
        if(!agreeTerms) errors.push('You must agree to the Terms and Conditions!');
        setMessages(errors);
        if(errors.length===0){
            setMessages(['Registration Successful!']);
        }
        try{
            const res=await axios.post('http://localhost:5000/auth/recruiter/register', {
                name,
                email,
                phoneNum,
                company,
                designation,
                location,
                password
            });
            const {recruiterId}=res.data;
            localStorage.setItem('recruiterId',recruiterId);
            setTimeout(() => {
            window.location.href='/new-job'; 
            }, 1500);
        }
        catch(err){
            const msg=err.response?.data?.message || 'Registration failed!';
            setMessages([msg]);
        }
    };
    return (
      <>
        <Navbar />
        <div className="main">
            <form method="POST" onSubmit={handleSubmit}>
            <h1>RECRUITER REGISTER</h1>
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
                <label htmlFor="email">Phone Number</label>
                <br />
                <input
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    type="number"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                />
                </div>
                <div className="form-group">
                    <label htmlFor="company">Company/Institute Name</label><br />
                    <input
                        id="company"
                        name="company"
                        placeholder="Enter your company or institute name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="designation">Designation / Role</label><br />
                    <input
                        id="designation"
                        name="designation"
                        placeholder="e.g. HR, Recruiter, Campus Head"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label><br />
                    <input
                        id="location"
                        name="location"
                        placeholder="Enter your location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
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
                <div className="form-group" id='terms-conditions'>
                    <label>
                    <input
                        className='checkbox-input'
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    I agree to the Terms and Conditions
                    </label>
                </div>
                {messages.length>0 && (
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
