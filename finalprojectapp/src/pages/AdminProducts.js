import {React, useState, useEffect} from 'react'
import AdminProductCard from '../components/admin/AdminProductCard';
import axios from 'axios';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/admin/products/getAll')
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      });
  }, []);

  const filter = () => {
    // Implement your filtering and sorting logic here
  };

  return (
    <div className='bg-eggshell flex flex-col px-8 lg:px-32 md:px-24 sm:px-10 pt-32 min-h-screen'>
      <div className='flex poppins-regular items-center gap-4'>
        <div>
          <label htmlFor="filter">Filter by: </label>
          <select name="filter" id="filter" className='bg-midnight-green text-white px-2 py-1 rounded-lg mr-3'>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="type">Type</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort">Sort by: </label>
          <select name="sort" id="sort" className='bg-midnight-green text-white px-2 py-1 rounded-lg'>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
        <button onClick={filter} className='bg-midnight-green text-white px-3 py-1 rounded-lg'>Apply</button>
      </div>
      <div id="product" className='product bg-alabaster p-5 mb-5 rounded-xl mt-4 flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap justify-start gap-10'>
        {products.map((product) => (
          <AdminProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AdminProducts
