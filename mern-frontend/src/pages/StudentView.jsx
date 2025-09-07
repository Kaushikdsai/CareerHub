import React,{useState,useEffect,useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'
import {Hero} from '../components/Hero'
import Navbar from '../components/Navbar'
import {JobFilter} from '../components/JobFilter'
import '../styles/StudentView.css'

export const StudentView=()=>{
    const navigate=useNavigate()
    const [jobs,setJobs]=useState([])
    const [filters,setFilters]=useState({
        domain:'',
        department:[],
        jobType:[],
        location:[],
        duration:[],
        stipend:[]
    })

    const fetchJobs=useCallback(async(activeFilters={})=>{
        try{
          const res=await axios.get('http://localhost:5000/api/jobs/all',{
            params:activeFilters,
            paramsSerializer:params=>qs.stringify(params,{arrayFormat:'repeat'})
          })
          setJobs(res.data)
        }
        catch(err){
          console.error('Error loading jobs',err)
        }
    },[])

    useEffect(()=>{
       fetchJobs()
    },[fetchJobs])

    const handleApply=(jobId)=>{
       navigate(`/job/${jobId}`)
    }

    return(
        <>
          <Navbar/>
          <Hero/>
          <JobFilter setFilters={setFilters}/>
          <button className="filters-btn" onClick={()=>fetchJobs(filters)}>Apply Filters</button>
          <div className="job-list-container">
              <h2>Jobs posted by Recruiters:</h2>
              {jobs.length===0?(
                 <p>No jobs found.</p>
              ):(
                  <ul className="job-list">
                    {jobs.map(job=>(
                      <li key={job._id} className="job-card">
                        {job.organizationLogo&&<img src={job.organizationLogo} alt="Org Logo" className="org-logo"/>}
                        <h3>{job.jobDomain}</h3>
                        <p><strong>Organization:</strong> {job.organizationName}</p>
                        <p><strong>Role:</strong> {job.recruiterRole}</p>
                        <p><strong>Department:</strong> {job.department}</p>
                        <p><strong>Type:</strong> {job.jobType}</p>
                        <p><strong>Location:</strong> {job.workLocation}{job.onsiteLocation?` (${job.onsiteLocation})`:''}</p>
                        <p><strong>Duration:</strong> {job.jobDuration}</p>
                        <p><strong>Stipend:</strong> {job.stipend}</p>
                        <button className="apply-btn" onClick={()=>handleApply(job._id)}>Apply</button>
                      </li>
                    ))}
                  </ul>
              )}
          </div>
        </>
    )
}
