import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const url=import.meta.env.VITE_URL

const AcceptedOrder = () => {

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
            const inOrder=data.filter(item=>(item.statusNumber!=1&& item.statusNumber<8))
            inOrder.map((e,index)=>{
              if(e.statusNumber>=3){
                setFoodPrepared(true)
              }
              if(e.statusNumber==4){
                setOrderReady(true)
              }
            })
            setOrders(inOrder)
            console.log(inOrder)
        }) 
           
        },[])

       useEffect(()=>{
         const interval= setInterval(() => {
            if(orders.some((order) => order.statusNumber <= 6)){
                fetch(`${url}/rest/orders`,{
            method:"GET",
            headers:{
              token:sessionStorage.getItem("token")
            }
          }).then((response)=>response.json()).then((data)=>{
            const inOrder=data.filter(item=>(item.statusNumber!=1&& item.statusNumber<8))
            setOrders(inOrder)
            console.log(inOrder)
        }) 
            }
          }, 5000);

          return () => clearInterval(interval);
       },[orders])



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
              <div className='flex justify-center flex-wrap gap-2'>
                <div className='w-full flex justify-center'>
                    <button 
              className='p-2 bg-blue-500 rounded-2xl border'
              onClick={()=>{
                setFoodPrepared(true)
                fetch(`${url}/rest/updateOrder`,{
                        method:"POST",
                        headers:{
                          token:sessionStorage.getItem("token"),
                          status:3,
                          orderid:e._id
                        }
                      }).then((response)=>response.json()).then((data)=>{
                        if(data){
                            toast.success(data.message)
                        }else{
                            toast.error(data.message)
                        }
                    })
            }}
              >Start Preparing order</button>
                </div>

              {
               foodPrepared==true&& <div className='flex flex-wrap justify-center w-full'>
                <span className='font-bold text-2xl w-full flex justify-center'>🡣</span>
                <button 
              className='p-2 bg-purple-500 rounded-2xl border '
              onClick={()=>{
                setOrderReady(true)
                fetch(`${url}/rest/updateOrder`,{
                        method:"POST",
                        headers:{
                          token:sessionStorage.getItem("token"),
                          status:4,
                          orderid:e._id
                        }
                      }).then((response)=>response.json()).then((data)=>{
                        if(data){
                            toast.success(data.message)
                        }else{
                            toast.error(data.message)
                        }
                    })
            }}
              > order Ready</button>
               </div>
              }

              {
               orderReady==true&& <div className='flex flex-wrap justify-center w-full'>
                <span className='font-bold text-2xl w-full flex justify-center'>🡣</span>
                <span className='font-bold  w-full flex justify-center'>Waiting for Rider to Pick order</span>
                {/* <button 
              className='p-2 bg-green-400 rounded-2xl border '
              onClick={()=>{}}
              > Packed and Handed Over to Rider</button> */}
               </div>
              }

              {
                 e.statusNumber>=6  && <div>
                    <span className='font-bold text-2xl w-full flex justify-center'>🡣</span>
                    <span>Order Completed</span>
                </div>
              }
              
              </div>
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

export default AcceptedOrder