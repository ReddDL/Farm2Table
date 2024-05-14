import React from 'react'
import ProductCard from '../components/ProductCard';

const AdminProducts = () => {

    // apply sort logic

  return (
    <>
    <div className='bg-eggshell flex flex-col px-8 lg:px-32 md:px-24 sm:px-10 pt-32'>
    <div className='flex poppins-regular items-center gap-4'>
        <div>
            <label for="filter">Filter by: </label>
            <select name="filter" id="filter" className='bg-midnight-green text-white px-2 py-1 rounded-lg mr-3'>
                <option value="name">Name</option> 
                <option value="price">Price</option>
                <option value="type">Type</option>
                <option value="quantity">Quantity</option>
            </select>
            </div>
        <div>
            <label for="sort" >Sort by: </label>
            <select name="sort" id="sort" className='bg-midnight-green text-white px-2 py-1 rounded-lg'>
                <option value="ascending">Ascending</option>
                <option value="ascending">Descending</option>
            </select>
        </div>
        <button className='bg-midnight-green text-white px-3 py-1 rounded-lg'> Apply </button>
    </div>
        <div className='bg-alabaster p-5 mb-5 rounded-xl mt-4 flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap justify-start gap-10'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
      </div>
    </>
  )
}

export default AdminProducts
