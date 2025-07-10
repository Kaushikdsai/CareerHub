import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Hero } from '../components/Hero';
import Navbar from '../components/Navbar';
import { JobFilter } from '../components/JobFilter';
import '../styles/StudentView.css';

export const StudentView = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/jobs');
        setJobs(res.data);
      } catch (err) {
        console.error('Error loading jobs!', err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <JobFilter />
      <button className="filters-btn">Apply Filters</button>

      <div className="job-list-container">
        <h2>Jobs posted by Recruiters</h2>
        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <ul className="job-list">
            {jobs.map((job) => (
              <li key={job._id} className="job-card">
                <h3>{job.jobDomain}</h3>
                <p><strong>Department:</strong> {job.department}</p>
                <p><strong>Type:</strong> {job.jobType}</p>
                <p><strong>Location:</strong> {job.workLocation}</p>
                <p><strong>Duration:</strong> {job.jobDuration}</p>
                <p><strong>Stipend:</strong> {job.stipend}</p>
                <button className="apply-btn">Apply</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
