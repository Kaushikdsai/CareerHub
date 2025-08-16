const express=require('express');
const router=express.Router();
const jobController=require('../controllers/jobController');

router.patch('/:jobId/close',jobController.closeJob);
router.patch('/:jobId/open',jobController.openJob);

module.exports=router;