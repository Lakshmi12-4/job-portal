const express = require("express");
const bcrypt = require("bcrypt");
const Student = require("../models/Student");

const router = express.Router();

// STUDENT REGISTER
router.post("/register-student", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({
            name,
            email,
            password: hashedPassword
        });

        await newStudent.save();

        res.status(201).json({ message: "Student Registered Successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
// STUDENT LOGIN
router.post("/login-student", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
// recruiter register
const Recruiter = require("../models/recruiter");

router.post("/register-recruiter", async (req,res)=>{
    try{

        const {companyName,email,password} = req.body;

        const existing = await Recruiter.findOne({email});

        if(existing){
            return res.status(400).json({message:"Recruiter already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const recruiter = new Recruiter({
            companyName,
            email,
            password:hashedPassword
        });

        await recruiter.save();

        res.json({message:"Recruiter registered successfully"});

    }catch(err){
        res.status(500).json(err);
    }
});
// recruiter login
router.post("/login-recruiter", async (req,res)=>{
    try{

        const {email,password} = req.body;

        const recruiter = await Recruiter.findOne({email});

        if(!recruiter){
            return res.status(404).json({message:"Recruiter not found"});
        }

        const isMatch = password === recruiter.password;

        if(!isMatch){
            return res.status(400).json({message:"Invalid password"});
        }

        res.json({
            message:"Login successful",
            recruiter
        });

    }catch(err){
        res.status(500).json(err);
    }
}); 
module.exports = router;