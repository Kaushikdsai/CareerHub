import React from 'react';
import Navbar from './Navbar'

export const NewJob = () => {
  return (
    <div>
        <form>
            <div className="dept-conatainer">
                <label>Select Department:</label>
                <select id='department' name="department" required>
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
            <div className="domain-conatainer">
                <label>Job domain:</label>
                <select id='job-domain' name="job-domain" required>
                    <option value="Full-stack">Full Stack Development</option>
                    <option value="frontend">Frontend Development</option>
                    <option value="backend">Backend Development</option>
                    <option value="data-science">Data Science</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="jobtype-conatainer">
                <label>Job Type:</label>
                <select id='job-type' name="job-type" required>
                    <option value="any">Any</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="freelance">Freelance</option>
                </select>
            </div>
            <div className="workloc-conatainer">
                <label>Work location:</label>
                <select id='work-loc' name="work-loc" required>
                    <option value="any">Any</option>
                    <option value="onsite">Onsite</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="remote">Remote</option>
                </select>
            </div>
            <div className="jobdur-conatainer">
                <label>Job Duration:</label>
                <select id='job-dur' name="job-dur" required>
                    <option value="any">Any</option>
                    <option value="onsite">1-3 Months</option>
                    <option value="hybrid">3-6 Months</option>
                    <option value="remote">6-9 Months</option>
                    <option value="remote">1 Year+</option>
                </select>
            </div>
            <div className="stipend-conatainer">
                <label>Enter Stipend:</label>
                <select id='stipend' name="stipend" required>
                    <option value="any">Below ₹1,000</option>
                    <option value="1-5k">₹1,000 - ₹5,000</option>
                    <option value="5-10k">₹5,000 - ₹10,000</option>
                    <option value="10-15k">₹10,000 - ₹15,000</option>
                    <option value="15-20k">₹15,000 - ₹20,000</option>
                    <option value="20-30k">₹20,000 - ₹30,000</option>
                    <option value="30-40k">₹30,000 - ₹40,000</option>
                    <option value="40k">Above ₹40,000</option>
                    <option value="unpaid">Unpaid</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
  );
};
