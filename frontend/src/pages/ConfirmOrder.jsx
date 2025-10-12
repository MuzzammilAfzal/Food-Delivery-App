import React from 'react'
import { useState } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const url=import.meta.env.VITE_URL

const ConfirmOrder = () => {
    const location=useLocation()

    const [order,setOrder]=useState(location.state.order)
    const [restaurant,setRestaurant]=useState(location.state.restaurant)
    const [foodList,setFoodList]=useState(location.state.restaurant.food)
    const [confirmOrder,setConfirmOrder]=useState({order,restaurant})
   
    const navigate=useNavigate()

    const OrderList=()=>{
    const foodOrderName = Object.keys(order).map(key =>
    foodList.find(item => item._id === key) ) ; 
     const MatchQuantity=({_id})=>{
      for(let key in order){
      if(key===_id){
        return <span>{order[key]}</span>
      }
     }}
    return <div>
    {
        foodOrderName?.map((e,index)=>{
            return  <div key={index} className='border-1 bg-gray-300 rounded-2xl flex'>
        <span className='font-semibold w-[50%] flex justify-center'>{e.foodName}</span>
        <span>|</span>
        <span className='font-semibold w-[50%] flex justify-center'><MatchQuantity _id={e._id}/></span>
       </div>
        })
    }
    </div>
    }

    const handleOrder=()=>{
      if(localStorage.getItem("token")){
         fetch(`${url}/confirmOrder`,{
        method:"POST",
        headers:{
          token:localStorage.getItem("token"),
          "Content-Type": "application/json" 
        },
        body:JSON.stringify(confirmOrder)
      }).then((response)=>response.json()).then((data)=>{console.log(data),
        toast.success(data.Message),
        navigate(`/trackOrder?${data.newOrder}`,{replace:true})})
      }else{
        navigate('/auth/login')
        toast.error("login First")
      }
      
    }

  return (
    <div className='flex justify-center'>
        <div className='py-2'>
            <span className='w-screen md:w-[50vw] bg-amber-300 flex justify-center p-2 rounded-2xl font-semibold'>Your Order</span>
            <OrderList/>
            <div className='flex justify-center p-2'>
              <button className='bg-green-400 font-bold rounded-2xl p-2'
              onClick={handleOrder}
              >Confirm Order</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmOrder