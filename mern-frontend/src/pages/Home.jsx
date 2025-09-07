import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/Home.css';

export const Home = () => {
  return (
    <div>
      <Navbar />
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to CareerHub</h1>
          <p>A one-stop platform to connect recruiters with talented students.</p>
          <a href="/student-login" className="cta-button">Get Started</a>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-container">
          <div className="feature-card">
            <p>💼Hiring or Offering Internships? Reach students across departments.</p>
            <a href='/recruiter-login'>Click here.</a>
          </div>
          <div className="feature-card">
            <p>🎯Looking for Opportunities? Find jobs, internships & freelance gigs.</p>
            <a href='/student-login'>Click here.</a>
          </div>
          <div className="feature-card">
            <p>🚀Forming a Team? Post your hackathon/project opportunity as a Recruiter.</p>
            <a href='/recruiter-login'>Click here.</a>
          </div>
        </div>
      </section>

    </div>
  );
};
