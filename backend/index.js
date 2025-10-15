const express = require('express')
const { default: mongoose } = require('mongoose')
const {restaurant,user,order}=require("./db/db")
const cors=require('cors')
const userRouter=require("./router/user")
const restRouter=require('./router/rest')
const riderRouter=require('./router/rider')
const app = express()
const port = 3000
require('dotenv').config();
app.use(express.json())
const {WebSocketServer}=require("ws")

app.use(cors({origin:["https://rider-food-delivery.vercel.app","https://rest-food-delivery.vercel.app","https://user-food-delivery-app.vercel.app"],
    methods:["GET","POST","PUT","DELETE"],credentials:true
}))



app.use("/",userRouter)
app.use("/rest",restRouter)
app.use('/rider',riderRouter)

const server=app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const wss = new WebSocketServer({server});



wss.on('connection',async (ws) => {
  let orderid
  let status
  let statusRider
  console.log('✅ WS Client connected');
  ws.send('Hello from WS server!');
  ws.on('message', msg =>{
     console.log('Received:', msg.toString())
    orderid=msg.toString()
    })
  const intervalId= setInterval(() => {
    updateStatustoClient(ws,intervalId)
  }, 5000);

  const intervalId2= setInterval(() => {
    updateStatustoClientRider(ws,intervalId2)
  }, 5000);

  const checkStatus=async()=>{
   const orderCheck= await order.findById(orderid)
   if(orderCheck){
    const result=orderCheck.statusNumber
   return result
   } 
}

 const checkStatusRider=async()=>{
   const orderCheck= await order.findById(orderid)
   if(orderCheck){
    const resultRider=orderCheck.statusRider
   return resultRider
   } 
}

const updateStatustoClient=(ws,intervalId)=>{
  checkStatus().then((result)=>{
    if(status==result){
      console.log(status)
      console.log("no Update")
    }else{
      status=result
      console.log(status,"hi")
      ws.send(status)
      if(status==undefined){
       ws.close(1000, "Order delivered - connection closed");
        clearInterval(intervalId)
    }
    }
  })
}

const updateStatustoClientRider=(ws,intervalId2)=>{
  checkStatusRider().then((resultRider)=>{
    if(statusRider==resultRider){
      console.log(status)
      console.log("no Update")
    }else{
      statusRider=resultRider
      console.log(status,"hi")
      ws.send(statusRider)
      if(statusRider==8){
        ws.close(1000, "Order delivered - connection closed");
        clearInterval(intervalId2)
      }
      if(status==undefined){
       ws.close(1000, "Order delivered - connection closed");
        clearInterval(intervalId2)
    }
    }
  })
}
  
 
});
wss.on('close',()=>console.log("WS Disconnected"))




mongoose.connect(process.env.MONGODB_URL,{dbName:"foodDeliveryApp"})
