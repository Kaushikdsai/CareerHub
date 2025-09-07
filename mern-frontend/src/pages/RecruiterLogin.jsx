import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

export const RecruiterLogin = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [messages,setMessages]=useState([]);

    const handleSubmit=async (e) => {
        e.preventDefault();
        setMessages([]);
        if(!email || !password){
            setMessages(['Email and password are required!']);
            return;
        }

        try{
            const response=await axios.post('http://localhost:5000/auth/recruiter/login', {
                email,
                password
            });
            
            const { token,recruiterId,role,message }=response.data;
            sessionStorage.setItem('recruiterId', recruiterId);
            localStorage.setItem('role', role);
            sessionStorage.setItem('token',token);
            setMessages([message || 'Login successful!']);
            window.location.href = '/recruiter-view';
        }
        catch(error){
            console.error('Login failed:', error);
            if(error.response && error.response.data && error.response.data.message){
                setMessages([error.response.data.message]);
            }
            else{
                setMessages(['Something went wrong!']);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="main">
                <form method="POST" onSubmit={handleSubmit}>
                    <h1>RECRUITER LOGIN</h1>
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
                        <button className='login-btn' type="submit">Login</button>
                        <p className='no-account'>
                            Don't have an Account? <a href="recruiter-register/" className="a1">Signup</a>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};
