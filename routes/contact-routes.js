const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact-controllers");
const{ validateContact} = require("../utils/validators");

router.post("/", (req,res)=>{
    const errors = validateContact(req.body);
    if (errors.length >0){
        return res.status(400).json({errors});
    }
    return contactController.createContact(req,res);
});
router.get("/", contactController.getAllContacts);
router.get("/:id", contactController.getContact);


router.put("/:id",(req,res)=>{
    const errors = validateContact(req.body);
    if (errors.length >0){
        return res.status(400).json({errors});
    }
     return contactController.updateContact(req,res);
    });
router.delete("/:id", contactController.deleteContact);

module.exports = router;
