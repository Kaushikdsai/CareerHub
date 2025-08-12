const express=require('express');
const upload=require('../middleware/upload.js');

const router=express.Router();

router.post('/upload', upload.single('file'), (req,res) => {
    res.json({
        message: 'File uploaded successfully',
        fileUrl: req.file.path
    });
});

module.exports=router;