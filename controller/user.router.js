const express = require("express");
const bcrypt= require("bcrypt");
const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken")
require("dotenv").config()


const userRouter = express.Router();

//user register
userRouter.post("/api/register",async (req,res)=>{
    try {
        const {name, email,password,address} = req.body;
        if(!name || !email || !password || !address){
            return res.status(404).send({"msg":"please provide all fields"});
        }

        const hashPassword= await bcrypt.hash(password,+process.env.saltRound)
        await new userModel({name,email,password:hashPassword}).save()
        res.status(201).send({"msg":"new user has been registered successfully"})
    } catch (error) {
        res.status(400).send({ error: error.message })
        console.log(error)
    }
})

userRouter.post("/api/login",async (req,res)=>{
    const { email, password } = req.body
    try {
        if(!email || !password){
            return res.status(404).send({"msg":"please provide all fields"});
        }

        const user = await userModel.findOne({ email })
        if (user) {
          const passMatch = await bcrypt.compare(password, user.password);
          if (passMatch) {
            const token = await jwt.sign({ userId: user._id }, process.env.secretKey,{expiresIn:'24h'})
            res.status(200).send({ "msg": "login successful", "token": token })
          } else {
            res.status(400).send({ "msg": "wrong credential" })
          }
        }else {
          res.status(401).send({"msg":"user not found"})
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})


userRouter.patch("/api/user/:id/reset",async (req,res)=>{
    try {
        const {currPass,newPass} = req.body;
        const id= req.params.id;
        const user = await userModel.findOne({_id:id});
        if(user){
            const passMatch = await bcrypt.compare(currPass,user.password)
            if(passMatch){
                const hashPassword= await bcrypt.hash(newPass,+process.env.saltRound,)
               const passUpdate= await userModel.findByIdAndUpdate({_id:id},{password:hashPassword})
               res.status(204).send({"msg":"password updated successfully","data":passUpdate})
            }else{
               res.status(400).send({ "msg": "wrong credential" })
            }
        }else{
          res.status(401).send({"msg":"user not found"})
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})




module.exports={userRouter}