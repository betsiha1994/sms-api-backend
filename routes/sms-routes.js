// routes/sms-routes.js
const express = require('express');
const router = express.Router();
const smsController = require('../controllers/sms-controllers');
const { validateSMS} = require('../utils/validators');

// Debug: Check what's actually being imported


// POST /api/sms/send
router.post('/send',(req,res)=>{
    const errors = validateSMS(req.body);
    if (errors.length >0){
        return res.status(400).json({errors});
    }
    return smsController.sendSMS(req,res);
});

// GET /api/sms/history
router.get('/history', smsController.getHistory);
router.delete('/history/:id', smsController.deleteHistory);
router.put('/history/:id', (req,res)=>{
    const errors = validateSMS(req.body);
    if (errors.length >0){
        return res.status(400).json({errors});
    }
      return smsController.updateHistory(req,res);
    });


module.exports = router;