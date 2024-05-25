import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const AdminOrderCard = ({ order, updateOrders, key }) => {
  const [status, setStatus] = useState(order.status);

  const renderButton = () => {
    switch (status) {
      case 0:
        return <button className='bg-midnight-green px-5 py-4 rounded-xl mr-2 text-white w-40' onClick={handleConfirmOrder}>Confirm Order</button>;
      case 1:
        return <button className='bg-midnight-green px-5 py-4 rounded-xl mr-2 text-white w-40'>Ship Order</button>;
      case 2:
        return <button className='bg-midnight-green px-5 py-4 rounded-xl mr-2 text-white w-40' disabled>Cancelled by User</button>;
      default:
        return null;
    }
  };

  // function for confirming order
  async function handleConfirmOrder() {
    // if order is still pending
    if ( order.status === 0 ) {
      try {
        const res = await axios.put(`http://localhost:3000/api/orders/updateOrder/${order._id}`, {
          orderId: order._id,
          newStatus: 1
        })

        setStatus(1)
      } catch (error) {
        console.log("Server error encountered while trying to update status")
      }
    }
  }

  // update order's status and orders in admin orders page 
  useEffect(() => {
    order["status"] = status;
    updateOrders(order, key);
  }, [status])

  return (
    <div className='h-32 w-full bg-white flex items-center justify-between rounded-xl border-solid border border-gunmetal'>
      {/* image */}
      <div className='flex items-center'>
        <div className='h-28 w-28 ml-2 bg-periwinkle rounded-xl'></div>
        <div className='pl-3'>
          <h1 className='poppins-medium text-xl'>Order ID: {order._id}</h1>
          {/* <p className='poppins-regular'>Quantity: {order.quantity}</p> */}
          <p className='poppins-regular'>Status: {order.status}</p>
          <p className='poppins-regular'>Email: {order.email}</p>
          <p className='poppins-regular'>Date Ordered: {order.dateOrdered}</p>
        </div>
      </div>
      {renderButton()}
    </div>
  );
};

export default AdminOrderCard
