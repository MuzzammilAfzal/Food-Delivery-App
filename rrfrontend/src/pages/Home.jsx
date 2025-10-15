import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
     <div className='p-4 flex flex-wrap justify-center gap-2'>
        <Link to={'/rest/incomingOrder'}>
           <div className='bg-purple-500 rounded-2xl font-extrabold text-md text-white p-10 w-screen md:w-[50vw] '>
            Incoming Request of Order 🢂
            </div>
        </Link>
        <Link to={'/rest/acceptedOrder'}>
           <div className='bg-green-500 rounded-2xl font-extrabold text-md text-white p-10 w-screen md:w-[50vw] '>
            Accepted Orders 🢂
            </div>
        </Link>
       {/* <Link to={'/rest/completedOrder'}>
            <div className='bg-orange-500 rounded-2xl font-extrabold text-md text-white p-10 w-screen md:w-[50vw] '>
            Completed Orders 🢂
            </div>
       </Link> */}
      </div>
    </>
  )
}

export default Home