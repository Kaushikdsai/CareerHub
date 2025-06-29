import React, { useState } from "react";
import "../styles/JobFilter.css";

export const JobFilter = () => {
  const [selectedDomain, setSelectedDomain] = useState("");

  const jobDomains = [
    { value: "any", label: "Any" },
    { value: "fullstack", label: "Full Stack Development" },
    { value: "frontend", label: "Frontend Development" },
    { value: "backend", label: "Backend Development" },
    { value: "datascience", label: "Data Science" },
  ];

  const handleDomainChange = (e) => {
    setSelectedDomain(e.target.value);
  };

  return (
    <div className="filters-container">
      <div className="dept-container">
        <h2>DEPARTMENT</h2>
        <div className="dept-display">
          <label>
            <input type="checkbox" className="filter" value="category1" />Any
          </label>
          <label>
            <input type="checkbox" className="filter" value="category2" />CSE
          </label>
          <label>
            <input type="checkbox" className="filter" value="category3" />IT
          </label>
          <label>
            <input type="checkbox" className="filter" value="category4" />ECE
          </label>
          <label>
            <input type="checkbox" className="filter" value="category5" />ADS
          </label>
          <label>
            <input type="checkbox" className="filter" value="category6" />AML
          </label>
          <label>
            <input type="checkbox" className="filter" value="category7" />EEE
          </label>
          <label>
            <input type="checkbox" className="filter" value="category8" />MECH
          </label>
          <label>
            <input type="checkbox" className="filter" value="category9" />CIVIL
          </label>
          <label>
            <input type="checkbox" className="filter" value="category10" />CHEM
          </label>
        </div>
      </div>

      <div className="jobdomain-container">
        <h2>JOB DOMAIN</h2>
        <label>Select Job Domain:</label>
        <br />
        <select
          name="jobDomain"
          value={selectedDomain}
          onChange={handleDomainChange}
        >
          <option value="">Select a job domain</option>
          {jobDomains.map((domain) => (
            <option key={domain.value} value={domain.value}>
              {domain.label}
            </option>
          ))}
        </select>
        <br />
        <div className="selected-domain">
          <h3>Selected Job Domain:</h3>
          <p>
            {selectedDomain
              ? jobDomains.find((d) => d.value === selectedDomain)?.label
              : "None"}
          </p>
        </div>
      </div>

      <div className="jobtype-container">
        <h2>JOB TYPE</h2>
        <div className="jobtype-display">
          <label>
            <input type="checkbox" className="filter" value="category1" />Any
          </label>
          <label>
            <input type="checkbox" className="filter" value="category2" />Full-time
          </label>
          <label>
            <input type="checkbox" className="filter" value="category3" />Part-time
          </label>
          <label>
            <input type="checkbox" className="filter" value="category4" />Internship
          </label>
          <label>
            <input type="checkbox" className="filter" value="category4" />Freelance
          </label>
        </div>
      </div>

      <div className="worklocation-container">
        <h2>WORK LOCATION</h2>
        <div className="worklocation-display">
          <label>
            <input type="checkbox" className="filter" value="category1" />Any
          </label>
          <label>
            <input type="checkbox" className="filter" value="category2" />Onsite
          </label>
          <label>
            <input type="checkbox" className="filter" value="category3" />Hybrid
          </label>
          <label>
            <input type="checkbox" className="filter" value="category4" />Remote
          </label>
        </div>
      </div>

      <div className="jobduration-container">
        <h2>JOB DURATION</h2>
        <div className="jobduration-display">
          <label>
            <input type="checkbox" className="filter" value="category1" />Any
          </label>
          <label>
            <input type="checkbox" className="filter" value="category2" />1 Month - 3 Months
          </label>
          <label>
            <input type="checkbox" className="filter" value="category3" />3 Months - 6 Months 
          </label>
          <label>
            <input type="checkbox" className="filter" value="category4" />6 Months - 12 Months
          </label>
          <label>
            <input type="checkbox" className="filter" value="category4" />More than 1 year
          </label>
        </div>
      </div>
      
      <div className="stipend-container">
        <h2>STIPEND</h2>
        <div className="stipend-display">
          <label>
            <input type="checkbox" className="filter" value="category1" />Any
          </label>
          <label>
            <input type="checkbox" className="filter" value="category2" />Below ₹1,000
          </label>
          <label>
            <input type="checkbox" className="filter" value="category3" />₹1,000 - ₹5,000
          </label>
          <label>
            <input type="checkbox" className="filter" value="category4" />₹5,000 - ₹10,000
          </label>
          <label>
            <input type="checkbox" className="filter" value="category5" />₹10,000 - ₹15,000
          </label>
          <label>
            <input type="checkbox" className="filter" value="category6" />₹15,000 - ₹20,000
          </label>
          <label>
            <input type="checkbox" className="filter" value="category7" />₹20,000 - ₹30,000
          </label>
          <label>
            <input type="checkbox" className="filter" value="category7" />₹30,000 - ₹40,000
          </label>
          <label>
            <input type="checkbox" className="filter" value="category7" />Above ₹40,000
          </label>
          <label>
            <input type="checkbox" className="filter" value="category7" />Unpaid
          </label>
        </div>
      </div>      
    </div>
  );
};
