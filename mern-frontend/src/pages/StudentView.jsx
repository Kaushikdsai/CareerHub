import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { Hero } from '../components/Hero';
import Navbar from '../components/Navbar';
import { JobFilter } from '../components/JobFilter';
import '../styles/StudentView.css';

export const StudentView = () => {
  const navigate=useNavigate();
  const [jobs,setJobs]=useState([]);
  const [filteredJobs,setFilteredJobs]=useState([]);
  const [filters,setFilters]=useState({
    domain: '',
    department:[],
    jobType: [],
    location: [],
    duration: [],
    stipend: []
  })

  useEffect(() => {
    const fetchJobs=async () => {
      try{
        const res=await axios.get('http://localhost:5000/postJob/all');
        setJobs(res.data);
        setFilteredJobs(res.data);
      }
      catch(err){
        console.error('Error loading jobs!', err);
      }
    };
    fetchJobs();
  }, []);

  const applyFilters = () => {
      let filtered=[...jobs];
      if(filters.domain && filters.domain!=='any'){
          filtered=filtered.filter(job =>
            job.jobDomain?.toLowerCase().includes(filters.domain.toLowerCase())
          );
      }
      if(filters.department.length>0 && !filters.department.includes('any')){
        filtered=filtered.filter(job =>
          filters.department.includes(job.department?.toLowerCase())
        );
      }
      if(filters.jobType.length>0 && !filters.jobType.includes('any')){
        filtered=filtered.filter(job =>
          filters.jobType.includes(job.jobType?.toLowerCase())
        );
      }
      if(filters.location.length>0 && !filters.location.includes('any')){
        filtered=filtered.filter(job =>
          filters.location.includes(job.workLocation?.toLowerCase())
        );
      }

      if(filters.duration.length>0 && !filters.duration.includes('any')){
        filtered=filtered.filter(job =>
          filters.duration.includes(job.jobDuration)
        );
      }
      if(filters.stipend.length>0 && !filters.stipend.includes('any')){
        filtered=filtered.filter(job =>
          filters.stipend.includes(job.stipend)
        );
      }
      setFilteredJobs(filtered);
  }

  const handleApply = (jobId) => {
    navigate(`/job/${jobId}`);
  }

  return (
    <>
      <Navbar />
      <Hero />
      <JobFilter setFilters={setFilters}/>
      <button className="filters-btn" onClick={applyFilters}>Apply Filters</button>

      <div className="job-list-container">
        <h2>Jobs posted by Recruiters</h2>
        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <ul className="job-list">
            {filteredJobs.map((job) => (
              <li key={job._id} className="job-card">
                {job.organizationLogo && (
                  <img
                    src={job.organizationLogo}
                    alt="Org Logo"
                    className="org-logo"
                  />
                )}
                <h3>{job.jobDomain}</h3>
                <p><strong>Organization:</strong> {job.organizationName}</p>
                <p><strong>Role:</strong> {job.recruiterRole}</p>
                <h3>{job.jobDomain}</h3>
                <p><strong>Department:</strong> {job.department}</p>
                <p><strong>Type:</strong> {job.jobType}</p>
                <p><strong>Location:</strong> {job.workLocation}</p>
                <p><strong>Duration:</strong> {job.jobDuration}</p>
                <p><strong>Stipend:</strong> {job.stipend}</p>
                <button className="apply-btn" onClick={() => handleApply(job._id)}>Apply</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
