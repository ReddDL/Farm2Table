import React, { useState, useEffect, useContext } from 'react';
import ProductCardUser from '../../components/user/ProductCardUser';
import { useOutletContext } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from "axios";
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'

const UserProducts = () => {
    const [numItems, setNumItems] = useState(0);
    const [cart, setCart] = useState([]);
    const [farmProducts, setFarmProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = useOutletContext();

    // fetch products and user cart
    useEffect(() => {   
        async function fetchData (){
            try{
                const productsRes = await axios.get('http://localhost:3000/api/products/list')
                const products = productsRes.data;
                let cart = {};

                // fetch user's cart
                try {
                  const cartRes = await axios.get("http://localhost:3000/api/cart/")
                  cart = cartRes.data;
                  setCart(cart)
                } catch (error) {
                  console.log(error)
                }

                // assign inCart attribute to each product
                for (const product of products) {
                    if (cart?.items?.find(item => item.productId === product._id)) {
                        product["inCart"] = true;
                    } else {
                        product["inCart"] = false;
                    }
                }

                setFarmProducts(products)
                setLoading(false)
            } catch(error){
                console.log(error)
            }
        }
        fetchData()
    }, [])
    
    function filterOn (){
        let sortValue = document.getElementById("sort");
        let filterValue = document.getElementById("filter");

        if (filterValue.value ==="price" &&sortValue.value ==="ascending") {
            const productsCopy = [...farmProducts];
            productsCopy.sort((a,b)=>a.price-b.price);
            setFarmProducts(productsCopy)
        } if (filterValue.value ==="price" &&sortValue.value ==="descending") {
            const productsCopy = [...farmProducts];
            productsCopy.sort((a,b)=>b.price-a.price);
            setFarmProducts(productsCopy)
        } if (filterValue.value ==="quantity" &&sortValue.value ==="ascending") {
            const productsCopy = [...farmProducts];
            productsCopy.sort((a,b)=>a.quantity-b.quantity);
            setFarmProducts(productsCopy);
        } if (filterValue.value ==="quantity" &&sortValue.value ==="descending") {
            const productsCopy = [...farmProducts];
            productsCopy.sort((a,b)=>b.quantity-a.quantity);
            setFarmProducts(productsCopy);
        } if (filterValue.value ==="name" && sortValue.value ==="ascending") {
            const productsCopy = [...farmProducts];
            productsCopy.sort((a,b)=>a.name.localeCompare(b.name));
            setFarmProducts(productsCopy);
        }  if (filterValue.value ==="name" && sortValue.value ==="descending") {
            const productsCopy = [...farmProducts];
            productsCopy.sort((a,b)=>b.name.localeCompare(a.name));
            setFarmProducts(productsCopy);
        }  if (filterValue.value ==="type" && sortValue.value ==="ascending") {
            const productsCopy = [...farmProducts];
            productsCopy.sort((a,b)=>a.type.localeCompare(b.type));
            setFarmProducts(productsCopy);
        }  if (filterValue.value ==="type" && sortValue.value ==="descending") {
            const productsCopy = [...farmProducts];
            productsCopy.sort((a,b)=>b.type.localeCompare(a.type));
            setFarmProducts(productsCopy);
        }
    }

    return (
    <>
    <div className='bg-eggshell flex flex-col pt-32'>
    <div className = 'flex justify-center mb-10'>
      <h1 className='text-midnight-green text-4xl'>Welcome to our shop</h1>
    </div>
    <div className=' mx-auto' >
      {/*  FILTERS  */}
      <div className='flex poppins-regular justify-start items-center gap-4 '>
          <div>
            <select name="filter" id="filter" className='bg-eggshell text-midnight-green px-2 py-1 mr-3 border border-solid border-gray-600 pr-9'>
              <option value="filterBy">Filter by</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="type">Type</option>
              <option value="quantity">Quantity</option>
            </select>
          </div>
          <div>
            <select name="sort" id="sort" className='bg-eggshell text-midnight-green px-2 py-1 mr-3 border border-solid border-gray-600 pr-9'>
              <option value="sortBy">Sort by</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
          <button onClick={filterOn} className='bg-eggshell text-midnight-green px-3 py-1 border border-solid border-gray-600'>Apply</button>
        </div>
        {/* PRODUCTS */}
        <div className='product bg-alabaster min-h-screen max-w-7xl p-5 mb-5 rounded-xl mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-md'>
        {farmProducts.map((user_product) => (
          <ProductCardUser data={user_product} cart={cart} setCart={setCart} key={user_product._id} />
        ))}
        </div>
        </div>
    </div>
    </>
  )
}

export default UserProducts
