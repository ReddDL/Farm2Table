// import { useOutletContext } from "react-router-dom";

import { useEffect, useState } from "react";
import CartProductCard from "../../components/user/CartProductCard"
import axios from "axios";

// import CartProductCard from '../../components/user/CartProductCard.js'
const UserCart = () => {
  const { firstName, lastName, email } = JSON.parse(localStorage.getItem('user'))
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  
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
        console.log('hip')
      } catch (error) {
        console.log('eror')
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
        console.log('hip')
      } catch (error) {
        console.log('eror')
        switch (error?.response?.status) {
          case 500:
            console.log("Error updating cart")
        }
      }
    }

    console.log("nc", newCart)
    // update state variable
    setCart(newCart);

    
  }
  // fetch details of products in cart
  useEffect(() => {
    console.log("cartooo", cart)
    async function fetchProducts() {
      try { 
        const products = cart.items;
        // placeholder variable for product data
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
  
  // update checkout total
  useEffect(() => {
    console.log("products", cartProducts)
    if (cartProducts?.length > 0) {
      // get total price of each product given unit price and order quantity 
      const cartPrices = cartProducts.map(({price, orderQuantity}) => price*orderQuantity)

      console.log(cartPrices)
      // summation of cart prices
      const cartTotal = cartPrices.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
      setCheckoutTotal(cartTotal);
    }
  }, [cart, cartProducts])

  // save order upon checkout
  async function handleCheckout () {
    console.log(cart.items)
    try { 
      const res = await axios.post("http://localhost:3000/api/orders/create", {
        items: cart.items,
        email
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

  return (
    <>
    <div className='bg-eggshell min-h-screen flex flex-row px-8 lg:px-32 md:px-24 sm:px-10 pt-32'>
      {/* Cart products */}
      <div className = 'w-2/3'>
        <label className = "text-2xl text-gunmetal">Your Shopping Cart</label>
        {
          cart?.items?.length > 0 ? (
            cartProducts.map((product) => {
              // const productInfo = fetchProduct(product.productId);
              return <CartProductCard product={product} updateCart={handleUpdateCart} key={product._id}/>
            })
          ) : (
            "Your cart is currently empty"
          )
        }
      </div>
      {/* Cart summary + checkout */}
      <div className = 'w-1/3 m-10 flex'>
        <div className="flex-1 flex flex-col rounded-box bg-white">
          <div className="flex flex-1 p-10 text-center items-center justify-between text-2xl text-black">
            <div>
              Total:
            </div> 
            <div>
              $ {checkoutTotal}
            </div>
          </div>
          <button className="btn m-10" onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default UserCart