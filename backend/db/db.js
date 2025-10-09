const mongoose=require("mongoose")


const foodSchema=new mongoose.Schema({
    foodName:String,
    price:Number,
    description:String,
    image:String
})


const restaurantSchema= new mongoose.Schema({
    refName : String,
    phoneNo:Number,
    rating:Number,
    address:String,
    area:String,
    food:[foodSchema],
    image:String

})



const restaurant=mongoose.model("restaurant",restaurantSchema)


module.exports={
    restaurant
}