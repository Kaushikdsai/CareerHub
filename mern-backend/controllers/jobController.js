const Job=require('../models/Jobs');
const {sendAssessmentEmail}=require('../utils/sendMail');

exports.closeJob=async (req,res) => {
    try{
        const {jobId}=req.params;
        const {assessmentLink,deadline}=req.body;
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(404).json({ message: 'Job not found' });
        }
        job.status='closed';
        job.assessmentLink=assessmentLink?.trim() || null;
        await job.save();

        if(job.assessmentLink){
            for(const app of job.applicants){
                await sendAssessmentEmail(app.email,app.name,job,job.assessmentLink,deadline);
            }
        }

        res.json({ message: 'Job closed successfully', job });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.openJob=async (req,res) => {
    try{
        const {jobId}=req.params;
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(404).json({ message: 'Job not found' });
        }
        job.status='open';
        job.assessmentLink=null;
        await job.save();
        res.json({ message: 'Job reopened successfully',job });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};