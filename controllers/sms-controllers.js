const smsService = require('../services/sms-services');
 

// use SmsHistory.find() or .create() etc.
  console.log(smsService)


exports.sendSMS = async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;
    
    if (!phoneNumber || !message) {
      return sendErrorResponse(res, 400, 'Missing phoneNumber or message');
    }

    const result = await smsService.sendSMS(phoneNumber, message);
  
    
    
    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    sendErrorResponse(res, 500, 'Failed to send SMS', error);
  }
};

exports.getHistory = async (req, res) => {
  
  try {
   
    const result = await smsService.getHistory();
    
    res.status(200).json({history: result.history, totalCount: result.totalCount});

  } catch (error) {
    sendErrorResponse(res, 500, 'Failed to fetch history', error);
  }
};
function sendErrorResponse(res,statusCode,message,error){
  
   res.status(statusCode).json({
    success:false,
    message:message,
    error:error.message || 'internal server error'
   });
}
// DELETE Controller
exports.deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await smsService.deleteHistoryById(id);

    if (!result.success) throw new Error(result.message);
    res.status(200).json(result);
  } catch (error) {
    sendErrorResponse(res, 500, 'Failed to delete SMS history', error);
  }
};

// UPDATE Controller
exports.updateHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await smsService.updateHistoryById(id, updateData);
    if (!result.success) throw new Error(result.message);
    res.status(200).json(result);
  } catch (error) {
    sendErrorResponse(res, 500, 'Failed to update SMS history', error);
  }
};


