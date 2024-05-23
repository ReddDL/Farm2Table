// import { useOutletContext } from "react-router-dom";

import { useEffect, useState } from "react";
import CartProductCard from "../../components/user/CartProductCard"
import axios from "axios";

// import CartProductCard from '../../components/user/CartProductCard.js'
const UserCart = () => {
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  
  // ([
  //   {
  //       productId : "6648a04e92b6a06ae2277ac0",
  //       name: "product1",
  //       description: "desc1",
  //       type: 'crop',
  //       price: 12,
  //       quantity: 1,
  //       image: "https://media.post.rvohealth.io/wp-content/uploads/sites/3/2020/02/295268_2200-732x549.jpg"
  //   }
  //   // },
  //   // {   
  //   //     _id : 2,
  //   //     name: "product2",
  //   //     description: "desc2",
  //   //     type: 'poultry',
  //   //     price: 20,
  //   //     quantity: 10
  //   // },
  //   // {
  //   //     _id : 3,
  //   //     name: "product3",
  //   //     description: "desc3",
  //   //     type: 'crop',
  //   //     price: 300,
  //   //     quantity: 100
  //   // }
  // ])
  
  
  useEffect(() => {
    async function fetchCart () {
      try { 
        const res = await axios.get("http://localhost:3000/api/cart/")
        console.log(res.data)
        setCart(res.data)
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

  useEffect(() => {
    async function fetchProducts() {
      try { 
        const products = cart.items
        const detailedProducts = [];

        for (let i=0; i<products.length; i++) {
          const res = await axios.get(
            `http://localhost:3000/api/products/view/${products[i].productId}`
          );

          detailedProducts.push({...res.data, orderQuantity: products[i].quantity});
        }
        
        setCartProducts(detailedProducts);
      } catch (error) {
        console.log("Error fetching product")
      }
    }

    fetchProducts();
  }, [cart])
  

  useEffect(() => {
    console.log("cartyy", )
  }, [cart])

  return (
    <>
    <div className='bg-eggshell flex flex-row px-8 lg:px-32 md:px-24 sm:px-10 pt-32'>
      <div className = 'w-1/2'>
        <label className = "text-2xl text-gunmetal">Your Shopping Cart</label>
        {
          cart?.items?.length > 0 ? (
            cartProducts.map((product) => {
              // const productInfo = fetchProduct(product.productId);
              return <CartProductCard product={product} updateCart={updateCart} key={product._id}/>
            })
          ) : (
            "Your cart is currently empty"
          )
          
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