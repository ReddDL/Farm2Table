import React from 'react'
import ProductCard from '../components/ProductCard.js';

const AdminDashboard = () => {

  return (
    <div className='bg-eggshell flex flex-col px-8 lg:px-32 md:px-24 sm:px-10 pt-32 text-midnight-green'>
        <h1 className='poppins-regular text-4xl mb-5 '> Hello admin, here's a quick summary of the sales</h1>
        <ul className='poppins-regular flex gap-5 mb-4 text-lg'>
            <li><a href="#"> Annually </a></li>
            <li><a href="#"> Monthly </a></li>
            <li><a href="#"> Weekly </a></li>
        </ul>
        <div className='bg-alabaster h-52 rounded-xl flex items-center pl-20'>
            <div className='flex flex-col '>
                <h2 className='text-5xl poppins-regular'> 123,456 </h2>
                <p> Annual Sales</p>
            </div>
        </div>
        <div className='bg-alabaster p-5 mb-5 rounded-xl mt-7 flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap justify-start gap-10'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />

        </div>
    </div> 
  )
}

export default AdminDashboard
