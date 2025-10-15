import React,{useEffect,useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


const TrackOrder = () => {
    const navigate=useNavigate()
    const uselocation=useLocation()
    const query=uselocation.search
    const orderid=query.replace("?","")
    localStorage.setItem("order",orderid)
    const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");


     useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/confirmOrder"); 
    setSocket(ws);


    ws.onmessage = (event) =>{ 
        setMessage(event.data);
        console.log(event.data)
        console.log(message)
        if(message=="8"){
            ws.close(1000, "Order delivered - connection closed")
        }
    }
    ws.onclose = () => console.log("🔴 WS Disconnected");
    ws.onopen=()=>{
    console.log("🟢 WS Connected")
      ws.send(orderid)
    }

    return () => ws.close() 
  }, []);

  const UpdateBlock=({text})=>{
    return <div className='flex flex-wrap justify-center'>
        <div className='   font-extrabold p-2'>
            |
        </div>
         <div className='flex w-screen justify-center'>
             <div className='bg-green-600 text-white  w-fit font-extrabold px-2 py-1 rounded-full'>
            ✓
        </div>
        <div className='font-bold px-2'>
            {text}
        </div>
         </div>
    </div>
  }

  const WaitBlock=({waitText})=>{
    return <div className='flex flex-wrap justify-center'>
         <div className=' font-extrabold p-2 text-3xl'>
            🡣
        </div>
        <div  className='flex w-screen justify-center'>
            <div className=" w-fit ">
            <img src={"/images/loading.gif"} alt="" className='w-[15vw] md:w-[5vw]' />
        </div>
        <div className='font-bold px-2 flex items-center'>
            {waitText}
        </div>
        </div>
    </div>
  }
    
// const RenderUpdate=()=>{
//     if(message)
//     return(
       
//     )
// }


 if(localStorage.getItem("token")){
    if(localStorage.getItem("order")){
        if(message==8){
            localStorage.removeItem("order")
        }
    }
    return (
        <div className='bg-orange-200 rounded-2xl'>
            <span className='font-bold text-2xl text-center bg-green-400  rounded-t-2xl   w-screen my-2 flex justify-center p-2 '>Track Order</span>
             <div className='flex flex-wrap justify-center items-center'>
                  <div className='bg-green-600 text-white  w-fit font-extrabold px-2 py-1 rounded-full'>
                   ✓
                  </div>
                  <div className='font-bold'>
                  Order Sent to Restaurant
                 </div>
            </div>
            <div className=''>
             {
               message>=2 && <UpdateBlock text={"Restaurant Accepted Order"}/> 
             }
              {
               message>=3 && <UpdateBlock text={"Restaurant started Preparing Order"}/> 
             }
             {
               message>=4 && <UpdateBlock text={"Your Order is Ready at Restaurant and Waiting for Delivery Boy"}/> 
             }
             {
               message>=5 && <UpdateBlock text={"Delivery Boy Accepted Ride and on the Way to Restaurant"}/> 
             }
             {
               message>=6 && <UpdateBlock text={"Delivery Boy at the Restaurant"}/> 
             }
            {
               message>=7 && <UpdateBlock text={"Delivery Boy took Order and Is on the Way"}/> 
             }
             {
               message==8 && <UpdateBlock text={"Order is at Your Door"}/> 
             }

             {
                message!=8 && <WaitBlock waitText={"Waiting For Updates "} /> 
             }
            </div>
            <div className='flex justify-center'>
                <button onClick={()=>{
                  console.log("hi")
                  navigate("/",{replace:true})
                 location.reload()
                }}
                 className='text-center font-bold mx-20 bg-amber-300 rounded-2xl p-2'>Go to Home Page</button>
            </div>
        </div>
    
    )
 }else{
    navigate("/",{replace:true})
 }
}

export default TrackOrder