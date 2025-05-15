const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async ({email, password})=>{
    const user = await User.findOne({email});
    if(!user){
        throw {status:404,message:'User not found'};
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw {status:404,message:'Invaid password'};
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return{
        token,
        user:{
          id: user._id,
        email: user.email,
        },
    };
};