const multer=require('multer');
const path=require('path');
const jwt=require('jsonwebtoken');
const express=require('express');
const bcrypt=require('bcryptjs');
const Student=require('../models/Student');
const Recruiter=require('../models/Recruiter');
const authMiddleware = require('../middleware/auth');
const router=express.Router();

const storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,'uploads/');
    },
    filename:function(req,file,cb){
      const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9);
      cb(null,uniqueSuffix+path.extname(file.originalname));
    }
});

const upload=multer({storage:storage});

router.get('/check-token', authMiddleware, (req, res) => {
  res.status(200).json({ valid: true, role: req.user.role });
});

router.post('/student/register',upload.single('file'),async(req,res)=>{
  const{name,email,phoneNumber,password,collegeName,yearOfGraduation,location,skills}=req.body;
  try{
    const existingStudent=await Student.findOne({email});
    if(existingStudent){
      return res.status(400).json({message:'Email already exists'});
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const parsedSkills=Array.isArray(skills)?skills:[skills];
    const newStudent=new Student({
      name,
      email,
      phoneNumber,
      password:hashedPassword,
      collegeName,
      yearOfGraduation,
      location,
      skills: parsedSkills,
      resume:req.file.filename
    });
    await newStudent.save();
    res.status(201).json({message:'Registration successful'});
  }
  catch(err){
    res.status(500).json({message:'Server error'});
  }
});

router.post('/student/login',async(req,res)=>{
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
        res.json({ token, role:'student', studentId:student._id, message: 'Login successful' });
    }
    catch(err){
        console.error('Login Error:', err);
        res.status(500).json({message:'Server error'});
    }
});

router.post('/recruiter/register', upload.single('logo'), async(req,res) => {
  try {
    console.log('📥 Incoming recruiter data:', req.body);

    const { name, email, phoneNumber, password, companyOrInstituteName, role, location } = req.body;

    if (!name || !email || !phoneNumber || !password || !companyOrInstituteName || !role || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRecruiter = new Recruiter({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      companyOrInstituteName,
      logo: req.file?.filename || null,
      role,
      location
    });

    await newRecruiter.save();

    res.status(201).json({ recruiterId: newRecruiter._id });

  } catch (err) {
    console.error('❌ Recruiter registration error:', err); // 👈 Very important!
    res.status(500).json({ message: 'Server error', error: err.message });
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
    res.status(500).json({message:'Server error'});
  }
});

module.exports=router;