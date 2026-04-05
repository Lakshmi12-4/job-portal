const express = require("express");
const router = express.Router();
const multer = require("multer");

const Student = require("../models/Student");

/* Storage Setup */

const storage = multer.diskStorage({

destination:function(req,file,cb){
cb(null,"uploads/resumes");
},

filename:function(req,file,cb){
cb(null,Date.now()+"-"+file.originalname);
}

});

const upload = multer({storage:storage});

/* Upload Resume */

router.post("/upload-resume",upload.single("resume"),async(req,res)=>{

const email=req.body.email;

const resumePath=req.file.filename;

await Student.findOneAndUpdate(
{email:email},
{resume:resumePath}
);

res.json({message:"Resume Uploaded Successfully"});

});

module.exports = router;