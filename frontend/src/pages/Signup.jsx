import React from 'react'
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url=import.meta.env.VITE_URL


const Signup = () => {
  const navigate=useNavigate()
    const [user, setUser] = useState({ fullName: "",email:"",phoneNo:"", password: "" ,deliveryAddress:"",myCart:[],myOrders:[]});

  const handleChange = (e) => {
  setUser({ ...user, [e.target.name]: e.target.value });
  console.log(user);
  
  };


  const handleSubmit = async(e) => {
    e.preventDefault()
     const response = await fetch(`${url}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    });
    const data = await response.json();
    if(data.token){
        localStorage.setItem("token",data.token)
        navigate('/',{replace:true})
        location.reload()
        toast.success("User Created Successfully")
        
    }else{
        if(!response.ok){
            toast.error("user already exists")
        }else{
           toast.error("error")
        }

    }
  };

     return (
    <div className="flex flex-wrap gap-12 justify-center items-center min-h-screen bg-orange-200">
  <form
    method="POST"
    onSubmit={handleSubmit}
    className="p-6 bg-white shadow-md rounded-lg w-96"
  >
    <h2 className="text-center text-xl font-semibold mb-4">User SignUp</h2>

    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700">Full Name</label>
      <input
        type="text"
        name="fullName"
        onChange={handleChange}
        required
        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>

    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700">
        Phone Number (without +91)
      </label>
      <input
        type="number"
        name="phoneNo"
        maxLength={10}
        onChange={handleChange}
        required
        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>

    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        required
        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>

    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700">Password</label>
      <input
        type="password"
        name="password"
        onChange={handleChange}
        required
        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
      <input
        type="text"
        name="deliveryAddress"
        onChange={handleChange}
        required
        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>

    <button
      type="submit"
      className="w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
    >
      SignUp
    </button>

    <div className="flex flex-col items-center mt-10">
    <label className="mb-2 text-gray-700">Already have an account?</label>
    <button
      type="button"
      className="w-40 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
      onClick={() => {
        navigate("/auth/login", { replace: true });
      }}
    >
      Login
    </button>
  </div>
  </form>

  
</div>
  )
}

export default Signup