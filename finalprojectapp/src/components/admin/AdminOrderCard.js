import React from 'react'

const AdminOrderCard = ({ order }) => {
  const renderButton = () => {
    switch (order.status) {
      case 0:
        return <button className='bg-midnight-green px-5 py-4 rounded-xl mr-2 text-white w-40'>Confirm Order</button>;
      case 1:
        return <button className='bg-midnight-green px-5 py-4 rounded-xl mr-2 text-white w-40'>Ship Order</button>;
      case 2:
        return <button className='bg-midnight-green px-5 py-4 rounded-xl mr-2 text-white w-40' disabled>Order Shipped</button>;
      default:
        return null;
    }
  };

  return (
    <div className='h-32 w-full bg-white flex items-center justify-between rounded-xl border-solid border border-gunmetal'>
      {/* image */}
      <div className='flex items-center'>
        <div className='h-28 w-28 ml-2 bg-periwinkle rounded-xl'></div>
        <div className='pl-3'>
          <h1 className='poppins-medium text-xl'>Order ID: {order.productId}</h1>
          <p className='poppins-regular'>Quantity: {order.quantity}</p>
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
