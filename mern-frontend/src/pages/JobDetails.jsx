import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import axios from "axios";
import "../styles/JobDetails.css"

export const JobDetails = () => {
    const { id }=useParams();
    const [job,setJob]=useState(null);
    const token = sessionStorage.getItem('token');

    const handleApply = async () => {
        try{
            const applicantData = {
                jobId: id,
                name: localStorage.getItem("studentName"), 
                email: localStorage.getItem("studentEmail"),
                phone: localStorage.getItem("studentPhone"),
                collegeName: localStorage.getItem("collegeName"),
                yearOfGraduation: localStorage.getItem("yearOfGraduation"),
                resume: localStorage.getItem("resumeFileName"),
                jobTitle: job?.jobDomain,   
                recruiterId: job?.recruiterId
            };
            const jobId=job._id;
            await axios.post(`http://localhost:5000/api/jobs/apply/${jobId}`, applicantData);
            alert("Application submitted successfully!");
        }
        catch(err){
            console.log(token);
            if(!token){
                alert('Please login first!');
            }
            else if(err.response.status===400){
                alert(err.response.data.message);
            }
            else{
                alert("Something went wrong while applying.");
            }
        }
    }

    useEffect(() => {
        const fetchJob = async () => {
            try{
                const res=await axios.get(`http://localhost:5000/api/jobs/${id}`);
                console.log("Full Job Object:", res.data);
                setJob(res.data);
            }
            catch(err){
                console.error(err);
            }
        };
        fetchJob();
    }, [id]);

    if(!job){
        return <p>Loading...</p>
    }

    return(
        <>
            <Navbar />
            <div className="job-details-container">
                <div className="organization">
                    {job.organizationLogo && (
                        <img
                            src={job.organizationLogo}
                            alt="Organization-logo"
                            className="org-logo"
                        /> 
                    )}
                    <h1 className="org-name">{job.organizationName}</h1>
                </div>
                <div className="job-details">
                    <h2 className="job-domain">Role: {job.jobDomain}</h2>
                    <br></br>
                    <p><strong>Organization:</strong> {job.organizationName}</p>
                    <p><strong>Recruiter Role:</strong> {job.recruiterRole}</p>
                    <p><strong>Department:</strong> {job.department}</p>
                    <p><strong>Type:</strong> {job.jobType}</p>
                    <p><strong>Location:</strong> {job.workLocation}</p>
                    <p><strong>Duration:</strong> {job.jobDuration}</p>
                    <p><strong>Stipend:</strong> {job.stipend}</p>
                    {job.jdFilePath && (
                        <div>
                            <p><strong>Job Description: </strong></p>
                            <a
                                href={job.jdFilePath}
                                target="_blank"
                            >View JD File</a>
                        </div>
                    )}
                    <button className="apply-btn" onClick={handleApply}>Click to Apply</button>
                </div>
            </div>
        </>
    )
}