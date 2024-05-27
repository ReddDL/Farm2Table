
import React, { useState, useEffect } from 'react';

import axios from "axios";

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

  if (document.getElementById(attributes._id)!== null){
    document.getElementById(attributes._id).addEventListener("click", InCart);
  }

  function InCart(){
    document.getElementById(attributes._id).innerHTML = "IN CART";
    document.getElementById(attributes._id).disabled = true;
    document.getElementById(attributes._id).className = "AddToCart bg-space-cadet h-10 mt-3 rounded-lg text-eggshell"; 

  }

  return (
    <div className="card w-80 bg-white shadow-xl" key = {attributes._id} id = {attributes.name}>
        <figure className="object-fill w-80 h-60"><img src={attributes.image} alt={attributes.title} className = "h-80"/></figure>
        <div className="card-body">
            <div className = 'flex flex-col flex-wrap'>
              <div className="flex justify-between">
                <h2 className="card-title lato-bold">{attributes.name}</h2>
                <h3> ${attributes.price}</h3>
              </div>
                <div className="bg-periwinkle w-fit px-4 py-1 rounded-3xl mb-4">
                  <p className="text-xs poppins-regular">
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
                <button className = "AddToCart bg-space-cadet h-10 mt-3 rounded-lg text-eggshell" id = {attributes._id} disabled>IN CART</button>
              ) : (
                <button onClick= {addToCart} className = "AddToCart bg-tea-green h-10 mt-3 rounded-2xl text-oxford-blue lato-bold" id = {attributes._id} > Add to cart</button>
              )
            }
            
        </div>
    </div>
  )

  
}







export default ProductCard2
