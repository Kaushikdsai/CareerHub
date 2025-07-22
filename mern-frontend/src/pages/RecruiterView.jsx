import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/RecruiterView.css';
import axios from 'axios';

export const RecruiterView = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const recruiterId = localStorage.getItem('recruiterId');
    axios.get(`http://localhost:5000/api/recruiter/${recruiterId}`)
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Want to add a new job?</h1>
      <a href="/add-new-job"><button>Click here</button></a>

      <h2>Your Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className='job-card'>
            <h3>{job.jobDomain} at {job.organizationName}</h3>
            <p><strong>Applicants:</strong></p>
            {job.applicants && job.applicants.length > 0 ? (
              <ul>
                {job.applicants.map((app, idx) => (
                  <li key={idx}>
                    <p>Name: {app.name}</p>
                    <p>Email: {app.email}</p>
                    <p>Phone: {app.phone}</p>
                    <p>College: {app.collegeName}</p>
                    <p>Year of Graduation: {app.yearOfGraduation}</p>
                    {app.resume && (
                      <a href={`http://localhost:5000/uploads/${app.resume}`} target="_blank" rel="noreferrer">
                        View Resume
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applicants yet.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};
