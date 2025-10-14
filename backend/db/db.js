const mongoose=require("mongoose")


const foodSchema=new mongoose.Schema({
    foodName:String,
    price:Number,
    description:String,
    image:String
})


const restaurantSchema= new mongoose.Schema({
    refName : String,
    password:String,
    phoneNo:Number,
    rating:Number,
    address:String,
    area:String,
    food:[foodSchema],
    image:String

})

const userSchema= new mongoose.Schema({
    phoneNo : {type:Number ,required:true},
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    deliveryAddress:{type:String,required:true},
})


const orderSchema=new mongoose.Schema({
    statusNumber:Number,
    user_email:String,
    restaurant:Object,
    order:Object,
    rider:String,
})


const user = mongoose.model("user",userSchema)
const restaurant=mongoose.model("restaurant",restaurantSchema)
const order=mongoose.model("order",orderSchema)


module.exports={
    restaurant,
    user,
    order
}