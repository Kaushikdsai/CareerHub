import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/RecruiterView.css';
import InterviewModal from '../components/InterviewModal';
import axios from 'axios';

export const RecruiterView = () => {
  const [jobs,setJobs]=useState([]);
  const [modalType,setModalType]=useState(null);
  const [selectedApplicant,setSelectedApplicant]=useState(null);
  const [selectedJob,setSelectedJob]=useState(null);
  const [assessmentLink,setAssessmentLink]=useState('');
  const [sendAssessment,setSendAssessment]=useState(null);
  const [deadline,setDeadLine]=useState('');

  useEffect(() => {
    const recruiterId=localStorage.getItem('recruiterId');
    axios.get(`http://localhost:5000/api/recruiter/${recruiterId}`)
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleCloseJob = () => {
      const recruiterId=localStorage.getItem('recruiterId');
      const url=selectedJob.status==='closed'
        ?`http://localhost:5000/api/jobs/${selectedJob._id}/open`
        :`http://localhost:5000/api/jobs/${selectedJob._id}/close`;
         axios.patch(url, { 
              assessmentLink: sendAssessment && assessmentLink.trim() ? assessmentLink.trim() : null,
              deadline: sendAssessment?deadline:null
            })

           .then(() => axios.get(`http://localhost:5000/api/recruiter/${recruiterId}`))
           .then(res => {
              setJobs(res.data);
              setModalType(null);
              setSelectedJob(null);
              setAssessmentLink('');
              setSendAssessment(null);
           })
           .catch(err => console.error(err));
  };

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
            <p><strong>Status: </strong>{job.status || 'open'}</p>
            <p><strong>Number of Applicants: </strong>{job.applicants.length}</p>
            <button className='close-job' 
                    onClick={() => {
                        setModalType('close');
                        setSelectedJob(job);
                    }}
            >{job.status==='closed'?'Reopen Applications':'Close Applications'}
            </button>
            {job.applicants && job.applicants.length>0 ? (
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
                        setModalType('invite');
                        setSelectedApplicant(app);
                        setSelectedJob(job);
                    }}>Invite for interview</button>
                    <button className='reject' onClick={() => {
                        setModalType('reject');
                        setSelectedApplicant(app);
                        setSelectedJob(job);  
                    }}>Reject</button>
                    <br></br>
                    <br></br>
                    {selectedApplicant?._id===app._id && selectedJob?._id===job._id && modalType && (
                      <InterviewModal
                        type={modalType}
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

      {modalType==='close' && selectedJob && (
          <div className='modal'>
              <div className='modal-content'>
                  <h3>
                      {selectedJob.status==='closed'?'Reopen Applications':'Close Applications'}
                  </h3>
                  {selectedJob.status!=='closed' && (
                       <>
                        <p>You have recieved {selectedJob.applicants?.length || 0} applications.</p>
                        {sendAssessment===null ? (
                            <>
                              <p>Do you want to send an assessment link to applicants?</p>
                              <button onClick={() => setSendAssessment(true)}>Yes</button>
                              <button onClick={() => setSendAssessment(false)}>No</button>
                            </>
                        ) : sendAssessment? (
                            <>
                              <input type='text' placeholder='Enter assessment link' value={assessmentLink} onChange={(e) => setAssessmentLink(e.target.value)}></input>
                              <input type='date' placeholder='Enter deadline' value={deadline} onChange={(e) => setDeadLine(e.target.value)}></input>
                            </>
                        ) : (
                            <p>No assessment link will be sent.</p>
                        )}
                      </>
                  )}
                  <button onClick={handleCloseJob} disabled={sendAssessment && !assessmentLink.trim()}>
                      Confirm
                  </button>
                  <button onClick={() => {
                      setModalType(null);
                      setSelectedJob(null);
                      setAssessmentLink('');
                      setSendAssessment(null);
                  }}>
                      Cancel
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};
