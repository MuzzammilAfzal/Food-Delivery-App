import React from 'react'
import RestaurantCard from './RestaurantCard'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
const url=import.meta.env.VITE_URL


const RestaurantDisplay = () => {

  const [listOfRest,setListOfRest]=useState([])

  useEffect(()=>{
        fetch(`${url}/restaurant/allRestaurant`,{
          method:"GET"
        }).then((response)=>response.json()).then((data)=>{setListOfRest(data)})
      
      },[])



      


  return (
    <div>
      <span className='font-bold text-2xl  rounded-t-2xl   w-screen my-3 mx-2 '>Restaurants</span>
        <div className='flex flex-wrap gap-4 justify-center md:justify-normal p-4'>
        
        {
          listOfRest?.map((list,index)=>{
           return <Link to={`/restaurant?${list._id}`} key={index}>
           <RestaurantCard 
            image={list.image} refName={list.refName} area={list.area} rating={list.rating}
            />
           </Link>
          })
        }
        </div>
        
    </div>
  )
}

export default RestaurantDisplay