import React, {useState} from 'react';
import '../styles/NewJob.css';
import axios from 'axios';
import Navbar from '../components/Navbar';

export const NewJob = () => {
    const [messages,setMessages]=useState([]);
    const [jdFile, setJDFile]=useState(null);
    const [formData,setFormData]=useState({
        department: '',
        jobDomain: '',
        jobType: '',
        workLocation: '',
        jobDuration: '',
        stipend: '',
        other: '',
        onsiteLocation: '',
        jdFile: null,
    });
    const handleFileUpload = (e) => {
        setJDFile(e.target.files[0]);
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit=async(e) => {
        e.preventDefault();
        const errors=[];
        if(!formData.department){
            errors.push('Department Field is required!')
        }
        if(!formData.jobDomain){
            errors.push('Job Field is required!')
        }
        if(formData.jobDomain==="other" && !formData.other){
            errors.push('Please enter the job domain for "Other"!')
        }
        if(!formData.jobType){
            errors.push('Job Type Field is required!')
        }
        if(!formData.workLocation){
            errors.push('Work Location Field is required!')
        }
        if(formData.workLocation==="onsite" && !formData.onsiteLocation){
            errors.push('Onsite location field is required!')
        }
        if(!formData.jobDuration){
            errors.push('Job Duration Field is required!')
        }
        if(!formData.stipend){
            errors.push('Stipend Field is required!')
        }
        if(errors.length>0){
            setMessages(errors);
            return;
        }
        const actualJob=formData.jobDomain==="other"?formData.other : formData.jobDomain;
        const recruiterId=localStorage.getItem('recruiterId');
        if(!recruiterId){
            alert("Recruiter not logged in!");
            return;
        }
        const token = localStorage.getItem('token'); 
        try{
            const data=new FormData();
            data.append("department",formData.department);
            data.append("jobDomain",actualJob);
            data.append("jobType",formData.jobType);
            data.append("workLocation",formData.workLocation);
            data.append("jobDuration",formData.jobDuration);
            data.append("stipend",formData.stipend);
            data.append("onsiteLocation",formData.onsiteLocation);
            data.append("recruiterId",recruiterId);
            data.append("jdFile",jdFile);
            await axios.post('http://localhost:5000/postJob/recruiter/newjob', data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Job posted successfully!');
            setFormData({
                department: '',
                jobDomain: '',
                jobType: '',
                workLocation: '',
                jobDuration: '',
                stipend: '',
                other: '',
                onsiteLocation: ''
            });
            setJDFile(null);
            setMessages([]);
        }
        catch(err){
            console.error("Error posting job:", err);
            setMessages(['Failed to post job. Please try again.']);
        }
    };
    return (
        <div>
            <Navbar />
            <form className='form-container' onSubmit={handleSubmit}>
                <h2>ADD A NEW JOB</h2>
                <div className="section">
                    <label className='dept'>Select Department:</label>
                    <select id='department' name="department" value={formData.department} onChange={handleChange} required>
                        <option value="" disabled>Select department</option>
                        <option value="any">Any</option>
                        <option value="cse">CSE</option>
                        <option value="it">IT</option>
                        <option value="ece">ECE</option>
                        <option value="ads">ADS</option>
                        <option value="aml">AML</option>
                        <option value="eee">EEE</option>
                        <option value="mech">MECH</option>
                        <option value="civil">CIVIL</option>
                        <option value="chem">CHEM</option>
                    </select>
                </div>
                <div className="section">
                    <label>Job domain:</label>
                    <select id='job-domain' name="jobDomain" value={formData.jobDomain} onChange={handleChange} required>
                        <option value="" disabled>Select job</option>
                        <option value="Full-stack">Full Stack Development</option>
                        <option value="frontend">Frontend Development</option>
                        <option value="backend">Backend Development</option>
                        <option value="data-science">Data Science</option>
                        <option value="other">Other</option>
                    </select>
                    {formData.jobDomain==="other" && (
                        <input
                            type="text"
                            name="other"
                            placeholder="Enter job domain"
                            value={formData.other}
                            onChange={handleChange}
                            required
                        ></input>
                    )}
                </div>
                <div className="section">
                    <label>Job Type:</label>
                    <select id='job-type' name="jobType" value={formData.jobType} onChange={handleChange} required>
                        <option value="" disabled>Select job type</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="internship">Internship</option>
                        <option value="freelance">Freelance</option>
                    </select>
                </div>
                <div className="section">
                    <label>Work location:</label>
                    <select id='work-loc' name="workLocation" value={formData.workLocation} onChange={handleChange} required>
                        <option value="" disabled>Select work location</option>
                        <option value="any">Any</option>
                        <option value="onsite">Onsite</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="remote">Remote</option>
                    </select>
                    {formData.workLocation==="onsite" && (
                        <input
                            type="text"
                            name="onsiteLocation"
                            placeholder="Enter onsite location"
                            value={formData.onsiteLocation}
                            onChange={handleChange}
                            required
                        />
                    )}
                </div>
                <div className="section">
                    <label>Job Duration:</label>
                    <select id='job-dur' name="jobDuration" value={formData.jobDuration} onChange={handleChange} required>
                        <option value="" disabled>Select job duration</option>
                        <option value="1-3M">1-3 Months</option>
                        <option value="3-6M">3-6 Months</option>
                        <option value="6-9M">6-9 Months</option>
                        <option value="1year+">1 Year+</option>
                    </select>
                </div>
                <div className="section">
                    <label>Enter Stipend:</label>
                    <select id='stipend' name="stipend" value={formData.stipend} onChange={handleChange} required>
                        <option value="" disabled>Select stipend</option>
                        <option value="below-1k">Below ₹1,000</option>
                        <option value="1-5k">₹1,000 - ₹5,000</option>
                        <option value="5-10k">₹5,000 - ₹10,000</option>
                        <option value="10-15k">₹10,000 - ₹15,000</option>
                        <option value="15-20k">₹15,000 - ₹20,000</option>
                        <option value="20-30k">₹20,000 - ₹30,000</option>
                        <option value="30-40k">₹30,000 - ₹40,000</option>
                        <option value="40k+">Above ₹40,000</option>
                        <option value="unpaid">Unpaid</option>
                    </select>
                </div>
                <div className='job-desc'>
                    <input
                        type='file'
                        name="jdFile"
                        accept='.pdf, .doc, .docx'
                        onChange={handleFileUpload}
                    ></input>
                </div>
                {messages.length>0 && (
                    <ul className='msg-li'>
                        {messages.map((msg,idx) => (
                            <li key={idx} style={{ color:'red' }}>{msg}</li>
                        ))}
                    </ul>
                )}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
