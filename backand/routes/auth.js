const express=require("express")
const router=express.Router()
const bcrypt=require('bcrypt')
const User=require('../models/User')


//register route
router.post('/register',async(req,res)=>{
    const{username,password}=req.body
    try{
        const existingUser=await User.findOne({username})
        if (existingUser) {
          return res.status(400).json({ message: "user already exists" });
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new User({username,password:hashedPassword})

        await newUser.save()

        //create session after registration
        req.session.userId=newUser._id;
        res.json({message:'user registered',username})
    }
    catch(err)
    {
        res.status(500).json({message:"server error"})
    }
})

//login route
router.post('/login',async(req,res)=>{
    const{username,password}=req.body
    try{
        const loggedInUser=await User.findOne({username})
        if(!loggedInUser)
        {
            return res.status(400).json({message:"Invalid user credentials"})
        }

        const isMatch=await bcrypt.compare(password,loggedInUser.password)

        if(!isMatch)
        {
            return res
              .status(400)
              .json({ message: "Invalid user credentials" });
        }

        req.session.userId=loggedInUser._id;
        console.log("Login session set:", req.session.userId);
        res.status(200).json({ message: "logged in", username });
    }
    catch(err)
    {
        res.status(500).json({ message: "Server error" });
    }
})

//logout
router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.clearCookie('connect.sid')
        res.json({ message: "Logged out" });
    })
})

//get current user info
router.get("/me",async(req,res)=>{
    if(!req.session.userId)
    {
        return res.status(401).json({ message: "Not logged in" });
    }
    try{
        const user=await User.findById(req.session.userId).select('username')
        res.json({username:user.username})
    }
    catch(err)
    {
        res.status(500).json({ message: "Error retrieving user" });
    }
})

module.exports=router