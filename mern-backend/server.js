require('dotenv').config();
const fileRoutes=require('./routes/fileRoutes.js');
const path=require('path');
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const jobRoutes=require('./routes/postjob');
const authRoutes=require('./routes/auth');
const rateLimit=require("./middleware/rateLimit.js");
const applyRoutes=require('./routes/applyjob');
const interviewRouter=require('./routes/sendInvite');
const applicationRejection=require('./routes/sendRejection');

const app=express();
const { redis }=require('./config/redis');
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/career-bridge',{
    maxPoolSize: 100,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB Error:', err));

app.use('/auth',rateLimit,authRoutes);
app.use('/api/jobs',rateLimit,jobRoutes);
app.use('/api',rateLimit,applyRoutes);
app.use('/api/files',rateLimit,fileRoutes);
app.use('/api/send-interview-invite',rateLimit,interviewRouter);
app.use('/api/send-rejection-mail',rateLimit,applicationRejection);

app.use('/jd',rateLimit,express.static(path.join(__dirname,'uploads/jd')));

async function testRedis(){
    await redis.set("test","redis-working");
    const value=await redis.get("test");
    console.log("Redis Test:", value);
}

testRedis();



app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});