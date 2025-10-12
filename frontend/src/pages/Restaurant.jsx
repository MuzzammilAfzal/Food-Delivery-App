import React, { useState } from 'react'
import FoodCard from '../components/FoodCard'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
const url=import.meta.env.VITE_URL


const Restaurant = () => {

    const [order,setOrder]=useState(null)
    const [restaurant,setRestaurant]=useState([])
    const [foodList,setFoodList]=useState([])
    const navigate=useNavigate()

    const location=useLocation()
    const query=location.search
    const id=query.replace("?","")
    

    const handleOrderChange=(food_id,quantity)=>{
         setOrder(prev=>({
            ...prev,[food_id]:quantity
         }))

    }

    useEffect(()=>{
      fetch(`${url}/restaurant/specificRestaurant`,{
        method:"GET",
        headers:{
          _id:id
        }
      }).then((response)=>response.json()).then((data)=>{setRestaurant(data);setFoodList(data.food)})
    },[])

    const PlaceOrderBar=()=>{
      if(order!=null){
        return <div className='w-screen md:w-[50vw] p-2  flex justify-end '>
         <button className='bg-green-400 rounded-2xl p-2 font-semibold'
         onClick={()=>{
          navigate("/confirmOrder",{
            state:{restaurant,order}
          })
        }}
         >Place Order</button>
      </div>
      } 
    }

  

    

  return (
    <div className=''>
       
         <span className='font-bold text-2xl text-center   rounded-t-2xl   w-screen my-2 flex justify-center p-2 '>Menu</span>
         <div className='flex flex-wrap gap-4 p-2 justify-center '>
          {
          foodList?.map((list,index)=>{
          return (<FoodCard key={index} food_id={list._id}
             foodName={list.foodName} price={list.price} description={list.description} image={list.image}
            onOrderChange={handleOrderChange}/>)
        })
         }
         </div>
         <div className='flex justify-center fixed bottom-10 left-0 right-0'>
                <PlaceOrderBar />
         </div>
         
        
        
    </div>
  )
}

export default Restaurant