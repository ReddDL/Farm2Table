import axios from 'axios';
import React from 'react';

const OrderCard = ({ order }) => {
  // Determine button color based on order status
  const buttonClass = order.status === 0
    ? 'bg-gray-400 text-black' // Pending status
    : 'bg-midnight-green text-white'; // Confirmed status

  // function for cancelling order
  async function handleCancelOrder() {
    // if order is just pending/not yet confirmed
    if ( order.status === 0 ) {
      try {
        const res = await axios.put(`http://localhost:3000/api/orders/updateOrder/${order._id}`, {
          orderId: order._id,
          newStatus: 2
        })
      } catch (error) {
        console.log("Server error encounntered while trying to update status")
      }
    }
  }

  return (
    <div className='h-36 w-full bg-white flex items-center justify-between rounded-xl border-solid border border-gunmetal shadow-lg p-5'>
      {/* Order details */}
      <div className='flex items-center'>
        <div className='h-28 w-28 bg-periwinkle rounded-xl flex items-center justify-center'>
          {/* Placeholder for product image */}
          <img src={`path/to/product/image/${order.productId}`} alt="" className='h-full w-full object-cover rounded-xl' />
        </div>
        <div className='pl-3'>
          <h1 className='poppins-medium text-xl'>Order ID: {order.productId}</h1>
          <p className='poppins-regular'>Quantity: {order.quantity}</p>
          <p className='poppins-regular'>Date Ordered: {order.dateOrdered}</p>
        </div>
      </div>
      <button className={`px-5 py-4 rounded-xl w-40 ${buttonClass}`}>
        {order.status === 0 ? 'Pending' : order.status === 1 ? 'Confirmed' : 'Cancelled'}
      </button>
      <button className={`px-5 py-4 rounded-xl w-40 ${buttonClass} ${order.status === 0? "": "hidden"}`} onClick={handleCancelOrder}>
        Cancel Order
      </button>
    </div>
  );
}

export default OrderCard;
