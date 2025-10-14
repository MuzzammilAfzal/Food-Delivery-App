import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Layout from './Components/Layout/Layout';


function App() {
  

  return (
    <>
     <BrowserRouter>
       <Routes>
        <Route path={"/"} element={<Layout/>}>
             <Route path={"/rest/auth/login"} element={<Login/>}/>
        </Route>
       </Routes>
     </BrowserRouter>
      
    </>
  )
}

export default App
