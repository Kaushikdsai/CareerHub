const mongoose=require('mongoose');

const recruiterSchema=new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    phoneNumber: {type: Number, unique: true},
    password: String,
    companyOrInstituteName: String,
    role: String,
    location: String,
    logo: { type: String, default: null },
}, { timestamps: true });

module.exports=mongoose.model('Recruiter',recruiterSchema); 