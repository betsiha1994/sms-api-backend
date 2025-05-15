const contactService = require("../services/contact-services");

const createContact = async (req, res) => {
  try {
    const contact = await contactService.createContact(req.body);
    res.status(201).json({ message: "Contact created", contact });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const getContact = async (req, res) => {
  try {
    const contact = await contactService.getContactById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactService.getAllContacts();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateContact = async (req, res) => {
  try {
    const updated = await contactService.updateContact(req.params.id, req.body);
    if(!updated) return res.status(404).json({ error: "Contact not found"});
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteContact = async (req, res) => {
  try {
    await contactService.deleteContact(req.params.id);
    res.json("contact deleted");
  } catch {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createContact,
  getContact,
  getAllContacts,
  updateContact,
  deleteContact,
};
