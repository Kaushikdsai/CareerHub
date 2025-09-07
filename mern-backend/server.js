const fileRoutes=require('./routes/fileRoutes.js');
require('dotenv').config();
const path=require('path');
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const jobRoutes=require('./routes/postjob');
const authRoutes=require('./routes/auth');
const rateLimiter=require("./middleware/rateLimiter.js");
const applyRoutes=require('./routes/applyjob');
const Redis=require('ioredis');
const interviewRouter=require('./routes/sendInvite')
const applicationRejection=require('./routes/sendRejection')
const app=express();

app.use(cors());
app.use(rateLimiter);
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/career-bridge',{
    maxPoolSize: 100,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB Error:', err));

app.use('/auth',authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api',applyRoutes);
app.use('/api/files',fileRoutes);
app.use('/api/send-interview-invite',interviewRouter);
app.use('/api/send-rejection-mail',applicationRejection);

app.use('/jd',express.static(path.join(__dirname,'uploads/jd')));

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
