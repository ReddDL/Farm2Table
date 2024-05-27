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

    
    
    
    useEffect(() => {   
        
        async function fetchProducts (){
            try{
                const res = await axios.get('http://localhost:3000/api/products/list')
                console.log(res.data)
                setFarmProducts(res.data)
            } catch(error){

                
            }
        }
        fetchProducts()
        
    }, [])

    
    useEffect(() => {
        async function fetchCart () {
          try { 
            const res = await axios.get("http://localhost:3000/api/cart/")
            console.log(res.data)
            setCart(res.data)
            setLoading(false)
            

          } catch (error) {
            switch (error?.response?.status) {
              case 404:
                console.log("User has no cart")
                break;
              case 500:
                console.log("Error fetching cart")
            }
            
          }
        }
        fetchCart();
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


    function PlaceHolder() {
        
        return farmProducts.map((user_product)=>{
            var inCart = false;


            if (cart.items !== null){
                for (let i = 0; i<cart.items.length; i++){
                    if (cart.items[i].productId == user_product._id){
                        inCart = true;
                        break;
                    }
                }
            }
            
            return(
                <>
                    <ProductCardUser data={user_product} cart = {cart} setCart = {setCart} key ={user_product._id} inCart = {inCart}/>
                </>
            )

            })
    }

    const show = {
        display: 'flex'
    };
    const hide = {
        display: 'none'
    };
        
    // filterOn();


    // console.log(cart)

    // if (!loading) return (<div>Loading....</div>)

  if (loading) return (<div>Loading....</div>)
  return (
    <>
    <div className='bg-eggshell flex flex-col px-8 lg:px-32 md:px-24 sm:px-10 pt-32'>

    <div className = 'flex justify-center mb-10'>

      <h1 className='text-midnight-green text-4xl'>Welcome to our shop</h1>

    </div>
    
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
        <button onClick={filterOn} className='bg-eggshell text-midnight-green px-3 py-1 border border border-solid border-gray-600'>Apply</button>
      </div>
        <div className='product bg-alabaster min-h-screen max-w-7xl mx-auto p-5 mb-5 rounded-xl mt-4 flex flex-col justify-center items-center'>
            <div className = 'flex flex-row justify-center mb-16 items-center'>
                <label id = 'cart-items' className = "text-3xl mr-16">Number of Items Added to Cart: {numItems}</label>
                {/* <NavLink to='/cart'><button className = "text-3xl bg-midnight-green w-96 h-12 rounded-xl">Proceed to Checkout</button></NavLink> */}
            </div>

            {/* FOR DIFFERENT SORTING TEKNIKS */}

            <div className = 'sorterProducts flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap gap-10 justify-center' id = "name-asc" style = {show} key = {0}>

            {PlaceHolder()}
            </div>
            
        </div>

        
    </div>

    </>
  )
}

// const itemsCart = []

export async function ItemCount(setNumItems, totalQuantity, itemQuantity){
    setNumItems(()=>{
        var nval = totalQuantity + itemQuantity;
        return nval;
    }
        
    )
}

export default UserProducts