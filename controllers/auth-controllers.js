const authService = require('../services/auth-services');

exports.login = async(req,res)=>{
    try{
    const {token,user} = await authService.login(req.body);
     res.status(200).json({token,user});

    }catch(err){
        res.status(err.status ||500).json({error:err.message});
    }
};

