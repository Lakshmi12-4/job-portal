const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({

studentEmail:{
type:String,
required:true
},

jobId:{
type:String,
required:true
},

appliedDate:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Application", applicationSchema);