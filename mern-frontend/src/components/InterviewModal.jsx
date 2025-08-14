import React, { useState } from "react";
import axios from "axios";
import '../styles/InterviewModal.css';

const InterviewModal = ({ applicant,job,onClose }) => {
    const [date,setDate]=useState('');
    const [time,setTime]=useState('');
    const [mode,setMode]=useState('');
    const [link,setLink]=useState('');
    const [location,setLocation]=useState('');

    const handleSendInvite = () => {
        const data={
            applicantEmail: applicant.email,
            applicantName: applicant.name,
            jobTitle: job.jobDomain,
            organizationName: job.organizationName,
            jobPackage: job.package,
            date,
            time,
            mode,
            link: mode==='online'? link : '',
            location: mode==='offline'? location : '',
        }

        axios.post('http://localhost:5000/api/send-interview-invite', data)
             .then(() => {
                alert('Interview invite sent successfully!');
                onClose();
             })
             .catch(err => console.error(err));
    };

    return (
        <div className="modal">
            <h2>Schedule interview for {applicant.name}</h2>
            <label>Date:</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}></input>
            <br></br>
            <label>Time:</label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)}></input>
            <br></br>
            <label>Mode:</label>
            <select value={mode} onChange={e => {
                setMode(e.target.value);
                if(e.target.value==='online'){
                    setLocation('');
                }
                else{
                    setLink('');
                }
            }}>
                <option value="" disabled>Select option</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
            </select>
            <br></br>
            {mode && (mode==='online'? (
                <>
                    <label>Meeting link: </label>
                    <input type="text" value={link} onChange={e => setLink(e.target.value)}></input>
                </>
            ) : (
                <>
                    <label>Location:</label>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)}></input>
                </>
            ))}
            <br></br>
            <button onClick={handleSendInvite} className="invite">Send Invite</button>
            <button onClick={onClose} className="cancel">Cancel</button>
        </div>
    );
};

export default InterviewModal;