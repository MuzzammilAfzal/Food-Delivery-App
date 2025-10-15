import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const url=import.meta.env.VITE_URL

const CurrentRide = () => {

    const [ride,setRide]=useState([])
    const [atRestaurant,setAtRestaurant]=useState(false)
    const [onWay,setOnWay]=useState(false)
    

        useEffect(()=>{
            fetch(`${url}/rider/currentRide`,{
            method:"GET",
            headers:{
              token:sessionStorage.getItem("token")
            }
          }).then((response)=>response.json()).then((data)=>{
           data.map((e,index)=>{
              if(e.statusRider>=6){
                setAtRestaurant(true)
              }
              if(e.statusRider==7){
                setOnWay(true)
              }
            })
           setRide(data)
            console.log(data)
        }) 
           
        },[])

    //    useEffect(()=>{
    //      const interval= setInterval(() => {
    //         if(orders.some((order) => order.statusNumber <= 6)){
    //             fetch(`${url}/rest/orders`,{
    //         method:"GET",
    //         headers:{
    //           token:sessionStorage.getItem("token")
    //         }
    //       }).then((response)=>response.json()).then((data)=>{
    //         setOrders(data)
    //         console.log(data)
    //     }) 
    //         }
    //       }, 5000);

    //       return () => clearInterval(interval);
    //    },[orders])



    // const Displayfood=({order,food})=>{
    //     const MatchQuantity=({_id})=>{
    //   for(let key in order){
    //   if(key===_id){
    //     return <span>{order[key]}</span>
    //   }
    //  }}
    //   const foodOrderName = Object.keys(order).map(key =>
    //    food.find(item => item._id === key) ) 
    //     return <div>
    //          <div className='flex bg-red-400 rounded-2xl'>
    //             <span className='w-[50vw] flex justify-center'>FoodName </span>
    //             <span>|</span>
    //             <span className='flex justify-center w-[50vw]'>Quantity</span>
    //          </div>
    //         {
    //             foodOrderName?.map((a,index)=>{
    //             return <div key={index} className='flex bg-gray-500 rounded-2xl'>
    //                 <div className='w-[50vw] flex justify-center'>
    //                     <span>{a.foodName}</span>
    //                 </div>
    //                 <span>|</span>
    //                 <div className='w-[50vw] flex justify-center'>
    //                     <span><MatchQuantity _id={a._id}/></span>
    //                 </div>       
    //             </div>

    //         })
    //         }
    //     </div>

    // }


   if(sessionStorage.getItem("token")){
       return (
      <div className='p-2 flex flex-wrap gap-2 justify-center'>
         {ride?.map((e,index)=>{
          if(ride.length!=0){
            return <div key={index} className='overflow-y-auto flex flex-col-reverse '>
             <div className='bg-blue-300 p-2 rounded-2xl font-medium md:w-[50vw]'>
              <span>Order Id : {e._id}</span>
              <div>
                  <span>status:{e.statusNumber}</span>
                 {/* <Displayfood order={e.order} food={e.restaurant.food}/> */}
                 <br/>
               <span>{e.restaurant.refName}</span>
               <br/>
               <span>{e.restaurant.address}</span>
              <div className='flex justify-center flex-wrap gap-2'>
                <div className='w-full flex justify-center'>
                    <button 
              className='p-2 bg-blue-500 rounded-2xl border'
              onClick={()=>{
                setAtRestaurant(true)
                fetch(`${url}/rider/updateRide`,{
                        method:"POST",
                        headers:{
                          token:sessionStorage.getItem("token"),
                          status:6,
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
              >Arrived At the Restaurant</button>
                </div>
             {
                atRestaurant && <div>
                    <span className='font-bold text-2xl w-full flex justify-center'>🡣</span>
                    <button 
              className='p-2 bg-blue-500 rounded-2xl border'
              onClick={()=>{
                
                if(e.statusNumber<4){
                    toast.error("order is Still not Ready")
                }else{
                    setOnWay(true)
                    fetch(`${url}/rider/updateRide`,{
                        method:"POST",
                        headers:{
                          token:sessionStorage.getItem("token"),
                          status:7,
                          orderid:e._id
                        }
                      }).then((response)=>response.json()).then((data)=>{
                        if(data){
                            toast.success(data.message)
                        }else{
                            toast.error(data.message)
                        }
                    })
                }
            }}
              >Took the order and On the Way to delivery</button>
                </div>
             }

             {
                onWay && <div>
                    <span className='font-bold text-2xl w-full flex justify-center'>🡣</span>
                    <button 
              className='p-2 bg-red-500 rounded-2xl border'
              onClick={()=>{
                setOnWay(true)
                fetch(`${url}/rider/updateRide`,{
                        method:"POST",
                        headers:{
                          token:sessionStorage.getItem("token"),
                          status:8,
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
              >Arrived at the Door and Complete Order</button>
                </div>
             }



              {/* {
                 e.statusNumber>=6  && <div>
                    <span className='font-bold text-2xl w-full flex justify-center'>🡣</span>
                    <span>Order Completed</span>
                </div>
              } */}
              
              </div>
            </div>
              
              </div>
             </div>
          
          }
         })}
         {
          ride.length==0 && <span className='p-2 font-extrabold  flex justify-center'>No ride accepted!!!</span>
         }
      </div>
    )
   }else{
      useEffect(()=>{
          navigate("/rest/auth/login",{replace:true})
      },[])
   }
}

export default CurrentRide