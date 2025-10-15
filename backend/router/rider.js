const express =require("express")
const jwt =require("jsonwebtoken")
const router=express.Router()
const {restaurant,user,order,rider}=require('../db/db')
const { authJwt } = require("../auth/auth")



router.post('/auth/login',async(req,res)=>{
    const {_id,password} = req.body
 const Rider= await rider.findOne({_id,password})
 if (Rider){
    const token = jwt.sign({_id,password},process.env.SECERT_KEY,{expiresIn:"1h"})
    res.status(200).json({message:" success",token})
 }
 else{
    res.status(400).json({message:"error"})
 } 
})

router.get('/rides',authJwt,async(req,res)=>{
    const rest=req.user
    const findOrders = await order.find({statusRider:{$lte:4}})
    if(findOrders){
       res.status(200).send(findOrders)
    }else{
        res.status(404).json({message:"error"})
    }
})

router.post('/acceptRide',authJwt,async(req,res)=>{
   const accept=req.headers.accept
   const orderid=req.headers.orderid
   if(accept&& orderid){
      const orderUpdate=await order.findById(orderid)
      if(!orderUpdate){
        res.status(404).json({message:"error"})
      }else{
      orderUpdate.rider=req.user._id
      orderUpdate.statusRider=5
      if(orderUpdate.statusRider==5){
       await orderUpdate.save()
       res.status(200).json({message:"Ride accepted.."})
      }else{
         res.status(404).json({message:"error"})
      }}
   }else{
     res.status(404).json({message:"error"})
   }
})

router.get('/currentRide',authJwt,async(req,res)=>{
   const rider=req.user._id
   const ride= await order.find({"rider":rider})
   if(ride){
      ride.map((e)=>{
         if(e.statusRider!=8){
          console.log(ride)
         res.status(200).json(ride)
      }else{
         res.status(404).json({message:"error"})
      }
      })
     
   }else{
       res.status(404).json({message:"error"})
   }

})

router.post('/updateRide',authJwt,async(req,res)=>{
   const status=req.headers.status
   const orderid=req.headers.orderid
   if(status&& orderid){
      const orderUpdate=await order.findById(orderid)
      if(!orderUpdate){
        res.status(404).json({message:"error"})
      }
      orderUpdate.statusRider=status
      await orderUpdate.save()
       res.status(200).json({message:"Updated"})
      
   }else{
     res.status(404).json({message:"error"})
   }
})





module.exports=router