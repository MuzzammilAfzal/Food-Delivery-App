import React from 'react'
import { use, useState } from "react";
import {  useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url=import.meta.env.VITE_URL

const Login = () => {
  const navigate=useNavigate()
    const [rest, setRest] = useState({ _id: "", password: "" });

  const handleChange = (e) => {
  setRest({ ...rest, [e.target.name]: e.target.value });
 console.log(rest)
  };


  const handleSubmit = async(e) => {
    e.preventDefault()
     const response = await fetch(`${url}/rest/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rest),
    });
    const data = await response.json();
    if(data.token){
        sessionStorage.setItem("token",data.token)
          navigate('/rest',{replace:true})
          location.reload()
          toast.success("Login Successfully")
        
    }else{
        toast.error("error logging user")
    }
  };

  return (
    <div className="flex justify-center   h-screen bg-orange-200">
  <form
    method="POST"
    onSubmit={handleSubmit}
    className="p-6 bg-white shadow-md rounded-lg w-80 h-fit mt-20"
  >
    <h2 className="text-center text-xl font-semibold mb-4">Restaurant Login</h2>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Restaurant id</label>
      <input
        type="text"
        name="_id"
        onChange={handleChange}
        required
        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Password</label>
      <input
        type="password"
        name="password"
        onChange={handleChange}
        required
        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <button
      type="submit"
      className="w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
    >
      Login
    </button>
   
  </form>
</div>
  )
}

export default Login