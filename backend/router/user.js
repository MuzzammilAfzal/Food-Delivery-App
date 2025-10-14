const express =require("express")
const jwt =require("jsonwebtoken")
const router=express.Router()
const {restaurant,user,order}=require('../db/db')
const { authJwt } = require("../auth/auth")


router.get('/', async(req, res) => {
    res.send("u dont get anything")
})

router.post('/auth/login',async(req,res)=>{
    const {email,password} = req.body
 const User= await user.findOne({email,password})
 if (User){
    const token = jwt.sign({email,password},process.env.SECERT_KEY,{expiresIn:"1h"})
    res.status(200).json({message:"admin success",token})
 }
 else{
    res.status(400).json({message:"admin not found"})
 } 
})

router.post('/auth/signup',async(req,res)=>{
 const {fullName,phoneNo,email,password,deliveryAddress} = req.body
 const User= await user.findOne({$or: [{ phoneNo }, { email }]})
 if (User){
    res.status(400).json({message:"User already exists"})
 }
 else{
    const newUser= await user.create({fullName,phoneNo,email,password,deliveryAddress})
    const token=  jwt.sign({email,password},process.env.SECERT_KEY,{expiresIn:"1h"})
    if(newUser && token){
       res.status(200).json({message: "user Created successfully ",token}) 
    }
 }
})

router.get('/restaurant/allRestaurant', async(req, res) => {
    const allRestaurant=await restaurant.find({})
    res.status(200).send(allRestaurant)
})

router.get('/restaurant/specificRestaurant', async(req, res) => {
    const _id=req.headers._id
    const specificRestaurant=await restaurant.findById(_id)
    res.status(200).send(specificRestaurant)
})

router.post('/confirmOrder',authJwt,async(req,res)=>{
    const body= await req.body

    try {
       const newOrder= await order.create({statusNumber:1,user_email:req.user.email,restaurant:req.body.restaurant,order:req.body.order,rider:0})
       console.log(newOrder._id)
    if(newOrder){
       res.status(200).send({"Message":"Order Confirmed",
        "newOrder":`${newOrder._id}`})
    } 
    } catch (error) {
        res.status(404).send(error)
    }
    
    
})



module.exports=router