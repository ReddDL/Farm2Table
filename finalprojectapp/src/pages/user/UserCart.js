// import { useOutletContext } from "react-router-dom";

import { useEffect, useState } from "react";
import CartProductCard from "../../components/user/CartProductCard"
import axios from "axios";
import { NavLink } from "react-router-dom";

// import CartProductCard from '../../components/user/CartProductCard.js'
const UserCart = () => {
  const { firstName, lastName, email } = JSON.parse(localStorage.getItem('user'))
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  
  // fetch user's cart
  useEffect(() => {
    async function fetchCart () {
      try { 
        const res = await axios.get("http://localhost:3000/api/cart/")
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

  // update cart when user interacts with product card
  async function handleUpdateCart({ _id, orderQuantity }) {
    const productId = _id;
    const quantity = orderQuantity;

    // get index of product to be updated in cart
    const index = cart.items.findIndex((cartProduct) => cartProduct.productId === productId)
    
    // create new cart object to update state variable
    const newCart = {};
    Object.keys(cart).forEach((key) => {
      newCart[key] = cart[key];
    })

    if (quantity === 0) {
      newCart.items.splice(index, 1, )
      // update cart in db
      try { 
        const res = await axios.delete(`http://localhost:3000/api/cart/remove/${productId}`, {
          productId
        })
        // console.log('hip')
      } catch (error) {
        // console.log('eror')
        switch (error?.response?.status) {
          case 500:
            console.log("Error updating cart")
        }
      }
    } else {
      newCart.items[index] = { productId, quantity };
      // update cart in db
      try { 
        const res = await axios.put("http://localhost:3000/api/cart/update", {
          productId,
          quantity
        })
        // console.log('hip')
      } catch (error) {
        // console.log('eror')
        switch (error?.response?.status) {
          case 500:
            console.log("Error updating cart")
        }
      }
    }

    // console.log("nc", newCart)
    // update state variable
    setCart(newCart);

    
  }
  // fetch details of products in cart
  useEffect(() => {
    // console.log("cartooo", cart)
    async function fetchProducts() {
      const products = cart.items;
      // placeholder variable for product data
      const detailedProducts = [];

      if (products?.length > 0) {
        for (let i=0; i<products.length; i++) {
          try { 
            const res = await axios.get(
              `http://localhost:3000/api/products/view/${products[i].productId}`
            );
            detailedProducts.push({...res.data, orderQuantity: products[i].quantity});
          } catch (error) {
            console.log("Error fetching product")
          }
        }
      }
      // console.log("products", detailedProducts)
      setCartProducts(detailedProducts);
    }

    fetchProducts();
  }, [cart])
  
  // update checkout total
  useEffect(() => {
    // console.log("products", cartProducts)
    if (cartProducts?.length > 0) {
      // get total price of each product given unit price and order quantity 
      const cartPrices = cartProducts.map(({price, orderQuantity}) => price*orderQuantity)

      // console.log(cartPrices)
      // summation of cart prices
      const cartTotal = cartPrices.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      )
      setCheckoutTotal(cartTotal);
    } else {
      setCheckoutTotal(0)
    }
  }, [cartProducts])

  // save order upon checkout
  async function handleCheckout () {
    let success = 0;

    console.log(cart)
    for (const item of cart.items) {
      try { 
        const createRes = await axios.post("http://localhost:3000/api/orders/create", {
          productId: item.productId,
          quantity: item.quantity,
          email,
          // totalPrice: item.price * item.quantity
        })
        success++;
      } catch (error) {
        console.log(error);
        alert(`Error placing an order for the product with the ID ${item.productId}`)
        return
      }
    }

    console.log(success, cart.items.length)
    if (success === cart.items.length && success > 0) {
      // clear cart
      const clearRes = await axios.delete("http://localhost:3000/api/cart/clear")
      setCart([]);

      alert("All orders successfully placed!")
    }
  }

  return (
    <>
    <div className='bg-eggshell min-h-screen px-5 pt-32 pb-5'>
      <div className="mx-auto max-w-7xl">
        <label className = "text-2xl text-gunmetal lato-bold">Your Shopping Cart</label>
        <div className="flex gap-1">
          <div>Total Number of Items:</div> 
          <div>
            {
              cart?.items?.length > 0 ? (
                cart.items.map((item)=>item.quantity).reduce(
                  (accumulator, currentValue) => accumulator + currentValue
                )
              ) : (
                0
              )
            }
          </div>
        </div>
        {/* Cart products header */}
        {
          cart?.items?.length > 0 &&
          <div className=" hidden lg:flex w-3/5 poppins-regular">
            <p className="flex px-28 border-solid "> PRODUCT</p>
            <p className="flex flex-1 justify-center "> QTY</p>
            <p className="flex flex-1 pl-16 "> TOTAL</p>
          </div>
        }
        <div className="flex flex-col gap-6 lg:flex-row min-h-[calc(100vh-18rem)]">
          {/* CART PRODUCTS */} 
          <div className = 'w-full lg:w-2/3 lg:max-h-[500px] lg:overflow-y-scroll no-scrollbar'>
            {
              cart?.items?.length > 0 ? (
                cartProducts.map((product) => {
                  return <CartProductCard product={product} updateCart={handleUpdateCart} key={product._id}/>
                })
              ) : (
                <div className="flex-1 h-full flex flex-col items-center justify-center gap-3 content-center">
                  <h1 className="text-4xl">
                    Your cart is currently empty
                  </h1>
                  <NavLink to="/products">
                    <button className="btn bg-tea-green text-midnight-green border-none hover:bg-periwinkle">
                      Browse products
                    </button>
                  </NavLink>
                </div>
              )
            }
          </div>
          {/* Cart summary + checkout */}
            <div className="bg-alabaster lg:w-2/5 border border-solid border-space-cadet rounded-md p-5 shadow-lg">
              <h1 className="text-3xl lato-bold "> Order summary</h1>
              <div className="flex justify-between text-xl poppins-regular my-10">
                <h2> Total </h2>
                <h2> ${checkoutTotal}</h2>
              </div>
                <button 
                  className="btn w-full bg-midnight-green text-white text-xl poppins-regular hover:bg-periwinkle" 
                  onClick={handleCheckout}
                > 
                  Proceed to checkout
                </button>
            </div>
        </div>
      </div>
      
    </div>
    </>
    
  )
}

export default UserCart