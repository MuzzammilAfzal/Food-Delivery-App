import React, { useState } from 'react'
import { useEffect } from 'react'

const FoodCard = ({food_id,foodName,price,description,image,onOrderChange}) => {

    const [quantity,setQuantity]=useState(0)

    useEffect(()=>{
      if(quantity<0){
          setQuantity(0)
         }
    },[quantity])
    

  return (
    <div className='w-screen md:w-[50vw] bg-gray-300 hover:shadow-2xl p-2 rounded-xl flex justify-between'>
        <div className='px-2'>
            <span className='font-bold text-lg block'>{foodName}</span>
            <span className='text-lg font-semibold block'>₹{price}</span>
            <div className='max-w-[60vw]'>
            <span
             className=''
            > {description}</span>
            </div>
        </div>
        <div className='w-[35vw] md:w-auto'>
           <img src={image} alt=""
           className='w-[35vw] md:w-[20vw] rounded-2xl'
           />
           <div className='flex justify-center'>
            <button 
            className='bg-red-500 rounded-md px-2 py-0 text-2xl font-bold'
            onClick={()=>{
                setQuantity(quantity-1)
                if(quantity<0){
                    setQuantity(0)
                }
                onOrderChange(food_id,quantity)
            }}
            >-</button>
            <span className='border-1 border-red-500 text-lg font-bold'>{quantity}</span>
            <button
            className='bg-red-500 rounded-md px-2 text-2xl font-bold'
            onClick={()=>{
                setQuantity(quantity+1)
                onOrderChange(food_id,quantity)
            }}
            >+</button>
           </div>
        </div>
    </div>
  )
}

export default FoodCard