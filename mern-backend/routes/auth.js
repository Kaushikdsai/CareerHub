const multer=require('multer');
const path=require('path');
const jwt=require('jsonwebtoken');
const express=require('express');
const bcrypt=require('bcryptjs');
const Student=require('../models/Student');
const Recruiter=require('../models/Recruiter');
const authMiddleware = require('../middleware/auth');
const router=express.Router();
const upload=require('../middleware/upload');
const cloudinary=require('cloudinary').v2;

router.get('/check-token', authMiddleware, (req, res) => {
  res.status(200).json({ valid: true, role: req.user.role });
});

router.post('/student/register', upload.single('resume'), async (req, res) => {
  try {
    console.log("===== STUDENT REGISTER DEBUG =====");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      name,
      email,
      phoneNumber,
      password,
      collegeName,
      yearOfGraduation,
      location,
      skills
    } = req.body;

    // Check existing user
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle skills safely
    const parsedSkills = skills
      ? Array.isArray(skills) ? skills : [skills]
      : [];

    // Resume URL from Cloudinary
    let resumeUrl = null;
    if (req.file) {
      resumeUrl = req.file.path;
    }

    // Create student
    const newStudent = new Student({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      collegeName,
      yearOfGraduation,
      location,
      skills: parsedSkills,
      resume: resumeUrl
    });

    await newStudent.save();

    return res.status(201).json({
      message: "Registration successful"
    });

  } catch (err) {

    console.error("===== STUDENT REGISTER ERROR =====");
    console.dir(err, { depth: null });
    console.error(err.stack);

    return res.status(500).json({
      message: err.message || "Server error"
    });
  }
});

router.post('/student/login',async(req,res)=>{
  console.log('Login request body:', req.body);
    const{email,password}=req.body;
    try{
        const student=await Student.findOne({email});
        if(!student){
          return res.status(400).json({message:'Email not found'});
        }
        const isMatch=await bcrypt.compare(password,student.password);
        if(!isMatch){
            return res.status(400).json({message:'Incorrect Password'});
        }
        const token=jwt.sign(
            {id: student._id, role:'student'},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        )
        res.json({ 
          token,
          role: 'student',
          studentId: student._id,
          name: student.name,
          email: student.email,
          phone: student.phoneNumber,
          collegeName: student.collegeName,
          yearOfGraduation: student.yearOfGraduation,
          resume: student.resume, 
          message: 'Login successful'
         });
    }
    catch(err){
        console.error('Login Error:', err);
        res.status(500).json({message:'Server error'});
    }
});

router.get('/student/me', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    console.error('Error fetching student:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/recruiter/register', upload.single('logo'), async (req, res) => {
  try {

    console.log("===== Recruiter Register Debug =====");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, email, phoneNumber, password, companyName, role, location } = req.body;

    if (!name || !email || !phoneNumber || !password || !companyName || !role || !location) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let logoUrl = null;

    if (req.file) {
      console.log("Logo uploaded:", req.file);
      logoUrl = req.file.path;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRecruiter = new Recruiter({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      companyName,
      role,
      location,
      logo: logoUrl
    });

    console.log("Saving recruiter...");

    await newRecruiter.save();

    res.status(201).json({ recruiterId: newRecruiter._id });

  } catch (err) {

    console.error("===== REGISTER ERROR =====");
    console.error(err);

    res.status(500).json({
      message: err.message
    });
  }
});

router.post('/recruiter/login',async(req,res)=>{
    const{email,password}=req.body;
    try{
      const recruiter=await Recruiter.findOne({email});
      if(!recruiter){
        return res.status(400).json({message:'Email not found'});
      }
      const isMatch=await bcrypt.compare(password,recruiter.password);
      if(!isMatch){
        return res.status(400).json({message:'Incorrect Password'});
      }
      
      const token=jwt.sign(
        {id: recruiter._id, role:'recruiter'},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
      )

      res.json({ token, role:'recruiter', recruiterId:recruiter._id });

    }
    catch(err){
        console.error(err);
        res.status(500).json({message:'Server error'});
    }
});

module.exports=router;