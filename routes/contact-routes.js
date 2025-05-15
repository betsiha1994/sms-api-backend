const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact-controllers");
const{ validateContact} = require("../utils/validators");

router.post("/", (req,res)=>{
    const errors = validateContact(req.body);
    if (errors.length >0){
        return res.status(400).json({errors});
    }
    contactController.createContact});
router.get("/", contactController.getAllContacts);
router.get("/:id", contactController.getContact);


router.put("/:id",(req,res)=>{
    const errors = validateContact(req.body);
    if (errors.length >0){
        return res.status(400).json({errors});
    }
     contactController.updateContact});
router.delete("/:id", contactController.deleteContact);

module.exports = router;
