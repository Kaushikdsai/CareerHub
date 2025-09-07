const express=require('express');
const router=express.Router();
const Job=require('../models/Jobs');
const auth=require('../middleware/auth');
const multer=require('multer');
const Recruiter=require('../models/Recruiter');
const upload=require('../middleware/upload');
const jobController=require('../controllers/jobController');


router.get("/all", async (req,res) => {
    try {
        const { domain,department,jobType,location,duration,stipend }=req.query
        let query={}
        query.status="open"
        if(domain && domain !== "any"){
            query.jobDomain={ $regex: domain, $options: "i" }
        }

        if(department){
            const depArray=Array.isArray(department)?department:[department]
            query.department={ $in: depArray.map(d=>new RegExp(`^${d}$`,"i")) }
        }

        if(jobType){
            const jobTypeArray=Array.isArray(jobType)?jobType:[jobType]
            query.jobType={ $in: jobTypeArray.map(t=>new RegExp(`^${t}$`,"i")) }
        }

        if(location){
            const locationArray=Array.isArray(location)?location:[location]
            query.workLocation={ $in: locationArray.map(l=>new RegExp(`^${l}$`,"i")) }
        }

        if(duration){
            const durationArray=Array.isArray(duration)?duration:[duration]
            query.jobDuration={ $in: durationArray.map(d=>new RegExp(`^${d}$`,"i")) }
        }

        if(stipend){
            const stipendArray=Array.isArray(stipend)?stipend:[stipend]
            query.stipend={ $in: stipendArray.map(s=>new RegExp(`^${s}$`,"i")) }
        }
        const jobs=await Job.find(query)
        res.json(jobs)
    }
    catch(err){
        console.error(err)
        res.status(500).json({message:"Server error"})
    }
})

router.get('/:id', async(req,res) => {
    try{
        const job = await Job.findById(req.params.id).populate('recruiterId', 'companyOrInstituteName logo role');
        if(!job){
            return res.status(404).json({ message: 'Job not found' });
        }
        const jobWithRecruiter = {
            ...job._doc,
            organizationName: job.recruiterId?.companyOrInstituteName || job.organizationName,
            organizationLogo: job.recruiterId?.logo || job.organizationLogo,
            recruiterRole: job.recruiterId?.role || job.recruiterRole
        };
        res.status(200).json(jobWithRecruiter);
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

router.patch('/:jobId/close',jobController.closeJob);
router.patch('/:jobId/open',jobController.openJob);

module.exports=router;