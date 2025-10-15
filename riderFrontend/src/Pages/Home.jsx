import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
     <div className='p-4 flex flex-wrap justify-center gap-2'>
        <Link to={'/rider/availableRides'}>
           <div className='bg-purple-500 rounded-2xl font-extrabold text-md text-white p-10 w-screen md:w-[50vw] '>
            Available Requests 🢂
            </div>
        </Link>
        <Link to={'/rider/currentRide'}>
           <div className='bg-green-500 rounded-2xl font-extrabold text-md text-white p-10 w-screen md:w-[50vw] '>
            Current Ride 🢂
            </div>
        </Link>
      </div>
    </>
  )
}

export default Home