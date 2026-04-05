const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({

    title:String,

    company:String,

    location:String,

    salary:String,

    description:String,

    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Recruiter"
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model("Job",jobSchema);