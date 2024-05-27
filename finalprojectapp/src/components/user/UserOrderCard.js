import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrderCard = ({ order, updateOrders, key }) => {
  const [status, setStatus] = useState(order.status);
  const [product, setProductData] = useState({});

  // Fetch product details
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/view/${order.productId}`);
        setProductData(res.data);
      } catch (error) {
        console.log("Error fetching product data");
      }
    }
    fetchProduct();
  }, [order.productId]);

  // Update order's status and orders in user profile
  useEffect(() => {
    order.status = status;
    updateOrders(order, key);
  }, [status, order, key, updateOrders]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  // Handle order cancellation
  async function handleCancelOrder() {
    if (order.status === 0) {
      try {
        const res = await axios.put(`http://localhost:3000/api/orders/updateOrder/${order._id}`, {
          orderId: order._id,
          newStatus: 2
        });
        setStatus(2);
      } catch (error) {
        console.log("Server error encountered while trying to update status");
      }
    }
  }

  return (
    <div className='h-fit w-full bg-alabaster flex flex-col md:flex-row items-center justify-between rounded-xl border-solid border border-gunmetal shadow-lg p-5 my-5'>
      {/* Order details */}
      <div className='flex flex-col md:flex-row items-center'>
        <div className='h-28 w-28 bg-periwinkle rounded-xl flex items-center justify-center'>
          {/* Placeholder for product image */}
          <img src={product.image} alt={product.name} className='h-full w-full object-cover rounded-xl' />
        </div>
        <div className='pl-3'>
          <h1 className='poppins-medium text-xl'>Order ID: {order._id}</h1>
          <p className='poppins-regular'>Quantity: {order.quantity}</p>
          <p className='poppins-regular'>Total Price: ${order.totalPrice}</p>
          <p className='poppins-regular'>Date Ordered: {formatDate(order.dateOrdered)}</p>
        </div>
      </div>
      {status === 0 && (
        <button className='bg-gray-400 text-black px-5 py-4 rounded-xl min-w-40' onClick={handleCancelOrder}>
          Cancel Order
        </button>
      )}
      {status === 1 && (
        <button className='bg-midnight-green text-white px-5 py-4 rounded-xl min-w-40'>
          Confirmed
        </button>
      )}
      {status === 2 && (
        <button className='bg-red-500 text-white px-5 py-4 rounded-xl min-w-40'>
          Cancelled
        </button>
      )}
    </div>
  );
}

export default OrderCard;
