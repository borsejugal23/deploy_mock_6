const express=require("express");
const { userModel } = require("../model/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config()

const userRouter=express.Router();


userRouter.post("/register", async (req, res) => {
    const { Email, Username, Avatar, Password } = req.body;

    try {
        let existUser = await userModel.findOne({ Email }); 

        if (existUser) {
            return res.status(200).json({ msg: "User is already registered, please login" });
        }

        bcrypt.hash(Password, 10, async (err, hash) => { 
            if (err) {
                return res.status(400).json({ msg: err.message });
            } else {
                try {
                    const newUser = new userModel({ Username, Avatar, Email, Password: hash });
                    await newUser.save();
                    return res.status(200).json({ msg: "Registered successfully, please login" });
                } catch (error) {
                    return res.status(500).json({ err: error.message });
                }
            }
        });
    } catch (error) {
        return res.status(500).json({ err: error.message });
    }
});



userRouter.post("/login",async(req,res)=>{
        try {
            const {Email,Password}=req.body;
            const existinguser= await userModel.findOne({Email});
            if (!existinguser){
            
                return res.status(404).json({msg:"user not found,please create account"})
            }
            bcrypt.compare(Password,existinguser.Password,async(err,result)=>{
                if (result){
                    const token=jwt.sign({userID:existinguser._id,username:existinguser.Username},process.env.secretKey);
                    return res.status(200).json({msg:"login successful",token:token})

                }
                else{
                    return res.status(400).json({msg:"login failed"})
                }
            })
        
        } catch (error) {
        res.status(500).json({error:error.message})
        }
    })

module.exports={userRouter}