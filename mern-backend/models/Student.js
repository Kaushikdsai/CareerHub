
const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    phoneNumber: {type: Number, unique: true},
    password: String,
    collegeName: String,
    yearOfGraduation: String,
    location: String,
    skills: [String],
    resume: String
});

module.exports=mongoose.model('Student', studentSchema);
