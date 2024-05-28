import React, {useState, useEffect} from 'react'
import axios from 'axios';

const AdminOrderCardDash = ({ order }) => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  return (
    <div className='h-fit w-full bg-alabaster flex flex-col md:flex-row items-center justify-between rounded-xl border-solid border border-gunmetal shadow-lg p-5 my-1 max-w-7xl mx-auto'>
      {/* Order details */}
      <div className='flex flex-col md:flex-row items-center'>
        <div className='h-28 w-28 bg-periwinkle rounded-xl flex items-center justify-center'>
          {/* Placeholder for product image */}
          { productData &&
            <img src={productData.image} alt={productData.name} className='h-full w-full object-cover rounded-xl' />
          }
        </div>
        <div className='pl-3'>
          <h1 className='poppins-medium text-xl'>Order ID: {order._id}</h1>
          <p className='poppins-regular'>Quantity: {order.quantity}</p>
          <p className='poppins-regular'>Total Price: ${order.totalPrice}</p>
          <p className='poppins-regular'>Date Ordered: {formatDate(order.dateOrdered)}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderCardDash
