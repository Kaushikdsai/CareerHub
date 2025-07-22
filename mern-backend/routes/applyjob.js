const express=require('express');
const router=express.Router();
const Job=require('../models/Jobs');

router.post('/apply', async (req,res) => {
    console.log("Received application:", req.body);
    try{
        const {jobId,name,email,phone,collegeName,yearOfGraduation,resume}=req.body;
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(404).json({ message: "Job not found" });
        }
        const alreadyApplied=job.applicants.find(applicant => applicant.email === email);
        if(alreadyApplied){
            return res.status(400).json({ message:"Already Applied! "});
        }
        job.applicants.push({ name,email,phone,collegeName,yearOfGraduation,resumeUrl:resume });
        await job.save();
        res.status(200).json({ message: "Application submitted successfully!" });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/recruiter/:id', async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.params.id });

    // Optional: just to be safe, make sure applicants array exists
    const jobsWithApplicants = jobs.map(job => ({
      ...job.toObject(),
      applicants: job.applicants || []
    }));

    res.status(200).json(jobsWithApplicants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching recruiter jobs' });
  }
});


module.exports=router;