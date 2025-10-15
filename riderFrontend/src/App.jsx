import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Layout from './Components/Layout/Layout';
import Login from './Pages/Login';
import AvailableRide from './Pages/AvailableRide';
import CurrentRide from './Pages/CurrentRide';

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<Layout/>}>
            <Route path={"/rider/auth/login"} element={<Login/>}/>
            <Route path={"/rider"} element={<Home/>}/>
            <Route path={"/rider/availableRides"} element={<AvailableRide/>}/>
            <Route path={"/rider/currentRide"} element={<CurrentRide/>}/>
         </Route>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
