const express = require("express");
const router=express.Router();
const {signup,signin,signout,requireSignin}=require("../controllers/auth")

const {runValidation}=require("../validator/index");
const {userSignupValidator,userSignInValidator}=require("../validator/auth");


router.post('/sign-up',userSignupValidator,runValidation,signup);
router.post('/sign-in',userSignInValidator,runValidation,signin);
router.get('/signout',signout);


//test
router.get('/secret',requireSignin,(req,res)=>{
    res.json({
        message:"You have acces to secret page"
    })
})


module.exports=router;