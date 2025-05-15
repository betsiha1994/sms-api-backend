// sms-services.js
const SmsHistory = require("../models/sms-model");
const mockSNS = require("./provider/mock-sns"); // Mock provider for testing

// Define the sendSMS function (to simulate sending SMS)
async function sendSMS(phoneNumber, message) {
  try {
    // Ethiopian phone number validation
    if (
      phoneNumber.startsWith("+251") &&
      !/^\+2519[0-9]{8}$/.test(phoneNumber)
    ) {
      throw new Error("Invalid Ethiopian number format");
    }

    // Use mock provider to simulate sending the SMS
    const result = await mockSNS.publish({
      PhoneNumber: phoneNumber,
      Message: message,
    });

    return {
      success: true,
      messageId: result.MessageId,
      provider: "Mock",
    };
  } catch (error) {
    throw error; // Rethrow the error for the controller to catch
  }
}

// Define the getHistory function (to fetch SMS history from the database)
async function getHistory() {
  try {
    const history = await SmsHistory.find(); // Fetch all SMS history from the database
    const totalCount = await SmsHistory.countDocuments(); // Count the number of documents
      console.log("📦 History result from service:", result);
    return {
      success: true,
      history,
      totalCount,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch history",
      error: error.message,
    };
  }
}
// DELETE by ID
async function deleteHistoryById(id) {
  try {
    const result = await SmsHistory.findByIdAndDelete(id);
    if (!result) throw new Error('SMS history not found');
    return { success: true, message: 'Deleted successfully' };
  } catch (error) {
    return { success: false, message: 'Delete failed', error: error.message };
  }
}

// UPDATE by ID
async function updateHistoryById(id, updateData) {
  try {
    const result = await SmsHistory.findByIdAndUpdate(id, updateData, { new: true });
    if (!result) throw new Error('SMS history not found');
    return { success: true, message: 'Updated successfully', updated: result };
  } catch (error) {
    return { success: false, message: 'Update failed', error: error.message };
  }
}

module.exports = {
  sendSMS,
  getHistory,
  deleteHistoryById,
  updateHistoryById
};




