import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Layout from './components/Layout/Layout';
import Restaurant from './pages/Restaurant';
import ConfirmOrder from './pages/ConfirmOrder';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TrackOrder from './pages/trackOrder';


function App() {
  return(
   <BrowserRouter>
       <Routes>
          <Route path={"/"} element={<Layout/>}>
             <Route path={"/"} element={<Home/>}/>
             <Route path={"/restaurant"} element={<Restaurant/>}/>
             <Route path={"/confirmOrder"} element={<ConfirmOrder/>} />
             <Route path={"/trackOrder"} element={<TrackOrder/>} />

             
          
             <Route path={"/auth/login"} element={<Login/>} />
             <Route path={"/auth/signup"} element={<Signup/>} />
          </Route>
       </Routes>
   </BrowserRouter>
  )
  
}

export default App
