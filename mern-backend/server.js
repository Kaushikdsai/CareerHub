require('dotenv').config();
const path = require('path');
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const jobRoutes=require('./routes/postjob');
const authRoutes=require('./routes/auth');
const applyRoutes=require('./routes/applyJob');
const app=express();
app.use(cors());
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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/jd', express.static(path.join(__dirname, 'uploads/jd')));

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});