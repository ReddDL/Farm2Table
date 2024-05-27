import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrderCard = ({ order }) => {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/view/${order.productId}`);
        setProductData(res.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
    fetchProduct();
  }, [order.productId]);

  const confirmOrder = async (orderid) => {
    try { 
      const res = await axios.patch(`http://localhost:3000/api/admin/orders/confirm/${orderid}`);
      console.log('Order confirmed:', res);
      window.location.reload();
    } catch (error) {
      console.error("Couldn't confirm order:", error.response.data);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className='h-32 w-full bg-white flex items-center justify-between rounded-xl border-solid border border-gunmetal'>
      <div className='flex items-center'>
        <div className='h-28 w-28 ml-2  rounded-2xl'>
          {productData && (
            <img src={productData.image} alt={productData.name} className='h-full w-full object-cover rounded-2xl' />
          )}
        </div>
        <div className='pl-3'>
          <h1 className='poppins-medium text-xl'>Order ID: {order._id}</h1>
          <p className='poppins-regular'>Quantity: {order.quantity}</p>
          <p className='poppins-regular'>Total Price: {order.totalPrice}</p>
          <p className='poppins-regular'>Email: {order.email}</p>
          <p className='poppins-regular'>Date Ordered: {formatDate(order.dateOrdered)}</p>
        </div>
      </div>
      <button className='bg-midnight-green px-5 py-4 rounded-xl mr-2 text-white w-40' onClick={() => confirmOrder(order._id)}>Confirm Order</button>
    </div>
  );
};

export default AdminOrderCard;
