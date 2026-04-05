const express = require("express");
const router = express.Router();
const Job = require("../models/job");
router.post("/post-job", async (req,res)=>{
    try{

        const job = new Job(req.body);

        await job.save();

        res.json({
            message:"Job posted successfully",
            job
        });

    }catch(err){
        res.status(500).json(err);
    }
});


router.get("/", async (req,res)=>{
    try{

        const jobs = await Job.find();

        res.json(jobs);

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;