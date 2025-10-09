import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {

    const Login=()=>{
        if(localStorage.getItem("token")){
            return <div className=''>
                <button 
                  className='text-white bg-red-700 rounded-2xl p-2 font-semibold hover:bg-gray-400'
                  onClick={()=>{
                    localStorage.removeItem("token")
                    location.reload()
                  }}
                >Logout</button>
            </div>
        }else{return <Link to={"/auth/login"}>
                <button
                 className='text-black bg-white rounded-2xl p-2 font-semibold hover:bg-gray-400'
                >Login</button>
            </Link>  
        }
    }

  return (
    <nav>
    <div className='bg-orange-500 rounded-2xl p-2 md:p-6 flex justify-around'>
      <div className='font-bold text-2xl text-white md:mx-50'>
        Food Delivery
      </div>
      <Login/>
       
    </div>
    </nav>
  )
}

export default Navbar