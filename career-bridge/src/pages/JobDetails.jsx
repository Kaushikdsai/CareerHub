import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import axios from "axios";

export const JobDetails = () => {
    const { id }=useParams();
    const [job,setJob]=useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try{
                const res=await axios.get(`http://localhost:5000/postJob/${id}`);
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
                            src={`http://localhost:5000/uploads/${job.organizationLogo}`}
                            alt="Organization-logo"
                            className="org-logo"
                        /> 
                    )}
                    <h1>{job.organizationName}</h1>
                </div>
                <div className="job-details">
                    <h2>{job.jobDomain}</h2>
                    <p><strong>Organization:</strong> {job.organizationName}</p>
                    <p><strong>Recruiter Role:</strong> {job.recruiterRole}</p>
                    <p><strong>Department:</strong> {job.department}</p>
                    <p><strong>Type:</strong> {job.jobType}</p>
                    <p><strong>Location:</strong> {job.workLocation}</p>
                    <p><strong>Duration:</strong> {job.jobDuration}</p>
                    <p><strong>Stipend:</strong> {job.stipend}</p>
                    {job.jdFile && (
                        <div>
                            <p><strong>Job Description: </strong></p>
                            <a
                                href="{`http://localhost:5000/uploads/${job.jdFile}`}"
                                target="_blank"
                            >View JD File</a>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}