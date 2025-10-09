const express = require('express')
const { default: mongoose } = require('mongoose')
const {restaurant}=require("./db/db")
const cors=require('cors')
const userRouter=require("./router/user")
const app = express()
const port = 3000
require('dotenv').config();

app.use(cors({origin:"*",
    methods:["GET","POST","PUT","DELETE"],credentials:true
}))



app.use("/",userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongoose.connect(process.env.MONGODB_URL,{dbName:"foodDeliveryApp"})