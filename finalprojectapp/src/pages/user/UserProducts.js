import React, { useState, useEffect, useContext } from 'react';
import ProductCardUser from '../../components/user/ProductCardUser';
import { useOutletContext } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from "axios";
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'



const UserProducts = () => {
    var root;
    const [numItems, setNumItems] = useState("0");
    const [farmProducts, setFarmProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addItemsCart, setAddItemsCart] = useState([]);
    const userId = useOutletContext();

    function update (){


        setNumItems(()=>{
            var nval = parseInt(numItems)+1;
            return nval;
        })
    }
    
    useEffect(() => { 
        
        axios.get('http://localhost:3000/api/products/list').then( 
            response => { 
                setFarmProducts(response.data); 
                setLoading(false);
            } 
        ).catch(error => { 
            setError(error);
            setLoading(false);
        }) 


        
    }, [])






    function filterOn (){
        let sortValue = document.getElementById("sort");
        let filterValue = document.getElementById("filter");

        var priceAsc = document.getElementById("price-asc")
        var priceDesc = document.getElementById("price-desc")
        var quantityAsc = document.getElementById("quantity-asc")
        var quantityDesc = document.getElementById("quantity-desc")
        var nameAsc = document.getElementById("name-asc")
        var nameDesc = document.getElementById("name-desc")
        var typeAsc = document.getElementById("type-asc")
        var typeDesc = document.getElementById("type-desc")

        if (filterValue.value ==="price" &&sortValue.value ==="ascending"){
            
            priceAsc.style.display = "flex";
            priceDesc.style.display = "none";
            quantityAsc.style.display = "none";
            quantityDesc.style.display = "none";
            nameAsc.style.display = "none";
            nameDesc.style.display = "none";
            priceDesc.style.display = "none";
            priceDesc.style.display = "none";
        } else if (filterValue.value ==="price" && sortValue.value ==="descending"){
            priceAsc.style.display = "none";
            priceDesc.style.display = "flex";
            quantityAsc.style.display = "none";
            quantityDesc.style.display = "none";
            nameAsc.style.display = "none";
            nameDesc.style.display = "none";
            typeAsc.style.display = "none";
            typeAsc.style.display = "none";
        } else if (filterValue.value ==="quantity" &&sortValue.value ==="ascending"){
            priceAsc.style.display = "none";
            priceDesc.style.display = "none";
            quantityAsc.style.display = "flex";
            quantityDesc.style.display = "none";
            nameAsc.style.display = "none";
            nameDesc.style.display = "none";
            typeAsc.style.display = "none";
            typeAsc.style.display = "none";
        } else if (filterValue.value ==="quantity" && sortValue.value ==="descending"){
            priceAsc.style.display = "none";
            priceDesc.style.display = "none";
            quantityAsc.style.display = "none";
            quantityDesc.style.display = "flex";
            nameAsc.style.display = "none";
            nameDesc.style.display = "none";
            typeAsc.style.display = "none";
            typeAsc.style.display = "none";
        } 
        
        else if (filterValue.value ==="name" && sortValue.value ==="ascending"){
            priceAsc.style.display = "none";
            priceDesc.style.display = "none";
            quantityAsc.style.display = "none";
            quantityDesc.style.display = "none";
            nameAsc.style.display = "flex";
            nameDesc.style.display = "none";
            typeAsc.style.display = "none";
            typeAsc.style.display = "none";
        } else if (filterValue.value ==="name" && sortValue.value ==="descending"){
            priceAsc.style.display = "none";
            priceDesc.style.display = "none";
            quantityAsc.style.display = "none";
            quantityDesc.style.display = "none";
            nameAsc.style.display = "none";
            nameDesc.style.display = "flex";
            typeAsc.style.display = "none";
            typeAsc.style.display = "none";
        } 
        
        else if (filterValue.value ==="type" && sortValue.value ==="ascending"){
            priceAsc.style.display = "none";
            priceDesc.style.display = "none";
            quantityAsc.style.display = "none";
            quantityDesc.style.display = "none";
            nameAsc.style.display = "none";
            nameDesc.style.display = "none";
            typeAsc.style.display = "flex";
            typeAsc.style.display = "none";
        
        } else if (filterValue.value ==="type" && sortValue.value ==="descending"){
            priceAsc.style.display = "none";
            priceDesc.style.display = "none";
            quantityAsc.style.display = "none";
            quantityDesc.style.display = "none";
            nameAsc.style.display = "none";
            nameDesc.style.display = "none";
            typeAsc.style.display = "none";
            typeAsc.style.display = "flex";
        
        }

        
    }

    const show = {
        display: 'flex'
    };
    const hide = {
        display: 'none'
    };
 
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

  return (
    <>
    <div className='bg-eggshell flex flex-col px-8 lg:px-32 md:px-24 sm:px-10 pt-32'>
    <div className = 'flex justify-center mb-10'>
      <h1 className='text-midnight-green text-4xl'>Welcome to our shop</h1>
    </div>
    
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
                <label htmlFor="sort" >Sort by: </label>
                <select name="sort" id="sort" className='bg-midnight-green text-white px-2 py-1 rounded-lg'>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>
            <button onClick={filterOn}className='bg-midnight-green text-white px-3 py-1 rounded-lg'> Apply </button>
        </div>
        <div className='product bg-alabaster min-h-screen p-5 mb-5 rounded-xl mt-4 flex flex-col justify-center items-center'>
            <div className = 'flex flex-row justify-center mb-16 items-center'>
                <label id = 'cart-items' className = "text-3xl mr-16">Number of Items Added to Cart: {numItems}</label>
                <NavLink to='/user/cart'><button onClick = {update} className = "text-3xl bg-midnight-green w-96 h-12 rounded-xl">Proceed to Checkout</button></NavLink>
            </div>

            {/* FOR DIFFERENT SORTING TEKNIKS */}
            <div className = 'flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap gap-10 justify-center' id = 'name-asc' style={show}>
                {farmProducts.sort((a,b)=>a.name.localeCompare(b.name)).map((user_product)=>
                    
                    <ProductCardUser data={user_product} items = {addItemsCart} setItems = {setAddItemsCart} key ={user_product._id}/>
                    
                )}
            </div>
            
            <div className = 'flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap gap-10 justify-center' id = 'name-desc' style={hide}>
                {farmProducts.sort((a,b)=>b.name.localeCompare(a.name)).map((user_product)=>
                    
                    <ProductCardUser data={user_product} items = {addItemsCart} setItems = {setAddItemsCart} key ={user_product._id}/>
                    
                )}
            </div>

            <div className = 'flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap gap-10 justify-center' id = 'type-asc' style={hide}>
                {farmProducts.sort((a,b)=>a.type.localeCompare(b.type)).map((user_product)=>
                    
                    <ProductCardUser data={user_product} items = {addItemsCart} setItems = {setAddItemsCart} key ={user_product._id}/>
                    
                )}
            </div>

            <div className = 'flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap gap-10 justify-center' id = 'type-desc' style={hide}>
                {farmProducts.sort((a,b)=>b.type.localeCompare(a.type)).map((user_product)=>
                    
                    <ProductCardUser data={user_product} items = {addItemsCart} setItems = {setAddItemsCart} key ={user_product._id}/>
                    
                )}
            </div>

            <div className = 'flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap gap-10 justify-center' id = 'price-asc' style={hide}>
                {farmProducts.sort((a,b)=>a.price-b.price).map((user_product)=>
                    
                    <ProductCardUser data={user_product} items = {addItemsCart} setItems = {setAddItemsCart} key ={user_product._id}/>
                    
                )}
            </div>

            <div className = 'flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap gap-10 justify-center' id = 'price-desc' style={hide}>
                {farmProducts.sort((a,b)=>b.price-a.price).map((user_product)=>
                    
                    <ProductCardUser data={user_product} items = {addItemsCart} setItems = {setAddItemsCart} key ={user_product._id}/>
                    
                )}
            </div>

            <div className = 'flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap gap-10 justify-center' id = 'quantity-asc' style={hide}>
                {farmProducts.sort((a,b)=>b.quantity-a.quantity).map((user_product)=>
                    
                    <ProductCardUser data={user_product} items = {addItemsCart} setItems = {setAddItemsCart} key ={user_product._id}/>
                    
                )}
            </div>

            <div className = 'flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap gap-10 justify-center' id = 'quantity-desc' style={hide}>
                {farmProducts.sort((a,b)=>b.quantity-a.quantity).map((user_product)=>
                    
                    <ProductCardUser data={user_product} items = {addItemsCart} setItems = {setAddItemsCart} key ={user_product._id}/>
                    
                )}
            </div>

            
        </div>

        
    </div>
    </>
  )
}



// const itemsCart = []

export function AddToCartFunc (Item, setItemsCart, itemsCart){
    
    
    console.log(Item)
    console.log(setItemsCart)
    setItemsCart(()=>{
        var nval;
        nval = [...itemsCart, Item]
        return nval
    })

    // const element = (
    //     <React.StrictMode>
    //         <label className = "text-3xl mr-16">Number of Items Added to Cart: {itemsCart.length}</label>
    //     </React.StrictMode>
    // )
    // const root = createRoot(
    //     document.getElementById("cart-items")
    // )
    // root.render(element)
    
    console.log(itemsCart)

}






export default UserProducts