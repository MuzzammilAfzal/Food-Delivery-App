const express =require("express")
const router=express.Router()
const {restaurant}=require('../db/db')

router.get('/', async(req, res) => {
    res.send("u dont get anything")
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



module.exports=router