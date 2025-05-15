const mongoose = require('mongoose');
const smsHistorySchema = new mongoose.Schema({
    phoneNumber:{
        type: String,
        required: true
    },
     message:{
        type: String,
        required: true
    },
      sentAt:{
        type: Date,
        default: Date.now
    },
     status:{
        type: String,
        default:"PENDING"
    },
})
 const SmsHistory = mongoose.model('SmsHistory',smsHistorySchema);
 module.exports = SmsHistory;