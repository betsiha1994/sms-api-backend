// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers');
const { validateRegister,validateLogin} = require('../utils/validators');

router.post('/register',  (req, res) => {
  const errors = validateRegister(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
 return userController.registerUser(req,res);
});
router.post('/login', (req,res)=>{
    const errors = validateLogin(req.body);
    if(errors.length>0){
        return res.status(400).json({errors});
    }
});    
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.put('/:id',  (req, res) => {
  const errors = validateRegister(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
 return userController.updateUser(req,res);
});
router.delete('/:id', userController.deleteUser);

module.exports = router;
