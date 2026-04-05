const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// APPLY JOB
router.post("/apply", async(req,res)=>{

try{

const {studentEmail, jobId} = req.body;

const application = new Application({
studentEmail,
jobId
});

await application.save();

res.json({
message:"Job applied successfully"
});

}catch(err){

res.status(500).json(err);

}

});

module.exports = router;