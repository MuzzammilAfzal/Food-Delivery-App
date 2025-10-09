import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Layout from './components/Layout/Layout';
import Restaurant from './pages/Restaurant';


function App() {
  return(
   <BrowserRouter>
       <Routes>
          <Route path={"/"} element={<Layout/>}>
             <Route path={"/"} element={<Home/>}/>
             <Route path={"/restaurant"} element={<Restaurant/>}/>
          
          
          </Route>
       </Routes>
   </BrowserRouter>
  )
  
}

export default App
