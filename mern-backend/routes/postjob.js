const express=require('express');
const router=express.Router();
const Jobs = require('../models/Jobs');
const auth=require('../middleware/auth');
const multer = require('multer');
const Recruiter = require('../models/Recruiter');

const storage=multer.diskStorage({
  destination: function(req,file,cb){
      cb(null,'uploads/jd');
  },
  filename: function(req,file,cb){
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
  }
})

const upload = multer({ storage: storage });

router.get('/all', async (req, res) => {
    try{
        const jobs=await Jobs.find();
        res.json(jobs);
    }
    catch (err){
        res.status(500).json({ error: 'Failed to fetch all jobs', details: err.message });
    }
});

router.get('/:id', async(req,res) => {
    try{
        const job=await Jobs.findById(req.params.id);
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
    console.log("📥 Request body:", req.body);
    console.log("🔐 Authenticated recruiter ID:", req.user.id);

    const recruiter = await Recruiter.findById(req.user.id);
    if (!recruiter) {
      return res.status(404).json({ error: 'Recruiter not found' });
    }

    const jobData = {
      ...req.body,
      recruiterId: req.user.id,
      organizationLogo: recruiter.logo || '',
      organizationName: recruiter.companyOrInstituteName,
      recruiterRole: recruiter.role,
      jdFilePath: req.file ? req.file.filename : null
    };

    const newJob = new Jobs(jobData);
    await newJob.save();

    res.status(201).json({ message: 'Job posted successfully' });

  } catch (err) {
    console.error("❌ Error posting job:", err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

router.post("/apply/:jobId", async(req,res) => {
    try{
        const {applicant}=req.body;
        const job=await Job.findById(req.params.jobId);
        if(!jobApplicant){
            res.status(500).json({ message: 'Applicant not found!' });
        }
        else{
            job.applicants.push(applicant);
            await job.save();
            res.json({ message: 'Applied successfully', job });
        }
    }
    catch(err){
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/byRecruiter/:id', async (req,res) => {
    try{
        const jobs=await Jobs.find({ recruiterId: req.params.id })
        res.json(jobs);
    }
    catch(err){
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

module.exports=router