import React, { useEffect } from 'react'
import AdminOrderCard from '../components/admin/AdminOrderCard'

const AdminOrders = () => {
  const dummyOrders = [
    {
      productId: 123345345,
      quantity: 3,
      status: 0,
      email: 'email@email.com',
      dateOrdered: '05/25/2003'
    },
    {
      productId: 123345346,
      quantity: 5,
      status: 1,
      email: 'anotheremail@email.com',
      dateOrdered: '06/15/2003'
    },
    {
      productId: 123345347,
      quantity: 2,
      status: 2,
      email: 'yetanotheremail@email.com',
      dateOrdered: '07/20/2003'
    },
  ]

  return (
    <div className='bg-eggshell flex flex-col px-8 lg:px-32 md:px-24 sm:px-10 pt-32 text-midnight-green pb-10 min-h-screen'>
      <div className='bg-alabaster p-5 mb-5 rounded-xl mt-4 flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap justify-start gap-10'>
        {dummyOrders.map((order) => (
          <AdminOrderCard key={order.productId} order={order} />
        ))}
      </div>
    </div>
  )
}

export default AdminOrders
