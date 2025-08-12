const express=require('express');
const router=express.Router();
const Job=require('../models/Jobs');
const auth=require('../middleware/auth');
const multer=require('multer');
const Recruiter=require('../models/Recruiter');
const upload=require('../middleware/upload');

router.get('/all', async (req, res) => {
    try{
        const jobs=await Job.find();
        res.json(jobs);
    }
    catch (err){
        res.status(500).json({ error: 'Failed to fetch all jobs', details: err.message });
    }
});

router.get('/:id', async(req,res) => {
    try{
        const job=await Job.findById(req.params.id);
        if(!job){
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    }
    catch(err){
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
})

router.post('/recruiter/newjob', auth, upload.single('jdFile'), async (req, res) => {
    try {
        const recruiter=await Recruiter.findById(req.user.id);
        if(!recruiter){
            return res.status(404).json({ error: 'Recruiter not found' });
        }

        const jobData = {
            ...req.body,
            recruiterId: req.user.id,
            organizationLogo: recruiter.logo || '',
            organizationName: recruiter.companyOrInstituteName,
            recruiterRole: recruiter.role,
            jdFilePath: req.file?.path || null
        };

        const newJob=new Job(jobData);
        await newJob.save();

        res.status(201).json({ message: 'Job posted successfully' });

    }
    catch(err){
        console.error("Error posting job:", err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

router.post("/apply/:jobId", async(req,res) => {
    try{
        const { name,email,phone,collegeName,yearOfGraduation,resume,jobTitle,recruiterId }=req.body;
        const job=await Job.findById(req.params.jobId);
        if(!job){
            return res.status(500).json({ message: 'Job not found!' });
        }
        
        const alreadyApplied=job.applicants.find(applicant => applicant.email===email);
        if(alreadyApplied){
            return res.status(400).json({ message: 'Already applied!' });
        }

        job.applicants.push({
            name,
            email,
            phone,
            collegeName,
            yearOfGraduation,
            resumeUrl: resume,
            jobTitle,
            recruiterId
        });

        await job.save();
        res.json({ message: 'Applied successfully', job});
    }
    catch(err){
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/byRecruiter/:id', async (req,res) => {
    try{
        const jobs=await Job.find({ recruiterId: req.params.id })
        res.json(jobs);
    }
    catch(err){
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

module.exports=router;