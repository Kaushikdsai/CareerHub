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
    },
    status: {
        type: String,
        enum: ['open','closed'],
        default: 'open'
    },
    assessmentLink: {
        type: String,
        default: null
    },
    applicants: [
        {
            name: String,
            email: String,
            phone: String,
            location: String,
            collegeName: String,
            yearOfGraduation: Number,
            resumeUrl: String,
            appliedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

jobSchema.index({ recruiterId: 1 });
jobSchema.index({ status: 1 });

module.exports=mongoose.model('Job',jobSchema);