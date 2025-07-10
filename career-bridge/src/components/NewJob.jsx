import React, {useState} from 'react';
import '../styles/NewJob.css';
import axios from 'axios';
import Navbar from '../components/Navbar';

export const NewJob = () => {
    const [formData,setFormData]=useState({
        department: '',
        jobDomain: '',
        jobType: '',
        workLocation: '',
        jobDuration: '',
        stipend: ''
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit=async(e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/jobs/add', formData);
            alert('Job posted successfully!');
            setFormData({
                department: '',
                jobDomain: '',
                jobType: '',
                workLocation: '',
                jobDuration: '',
                stipend: ''
            });
        }
        catch(err){
            console.error(err);
            alert('Something went wrong while posting the job.');
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
                        <option value="Full-stack">Full Stack Development</option>
                        <option value="frontend">Frontend Development</option>
                        <option value="backend">Backend Development</option>
                        <option value="data-science">Data Science</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="section">
                    <label>Job Type:</label>
                    <select id='job-type' name="jobType" value={formData.jobType} onChange={handleChange} required>
                        <option value="any">Any</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="internship">Internship</option>
                        <option value="freelance">Freelance</option>
                    </select>
                </div>
                <div className="section">
                    <label>Work location:</label>
                    <select id='work-loc' name="workLocation" value={formData.workLocation} onChange={handleChange} required>
                        <option value="any">Any</option>
                        <option value="onsite">Onsite</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="remote">Remote</option>
                    </select>
                </div>
                <div className="section">
                    <label>Job Duration:</label>
                    <select id='job-dur' name="jobDuration" value={formData.jobDuration} onChange={handleChange} required>
                        <option value="any">Any</option>
                        <option value="1-3M">1-3 Months</option>
                        <option value="3-6M">3-6 Months</option>
                        <option value="6-9M">6-9 Months</option>
                        <option value="1year+">1 Year+</option>
                    </select>
                </div>
                <div className="section">
                    <label>Enter Stipend:</label>
                    <select id='stipend' name="stipend" value={formData.stipend} onChange={handleChange} required>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
