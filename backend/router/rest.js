const express =require("express")
const jwt =require("jsonwebtoken")
const router=express.Router()
const {restaurant,user,order}=require('../db/db')
const { authJwt } = require("../auth/auth")


router.post('/auth/login',async(req,res)=>{
    const {_id,password} = req.body
 const User= await restaurant.findOne({_id,password})
 if (User){
    const token = jwt.sign({_id,password},process.env.SECERT_KEY,{expiresIn:"1h"})
    res.status(200).json({message:" success",token})
 }
 else{
    res.status(400).json({message:"error"})
 } 
})







module.exports=router