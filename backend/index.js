const express = require('express')
const { default: mongoose } = require('mongoose')
const {restaurant}=require("./db/db")
const cors=require('cors')
const userRouter=require("./router/user")
const app = express()
const port = 3000

app.use(cors({origin:"*",
    methods:["GET","POST","PUT","DELETE"],credentials:true
}))



app.use("/",userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongoose.connect("mongodb+srv://muzzu2605afzall:9972228752.@clusterafzal.mzc6v.mongodb.net/",{dbName:"foodDeliveryApp"})