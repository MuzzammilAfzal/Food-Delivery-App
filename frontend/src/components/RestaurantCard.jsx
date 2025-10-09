import React from 'react'

const RestaurantCard = ({image,refName,area,rating}) => {

  return (
    <div className='bg-gray-300 flex flex-wrap w-[90vw] md:w-[20vw]  rounded-2xl'>
        <div>
            <img src={image} alt="" 
            className='w-[90vw] md:w-[20vw] rounded-t-2xl'
            />
        </div>
        <div className='px-2 py-4'>
            <span className=' text-lg font-semibold'>{refName}</span>
            <div>
                <span className=' text-md font-light'>{area}</span>
            </div>
            <div className='py-2'>
                <span className='font-light'>Rating:</span>
                <span className='text-white bg-green-600 p-2'>★{rating}.0</span>
            </div>
        </div>
    </div>
  )
}

export default RestaurantCard