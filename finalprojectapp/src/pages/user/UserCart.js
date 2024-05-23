// import { useOutletContext } from "react-router-dom";

import { useEffect, useState } from "react";
import CartProductCard from "../../components/user/CartProductCard"

// import CartProductCard from '../../components/user/CartProductCard.js'
const UserCart = () => {
  const [cart, setCart] = useState([
    {
        _id : 1,
        name: "product1",
        description: "desc1",
        type: 'crop',
        price: 12,
        quantity: 1
    },
    {   
        _id : 2,
        name: "product2",
        description: "desc2",
        type: 'poultry',
        price: 20,
        quantity: 10
    },
    {
        _id : 3,
        name: "product3",
        description: "desc3",
        type: 'crop',
        price: 300,
        quantity: 100
    }
  ])
  
  function updateCart(newProduct) {
    const index = cart.findIndex(cartProduct => newProduct._id === cartProduct._id)
    console.log("nP", newProduct)
    console.log("index", index)
    
    const newCart = cart;
    newCart[index] = newProduct;
    
    console.log("nc", newCart)
    setCart(newCart);
  }

  useEffect(() => {
    console.log("cartyy", cart)
  })

  return (
    <>
    <div className='bg-eggshell flex flex-row px-8 lg:px-32 md:px-24 sm:px-10 pt-32'>
      <div className = 'w-1/2'>
        <label className = "text-2xl text-gunmetal">Your Shopping Cart</label>
        {
          cart.map((product) => {
            console.log(product)
            return <CartProductCard product={product} updateCart={updateCart} key={product._id}/>
          })
        }
      </div>
      <div className = 'w-1/2'>
        2nd div
      </div>

    </div>
    </>
    
  )
}

export default UserCart