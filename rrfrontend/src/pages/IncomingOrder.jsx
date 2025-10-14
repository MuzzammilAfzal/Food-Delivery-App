import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const url= import.meta.env.VITE_URL

const IncomingOrder = () => {

    const [incomingOrder,setIncomingOrder]=useState([])

    const navigate=useNavigate()
    
    useEffect(()=>{
     const intervalId=setInterval(() => {
        fetch(`${url}/rest/orders`,{
        method:"GET",
        headers:{
          token:sessionStorage.getItem("token")
        }
      }).then((response)=>response.json()).then((data)=>{
        const inOrder=data.filter(item=>item.statusNumber===1)
        setIncomingOrder(inOrder)
        console.log(inOrder)
    }) 
     }, 10000);

     return ()=> clearInterval(intervalId)
    },[])

    useEffect(()=>{
        fetch(`${url}/rest/orders`,{
        method:"GET",
        headers:{
          token:sessionStorage.getItem("token")
        }
      }).then((response)=>response.json()).then((data)=>{
        const inOrder=data.filter(item=>item.statusNumber===1)
        setIncomingOrder(inOrder)
        console.log(inOrder)
    }) 
       
    },[])


    const Displayfood=({order,food})=>{
        const MatchQuantity=({_id})=>{
      for(let key in order){
      if(key===_id){
        return <span>{order[key]}</span>
      }
     }}
      const foodOrderName = Object.keys(order).map(key =>
       food.find(item => item._id === key) ) 
        return <div>
             <div className='flex bg-red-400 rounded-2xl'>
                <span className='w-[50vw] flex justify-center'>FoodName </span>
                <span>|</span>
                <span className='flex justify-center w-[50vw]'>Quantity</span>
             </div>
            {
                foodOrderName?.map((a,index)=>{
                return <div key={index} className='flex bg-gray-500 rounded-2xl'>
                    <div className='w-[50vw] flex justify-center'>
                        <span>{a.foodName}</span>
                    </div>
                    <span>|</span>
                    <div className='w-[50vw] flex justify-center'>
                        <span><MatchQuantity _id={a._id}/></span>
                    </div>       
                </div>

            })
            }
        </div>

    }

    const acceptOrder=(_id)=>{
        fetch(`${url}/rest/acceptOrder`,{
        method:"POST",
        headers:{
          token:sessionStorage.getItem("token"),
          accept:true,
          orderid:_id
        }
      }).then((response)=>response.json()).then((data)=>{
        if(data){
            location.reload()
            toast.success(data.message)
        }else{
            toast.error(data.message)
        }
    })

    }



 if(sessionStorage.getItem("token")){
     return (
    <div className='p-2 flex flex-wrap gap-2 justify-center'>
       {incomingOrder?.map((e,index)=>{
        if(incomingOrder.length!=0){
          return <div key={index} className='overflow-y-auto flex flex-col-reverse '>
           <div className='bg-blue-300 p-2 rounded-2xl font-medium md:w-[50vw]'>
            <span>Order Id : {e._id}</span>
            <div>
                <span>status:{e.statusNumber}</span>
               <Displayfood order={e.order} food={e.restaurant.food}/>
            </div>
            <button 
            className='p-2 bg-green-400 rounded-2xl border'
            onClick={()=>{acceptOrder(e._id)}}
            >Accept</button>
           </div>
        </div>
        }
       })}
       {
        incomingOrder.length==0 && <span className='p-2 font-extrabold  flex justify-center'>No Orders!!!</span>
       }
    </div>
  )
 }else{
    useEffect(()=>{
        navigate("/rest/auth/login",{replace:true})
    },[])
 }
  
}

export default IncomingOrder