import React, { useEffect } from 'react'
import AdminOrderCard from '../components/admin/AdminOrderCard'
import axios from 'axios'
import { useState } from 'react'

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  // update orders for re-render
  function updateOrders(order, index) {
    console.log("y", order)
    // placeholder for updating state variable
    const newOrders = [];
    // clone orders array
    orders.forEach((order, index) => {
      newOrders[index] = order
    })
    // assign new order
    newOrders[index] = order;
    console.log("new", newOrders)
    // update state variable
    setOrders(newOrders);
  }

  // fetch all customer's orders
  useEffect(() => {
    async function fetchAllOrders () {
      try{
        const res = await axios.get("http://localhost:3000/api/admin/orders/unconfirmed");
        console.log(res.data);
        setOrders(res.data);
      } catch (error) {
        console.log("Error fetching all orders")
      }
    }
    fetchAllOrders();
  }, [])

  return (
    <div className='bg-eggshell flex flex-col px-8 lg:px-32 md:px-24 sm:px-10 pt-32 text-midnight-green pb-10 min-h-screen'>
      <div className='bg-alabaster p-5 mb-5 rounded-xl mt-4 flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap justify-center gap-10'>
        { orders.length == 0 ? (
          <p className='text-3xl poppins-regular'> No orders yet </p>
        ) : (
            orders.map((order) => (
              <AdminOrderCard key={order._id} order={order} updateOrders={updateOrders}/>
            ))
          )
        }
      </div>
    </div>
  )
}

export default AdminOrders
