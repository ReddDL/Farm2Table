import { faCross, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from 'react';
import { AddToCartFunc } from '../../pages/user/UserProducts';
import CartProductCard from "./CartProductCard";
import axios from "axios";

const ProductCard2 = (prop) => {
  let attributes = prop.data;
  const [orderQuantity, setOrderQuantity] = useState(0);
  console.log(prop)

  console.log(attributes)
  function PrepareToCart () {
    // AddToCartFunc(attributes, prop.setItems, prop.items, prop.itemCounter)
    // console.log(attributes)
    updateCart({productId: attributes._id, quantity: orderQuantity})
      setOrderQuantity(0)
  }

  function addOrderQuantity() {
    setOrderQuantity(orderQuantity+1)

  }

  function subOrderQuantity() {
    if (orderQuantity > 1) {
      setOrderQuantity(orderQuantity-1)
    } 
  }
  return (
    <div className="card w-80 bg-white shadow-xl" key = {attributes._id} id = {attributes.name}>
        <figure className="object-fill w-80 h-60"><img src={attributes.image} alt={attributes.title} className = "h-80"/></figure>
        <div className="card-body">
            <div className = 'flex flex-row flex-wrap items-center justify-center'>
              <div className="">
                <h2 className="card-title">{attributes.name}</h2>
                <div className="flex flex-row">
                  <h3 className = "text-center">Type: </h3>
                  <h3 className = "text-center"> {attributes.type}</h3>
                </div>
                
              </div>
              
              <div className="ml-10">
                <div className="flex flex-row">
                  <h3 className = "text-center">Price: </h3>
                  <h3 className = "text-center"> {attributes.price}</h3>
                </div>
                <div className="flex flex-row">
                  <h3 className = "text-center">Quantity: </h3>
                  <h3 className = "text-center"> {attributes.quantity}</h3>
                </div>
                <FontAwesomeIcon icon={faMinus} onClick={subOrderQuantity} className="btn btn-ghost btn-xs p-2" />
                <FontAwesomeIcon icon={faPlus} onClick={addOrderQuantity} className="btn btn-ghost btn-xs p-2"/>
                {orderQuantity}
                
              </div>  
            </div>
            <p className = "text-center">{attributes.description}</p>
            
            <button onClick= {PrepareToCart} className = "AddToCart bg-tea-green h-10 mt-3 rounded-lg text-oxford-blue" id = {attributes._id}>ADD TO CART</button>
        </div>
    </div>
  )
}


async function updateCart({ productId, quantity }) {
  // const index = cart.findIndex(cartProduct => newProduct._id === cartProduct._id)
  // console.log("nP", newProduct)
  // console.log("index", index)
  
  // const newCart = cart;
  // newCart[index] = newProduct;
  
  // console.log("nc", newCart)
  // setCart(newCart);
  try { 
    const res = await axios.post("http://localhost:3000/api/cart/add", {
      productId,
      quantity
    })
    console.log("SUCCESS!!")
  } catch (error) {
    switch (error?.response?.status) {
      case 404:
        console.log("Product not found")
        break;
      case 500:
        console.log("Error adding to cart")
    }
    
  }
}





export default ProductCard2
