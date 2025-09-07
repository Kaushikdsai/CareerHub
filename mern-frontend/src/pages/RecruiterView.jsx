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
        const recruiterId=sessionStorage.getItem('recruiterId');
        axios
          .get(`http://localhost:5000/api/recruiter/${recruiterId}`)
          .then((res) => setJobs(res.data))
          .catch((err) => console.error(err));
    },[]);

    const handleCloseJob = () => {
      const recruiterId=sessionStorage.getItem('recruiterId');
      const url=selectedJob.status === 'closed'
          ? `http://localhost:5000/api/jobs/${selectedJob._id}/open`
          : `http://localhost:5000/api/jobs/${selectedJob._id}/close`;

      axios.patch(url, {
          assessmentLink:
            sendAssessment && assessmentLink.trim()
              ? assessmentLink.trim()
              : null,
          deadline: sendAssessment ? deadline : null,
        })
        .then(() => axios.get(`http://localhost:5000/api/recruiter/${recruiterId}`))
        .then((res) => {
          setJobs(res.data);
          setModalType(null);
          setSelectedJob(null);
          setAssessmentLink('');
          setSendAssessment(null);
        })
        .catch((err) => console.error(err));
    };

    return (
        <div>
            <Navbar />
            <h1 className='new-job'>Want to add a new job?</h1>
            <br />
            <br />
            <a href="/add-new-job"><button className='add-new-job'>POST</button></a>
            <br />
            <br />
            <h2 className='posted-jobs'>Your Posted Jobs</h2>
            <br />
            <br />
            {jobs.length===0 ? (
                <p>No jobs posted yet.</p>
            ) : (
                jobs.map((job) => (
                    <div key={job._id} className="job-card">
                        <h3>
                          {job.jobDomain} at {job.organizationName}
                        </h3>
                        <p>
                          <strong>Status: </strong>
                          {job.status || 'open'}
                        </p>
                        <p>
                          <strong>Number of Applicants: </strong>
                          {job.applicants.length}
                        </p>
                        <button
                          className="close-job"
                          onClick={() => {
                            setSelectedJob(job);
                            setModalType(job._id); 
                          }}
                        >
                          {job.status === 'closed'
                            ? 'Reopen Applications'
                            : 'Close Applications'}
                        </button>

                        {modalType === job._id && job.status !== 'closed' && (
                          <div className="assessment-section">
                            <p>
                              You have received {job.applicants?.length || 0} applications.
                            </p>
                            {sendAssessment === null ? (
                              <>
                                <p>Do you want to send an assessment link to applicants?</p>
                                <button onClick={() => setSendAssessment(true)}>Yes</button>
                                <button onClick={() => setSendAssessment(false)}>No</button>
                              </>
                            ) : sendAssessment ? (
                              <>
                                <input
                                  type="text"
                                  placeholder="Enter assessment link"
                                  value={assessmentLink}
                                  onChange={(e) => setAssessmentLink(e.target.value)}
                                />
                                <input
                                  type="date"
                                  value={deadline}
                                  onChange={(e) => setDeadLine(e.target.value)}
                                />
                              </>
                            ) : (
                              <p>No assessment link will be sent.</p>
                            )}

                            <button
                              onClick={handleCloseJob}
                              disabled={sendAssessment && !assessmentLink.trim()}
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => {
                                setModalType(null);
                                setSelectedJob(null);
                                setAssessmentLink('');
                                setSendAssessment(null);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        )}

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
                                  <a
                                    href={app.resumeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    View Resume
                                  </a>
                                )}
                                <br />
                                <button
                                  className="interview"
                                  onClick={() => {
                                    setModalType('invite');
                                    setSelectedApplicant(app);
                                    setSelectedJob(job);
                                  }}
                                >
                                  Invite for interview
                                </button>
                                <button
                                  className="reject"
                                  onClick={() => {
                                    setModalType('reject');
                                    setSelectedApplicant(app);
                                    setSelectedJob(job);
                                  }}
                                >
                                  Reject
                                </button>
                                <br />
                                <br />
                                {selectedApplicant?._id === app._id &&
                                  selectedJob?._id === job._id &&
                                  modalType &&
                                  (modalType === 'invite' || modalType === 'reject') && (
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
      </div>
    );
};
