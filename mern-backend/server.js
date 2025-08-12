const fileRoutes=require('./routes/fileRoutes.js');
require('dotenv').config();
const path=require('path');
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const jobRoutes=require('./routes/postjob');
const authRoutes=require('./routes/auth');
const applyRoutes=require('./routes/applyjob');
const rateLimit=require('express-rate-limit');
const app=express();

const limiter=rateLimit({
    windowMs: 15*60*1000,
    max:100,
    standardHeaders: true,
    legacyHeaders: false
})

app.use(cors());
app.use(limiter);
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/career-bridge',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB Error:', err));

app.use('/auth',authRoutes);
app.use('/postJob',jobRoutes);
app.use('/api',applyRoutes);
app.use('/api/files',fileRoutes);

app.use('/jd',express.static(path.join(__dirname,'uploads/jd')));

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
