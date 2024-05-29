
import React, { useState, useEffect } from 'react';

import axios from "axios";
import { NavLink } from 'react-router-dom';

const ProductCard2 = (prop) => {
  let attributes = prop.data;
  const [inCart, setInCart] = useState(prop?.inCart);
  const [orderQuantity, setOrderQuantity] = useState(1);

  console.log(attributes)
  // add product to cart
  async function addToCart() {
    try { 
      const res = await axios.post("http://localhost:3000/api/cart/add", {
        productId: attributes._id
      })

      setInCart(true);
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

  // if (document.getElementById(attributes._id)!== null){
  //   document.getElementById(attributes._id).addEventListener("click", InCart);
  // }

  // function InCart(){
  //   document.getElementById(attributes._id).innerHTML = "IN CART";
  //   document.getElementById(attributes._id).disabled = true;
  //   document.getElementById(attributes._id).className = "AddToCart bg-space-cadet h-10 mt-3 rounded-lg text-eggshell"; 

  // }

  return (
    <div className="card min-h-96 max-h-[30rem] bg-white shadow-xl" key = {attributes._id} id = {attributes.name}>
        <figure className="object-cover w-full h-60"><img src={attributes.image} alt={attributes.title} className = "h-full w-full object-cover"/></figure>
        <div className="card-body">
            <div className = 'flex flex-col flex-wrap'>
              <div className="flex justify-between">
                <h2 className="card-title lato-bold">{attributes.name}</h2>
                <h3> ${attributes.price}</h3>
              </div>
                <div className="bg-periwinkle w-fit px-4 py-1 rounded-3xl mb-4">
                  <p className="text-xs poppins-regular text-midnight-green">
                    {attributes.type}
                  </p>
                </div>
                <p className = "poppins-regular">{attributes.description}</p>
                <p className="text-xs poppins-regular"> {attributes.quantity} left</p>
            </div>
                {/* + and - */}
              <div className="flex flex-row justify-between">
                <div className="flex justify-center items-center gap-6">

                  {/* <FontAwesomeIcon icon={faMinus} onClick={subOrderQuantity} className="btn btn-ghost btn-xs p-2" />
                  {orderQuantity}
                  <FontAwesomeIcon icon={faPlus} onClick={addOrderQuantity} className="btn btn-ghost btn-xs p-2"/> */}
                </div>
              </div>
            
            {
              inCart ? (
                <NavLink to="/cart" >
                  <button className = "AddToCart bg-space-cadet/80 hover:bg-oxford-blue btn border-none w-full h-10 mt-3 rounded-2xl text-eggshell lato-bold" id = {attributes._id}>View item in cart</button>
                </NavLink>
              ) : (
                <button onClick= {addToCart} className = "AddToCart btn border-none bg-tea-green h-10 mt-3 rounded-2xl text-oxford-blue lato-bold hover:bg-periwinkle" id = {attributes._id} > Add to cart</button>
              )
            }
            
        </div>
    </div>
  )

  
}







export default ProductCard2
