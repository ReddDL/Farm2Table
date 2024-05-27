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

    const [cartProducts, setCartProducts] = useState([]);
    
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
            setNumItems(()=>{
                var nval = 0;
                res.data.items.map((item)=>
                    
                    nval = nval + (item.quantity)
                )

                return nval;
            })
            
            setLoading(false);
            

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

        var priceAsc        = document.getElementById("price-asc")
        var priceDesc       = document.getElementById("price-desc")
        var quantityAsc     = document.getElementById("quantity-asc")
        var quantityDesc    = document.getElementById("quantity-desc")
        var nameAsc         = document.getElementById("name-asc")
        var nameDesc        = document.getElementById("name-desc")
        var typeAsc         = document.getElementById("type-asc")
        var typeDesc        = document.getElementById("type-desc")


        priceAsc.style.display      = "none";
        priceDesc.style.display     = "none";
        quantityAsc.style.display   = "none";
        quantityDesc.style.display  = "none";
        nameAsc.style.display       = "none";
        nameDesc.style.display      = "none";
        typeAsc.style.display       = "none";
        typeAsc.style.display       = "none";

        if (filterValue.value ==="price" &&sortValue.value ==="ascending") priceAsc.style.display = "flex";

        else if (filterValue.value ==="price" && sortValue.value ==="descending") priceDesc.style.display = "flex";

        else if (filterValue.value ==="quantity" &&sortValue.value ==="ascending") quantityAsc.style.display = "flex";
 
        else if (filterValue.value ==="quantity" && sortValue.value ==="descending") quantityDesc.style.display = "flex";

        else if (filterValue.value ==="name" && sortValue.value ==="ascending") nameAsc.style.display = "flex";

        else if (filterValue.value ==="name" && sortValue.value ==="descending") nameDesc.style.display = "flex";

        else if (filterValue.value ==="type" && sortValue.value ==="ascending") typeAsc.style.display = "flex";

        else if (filterValue.value ==="type" && sortValue.value ==="descending") typeAsc.style.display = "flex";

        
    }


    
    const arraySort = [

        {   id      :   'name-asc',             sort    :   (a,b)=>a.name.localeCompare(b.name)     }, 

        {   id      :   'name-desc',            sort    :   (a,b)=>b.name.localeCompare(a.name)     }, 

        {   id      :   'quantity-desc',        sort    :   (a,b)=>b.quantity-a.quantity            }, 
        
        {   id      :   'quantity-asc',         sort    :   (a,b)=>a.quantity-b.quantity            }, 

        {   id      :   'price-desc',           sort    :   (a,b)=>b.price-a.price                  }, 

        {   id      :   'price-asc',            sort    :   (a,b)=>a.price-b.price                  }, 

        {   id      :   'type-desc',            sort    :   (a,b)=>b.type.localeCompare(a.type)     }, 

        {   id      :   'type-asc',             sort    :   (a,b)=>a.type.localeCompare(b.type)     }, 
    ]

    const PlaceHolder = ()=> {
        var key = 0;
        let sortValue = document.getElementById("sort");
        let filterValue = document.getElementById("filter");

        try {

        } catch {

        }
        // console.log(sortValue.value == null)
        console.log("-----")
        return(

            <>

                    <div className = 'sorterProducts flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap gap-10 justify-center' id = "name-asc" style = {show} key = {0}>
                        {farmProducts.sort(arraySort[0].sort).map((user_product)=>
                            
                            <ProductCardUser data={user_product} items = {cart} setItems = {setCart} key ={user_product._id} setNumItems ={setNumItems} numItems = {numItems}/>
                            
                        )}
                    </div>


                {arraySort.slice(1).map((sortObj, index) => 
                    
                    <div className = 'sorterProducts flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap gap-10 justify-center' id = {sortObj.id} style = {hide} key = {index}>
                        {farmProducts.sort(sortObj.sort).map((user_product)=>
                            
                            <ProductCardUser data={user_product} items = {cart} setItems = {setCart} key ={user_product._id} setNumItems = {setNumItems} numItems = {numItems}/>
                            
                        )}
                    </div>

                )}

            </>
        )
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

  return (
    <>
    <div className='bg-eggshell flex flex-col px-8 lg:px-32 md:px-24 sm:px-10 pt-32'>

    <div className = 'flex justify-center mb-10'>

      <h1 className='text-midnight-green text-4xl'>Welcome to our shop</h1>

    </div>
    
        <div className='flex poppins-regular items-center gap-4 relative'>
            <div>
                <label htmlFor="filter">Filter by: </label>
                <select name="filter" id="filter" className='bg-midnight-green text-white px-2 py-1 rounded-lg mr-3'>
                    <option value="name">Name</option> 
                    <option value="price">Price</option>
                    <option value="type">Type</option>
                    <option value="quantity">Quantity</option>
                </select>
                </div>
            <div >
                <label htmlFor="sort" >Sort by: </label>
                <select name="sort" id="sort" className='bg-midnight-green text-white px-2 py-1 rounded-lg'>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>
            <button onClick={filterOn}className='bg-midnight-green text-white px-3 py-1 rounded-lg'> Apply </button>
        </div>
        <div className='product bg-alabaster min-h-screen max-w-7xl mx-auto p-5 mb-5 rounded-xl mt-4 flex flex-col justify-center items-center'>
            <div className = 'flex flex-row justify-center mb-16 items-center'>
                <label id = 'cart-items' className = "text-3xl mr-16">Number of Items Added to Cart: {numItems}</label>
                {/* <NavLink to='/cart'><button className = "text-3xl bg-midnight-green w-96 h-12 rounded-xl">Proceed to Checkout</button></NavLink> */}
            </div>

            {/* FOR DIFFERENT SORTING TEKNIKS */}
            <PlaceHolder/>
            
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