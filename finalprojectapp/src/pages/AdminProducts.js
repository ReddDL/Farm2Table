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

        let sortValue = document.getElementById("sort");
        let filterValue = document.getElementById("filter");

        if (filterValue.value ==="price" &&sortValue.value ==="ascending") {
            const productsCopy = [...products];
            productsCopy.sort((a,b)=>a.price-b.price);
            setProducts(productsCopy)

        } if (filterValue.value ==="price" &&sortValue.value ==="descending") {
            const productsCopy = [...products];
            productsCopy.sort((a,b)=>b.price-a.price);
            setProducts(productsCopy)
        } if (filterValue.value ==="quantity" &&sortValue.value ==="ascending") {
            const productsCopy = [...products];
            productsCopy.sort((a,b)=>a.quantity-b.quantity);
            setProducts(productsCopy);
        } if (filterValue.value ==="quantity" &&sortValue.value ==="descending") {
            const productsCopy = [...products];
            productsCopy.sort((a,b)=>b.quantity-a.quantity);
            setProducts(productsCopy);
        } if (filterValue.value ==="name" && sortValue.value ==="ascending") {
            const productsCopy = [...products];
            productsCopy.sort((a,b)=>a.name.localeCompare(b.name));
            setProducts(productsCopy);
        }  if (filterValue.value ==="name" && sortValue.value ==="descending") {
            const productsCopy = [...products];
            productsCopy.sort((a,b)=>b.name.localeCompare(a.name));
            setProducts(productsCopy);
        }  if (filterValue.value ==="type" && sortValue.value ==="ascending") {
            const productsCopy = [...products];
            productsCopy.sort((a,b)=>a.type.localeCompare(b.type));
            setProducts(productsCopy);
        }  if (filterValue.value ==="type" && sortValue.value ==="descending") {
            const productsCopy = [...products];
            productsCopy.sort((a,b)=>b.type.localeCompare(a.type));
            setProducts(productsCopy);
        }
  };


  function PlaceHolder() {
        
    return products.map((product)=>{

        
        return(
            <>
                <AdminProductCard product={product} key ={product._id}/>
            </>
        )

        })
  }
  return (
    <div className='bg-eggshell flex flex-col px-8 lg:px-32 md:px-24 sm:px-10 pt-32 min-h-screen'>
      <div className='flex poppins-regular items-center gap-4'>
        <div>
          {/* <label htmlFor="filter">Filter by: </label> */}
          <select name="filter" id="filter" className='bg-eggshell text-midnight-green px-2 py-1 mr-3 border border-solid border-gray-600 pr-9'>
            <option value="filterBy">Filter by</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="type">Type</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>
        <div>
          {/* <label htmlFor="sort">Sort by: </label> */}
          <select name="sort" id="sort" className='bg-eggshell text-midnight-green px-2 py-1 mr-3 border border-solid border-gray-600 pr-9'>
            <option value="sortBy">Sort by</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
        <button onClick={filter} className='bg-eggshell text-midnight-green px-3 py-1 border border border-solid border-gray-600'>Apply</button>
      </div>
      <div id="product" className='product bg-alabaster p-5 mb-5 rounded-xl mt-4 flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap justify-start gap-10'>
        {PlaceHolder()}
      </div>
    </div>
  );
};

export default AdminProducts
