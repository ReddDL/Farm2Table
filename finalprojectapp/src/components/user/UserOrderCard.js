import { faCheck, faCheckCircle, faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrderCard = ({ order, updateOrders, index }) => {
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
    updateOrders(order, index);
  }, [status]);

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
      {/* Pending / Cancel Order */}
      {status === 0 && (
        <button 
          className='btn btn-error border-none bg-gray-400 text-black hover:text-white px-5 py-4 rounded-xl min-w-40 hover:before:content-["X_Cancel_Order"] before:content-["Pending"]'
          onClick={handleCancelOrder}
        >
        </button>
      )}
      {/* Confirmed */}
      {status === 1 && (
        <button className='btn bg-midnight-green hover:bg-midnight-green no-animation border-none cursor-default text-white px-5 py-4 rounded-xl min-w-40'>
          Confirmed
        </button>
      )}
      {/* Cancelled */}
      {status === 2 && (
        <button className='btn bg-red-500 hover:bg-red-500 no-animation border-none cursor-default text-white px-5 py-4 rounded-xl min-w-40'>
          Cancelled
        </button>
      )}
    </div>
  );
}

export default OrderCard;
