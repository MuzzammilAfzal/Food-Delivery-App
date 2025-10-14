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

router.get('/orders',authJwt,async(req,res)=>{
    const rest=req.user
    const findOrders = await order.find({"restaurant._id":rest._id})
    if(findOrders){
       res.status(200).send(findOrders)
    }else{
        res.status(404).json({message:"error"})
    }
})

router.post('/acceptOrder',authJwt,async(req,res)=>{
   const accept=req.headers.accept
   const orderid=req.headers.orderid
   if(accept&& orderid){
      const orderUpdate=await order.findById(orderid)
      if(!orderUpdate){
        res.status(404).json({message:"error"})
      }
      orderUpdate.statusNumber=2
      if(orderUpdate.statusNumber==2){
       await orderUpdate.save()
       res.status(200).json({message:"order accepted.."})
      }else{
         res.status(404).json({message:"error"})
      }
   }else{
     res.status(404).json({message:"error"})
   }
})

router.post('/updateOrder',authJwt,async(req,res)=>{
   const status=req.headers.status
   const orderid=req.headers.orderid
   if(status&& orderid){
      const orderUpdate=await order.findById(orderid)
      if(!orderUpdate){
        res.status(404).json({message:"error"})
      }
      orderUpdate.statusNumber=status
      await orderUpdate.save()
       res.status(200).json({message:"Updated"})
      
   }else{
     res.status(404).json({message:"error"})
   }
})







module.exports=router