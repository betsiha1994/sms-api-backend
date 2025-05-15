// services/userService.js
const User = require('../models/user-model');
const bcrypt = require('bcrypt');

const createUser = async (userData) => {
 
  const existing = await User.findOne({ email: userData.email});
  if(existing){
    throw new Error('User already exists');
  }
  const user = new User(userData);
  return await user.save();
};

const getUserById = async (id) => {
  return await User.findById(id).select('-password');
};

const getAllUsers = async () => {
  return await User.find().select('-password');
};

const updateUser = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return await User.findByIdAndUpdate(id, data, { new: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
};
