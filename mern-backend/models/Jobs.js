const mongoose=require('mongoose')

const jobSchema=new mongoose.Schema({
    department: String,
    jobDomain: String,
    jobType: String,
    workLocation: String,
    jobDuration: String,
    stipend: String,
    other: String,
    onsiteLocation: String,
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true
    },
    organizationLogo: String,
    organizationName: String,
    recruiterRole: String,
    jdFilePath: {
        type: String,
        default: null
    }
}, { timestamps: true });

module.exports=mongoose.model('Job',jobSchema);