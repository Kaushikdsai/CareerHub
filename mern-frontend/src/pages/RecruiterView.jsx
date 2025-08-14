import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/RecruiterView.css';
import InterviewModal from '../components/InterviewModal';
import axios from 'axios';

export const RecruiterView = () => {
  const [jobs,setJobs]=useState([]);
  const [selectedApplicant,setSelectedApplicant]=useState(null);
  const [selectedJob,setSelectedJob]=useState(null);

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
                    {app.resumeUrl && (
                      <a href={app.resumeUrl} target="_blank" rel="noreferrer">
                        View Resume
                      </a>
                    )}
                    <br></br>
                    <button className='interview' onClick={() => {
                        setSelectedApplicant(app);
                        setSelectedJob(job);
                    }}>Invite for interview</button>
                    <button className='reject'>Reject</button>
                    <br></br>
                    <br></br>
                    {selectedApplicant?._id===app._id && selectedJob?._id===job._id && (
                      <InterviewModal
                        applicant={selectedApplicant}
                        job={selectedJob}
                        onClose={() => {
                          setSelectedApplicant(null);
                          setSelectedJob(null);
                        }}
                      />
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
