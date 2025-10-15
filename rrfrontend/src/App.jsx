import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Layout from './Components/Layout/Layout';
import Home from './pages/Home'
import IncomingOrder from './pages/IncomingOrder'
import AcceptedOrder from './pages/AcceptedOrder';
import CompletedOrder from './pages/CompletedOrders';



function App() {
  

  return (
    <>
     <BrowserRouter>
       <Routes>
        <Route path={"/"} element={<Layout/>}>
             <Route path={"/rest/auth/login"} element={<Login/>}/>
             <Route path={"/rest"} element={<Home/>}/>
             <Route path={"/rest/incomingOrder"} element={<IncomingOrder/>}/>
             <Route path={"/rest/acceptedOrder"} element={<AcceptedOrder/>}/>
             <Route path={"/rest/completedOrder"} element={<CompletedOrder/>}/>
        </Route>
       </Routes>
     </BrowserRouter>
      
    </>
  )
}

export default App
