const express=require('express');
const router=express.Router();
const Job=require('../models/Jobs');
const upload=require('../middleware/upload');
const {redis}=require('../config/redis');

router.post('/apply',upload.single('resume'),async(req,res)=>{
    try{
        const {jobId,name,email,phone,collegeName,yearOfGraduation}=req.body;
        const job=await Job.findById(jobId);
        if(!job) return res.status(404).json({message:"Job not found"});

        const alreadyApplied=job.applicants.find(app=>app.email===email);
        if(alreadyApplied) return res.status(400).json({message:"Already Applied!"});

        job.applicants.push({
            name,
            email,
            phone,
            collegeName,
            yearOfGraduation,
            resumeUrl:req.file?.path||null
        });

        await job.save();
        await redis.del(`job:${jobId}`);
        res.status(200).json({message:"Application submitted successfully!"});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server error"});
    }
});

router.get('/recruiter/:id',async(req,res)=>{
    try{
        const cacheKey=`recruiterJobs:${req.params.id}`;
        const cached=await redis.get(cacheKey);
        if(cached) return res.json(JSON.parse(cached));

        const jobs=await Job.find({recruiterId:req.params.id});
        const jobsWithApplicants=jobs.map(job=>({
            ...job.toObject(),
            applicants:job.applicants||[]
        }));

        await redis.set(cacheKey,JSON.stringify(jobsWithApplicants),{ex:60});
        res.status(200).json(jobsWithApplicants);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Server error fetching recruiter jobs'});
    }
});

module.exports=router;