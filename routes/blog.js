const express = require("express");
const router=express.Router();
const {blogs}=require("../controllers/blog")


router.get('/',blogs)


module.exports=router;