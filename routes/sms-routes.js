const express = require('express');
const router = express.Router();
const smsController = require('../controllers/sms-controllers');
const { validateSMS} = require('../utils/validators');

router.post('/send',(req,res)=>{
    const {isValid ,errors} = validateSMS(req.body);
    if (!isValid){
        return res.status(400).json({errors});
    }
    return smsController.sendSMS(req,res);
});

router.get('/history', smsController.getHistory);
router.delete('/history/:id', smsController.deleteHistory);
router.put('/history/:id', (req,res)=>{
    const {isValid ,errors} = validateSMS(req.body);
    if (!isValid){
        return res.status(400).json({errors});
    }
      return smsController.updateHistory(req,res);
    });


module.exports = router;