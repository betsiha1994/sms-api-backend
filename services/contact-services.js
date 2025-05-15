const Contact = require("../models/contact-model");

const createContact = async (contactData) => {
  const existing = await Contact.findOne({
    phoneNumber: contactData.phoneNumber,
  });
  if (existing) {
    throw new Error("Contact already exists");
  }
  const contact = new Contact(contactData);
  return await contact.save();
};
const getContactById = async (id) => {
  return await Contact.findById(id).select("-password");
};
const getAllContacts = async () => {
  return await Contact.find().select("-password");
};
const updateContact = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return await Contact.findByIdAndUpdate(id, data, { new: true });
  
};
const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

module.exports = {
  createContact,
  getContactById,
  getAllContacts,
  updateContact,
  deleteContact,
};
