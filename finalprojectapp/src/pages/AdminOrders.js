import React from 'react'
import OrderCard from '../components/OrderCard'


const AdminOrders = () => {
  return (
    <div className='bg-eggshell flex flex-col px-8 lg:px-32 md:px-24 sm:px-10 pt-32 text-midnight-green pb-10'>
        <div className='bg-alabaster p-5 mb-5 rounded-xl mt-4 flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap justify-start gap-10'>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        </div>
    </div> 
  )
}

export default AdminOrders
