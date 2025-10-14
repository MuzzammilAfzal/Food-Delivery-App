import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const url=import.meta.env.VITE_URL

const CompletedOrder = () => {

    const [orders,setOrders]=useState([])
    const [orderReady,setOrderReady]=useState(false)
    const[foodPrepared,setFoodPrepared]=useState(false)

        useEffect(()=>{
            fetch(`${url}/rest/orders`,{
            method:"GET",
            headers:{
              token:sessionStorage.getItem("token")
            }
          }).then((response)=>response.json()).then((data)=>{
            const inOrder=data.filter(item=>( item.statusNumber==8))
            setOrders(inOrder)
            console.log(inOrder)
        }) 
           
        },[])



    const Displayfood=({order,food})=>{
        const MatchQuantity=({_id})=>{
      for(let key in order){
      if(key===_id){
        return <span>{order[key]}</span>
      }
     }}
      const foodOrderName = Object.keys(order).map(key =>
       food.find(item => item._id === key) ) 
        return <div>
             <div className='flex bg-red-400 rounded-2xl'>
                <span className='w-[50vw] flex justify-center'>FoodName </span>
                <span>|</span>
                <span className='flex justify-center w-[50vw]'>Quantity</span>
             </div>
            {
                foodOrderName?.map((a,index)=>{
                return <div key={index} className='flex bg-gray-500 rounded-2xl'>
                    <div className='w-[50vw] flex justify-center'>
                        <span>{a.foodName}</span>
                    </div>
                    <span>|</span>
                    <div className='w-[50vw] flex justify-center'>
                        <span><MatchQuantity _id={a._id}/></span>
                    </div>       
                </div>

            })
            }
        </div>

    }


   if(sessionStorage.getItem("token")){
       return (
      <div className='p-2 flex flex-wrap gap-2 justify-center'>
         {orders?.map((e,index)=>{
          if(orders.length!=0){
            return <div key={index} className='overflow-y-auto flex flex-col-reverse '>
             <div className='bg-blue-300 p-2 rounded-2xl font-medium md:w-[50vw]'>
              <span>Order Id : {e._id}</span>
              <div>
                  <span>status:{e.statusNumber}</span>
                 <Displayfood order={e.order} food={e.restaurant.food}/>
                  <span className='font-bold flex justify-center'>Order Completed</span>
            </div>
              
              </div>
             </div>
          
          }
         })}
         {
          orders.length==0 && <span className='p-2 font-extrabold  flex justify-center'>No Orders!!!</span>
         }
      </div>
    )
   }else{
      useEffect(()=>{
          navigate("/rest/auth/login",{replace:true})
      },[])
   }
}

export default CompletedOrder