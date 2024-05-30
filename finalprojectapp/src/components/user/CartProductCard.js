import { faCross, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";

export default function CartProductCard ({ product, updateCart }) {
  // destructure product info
  const {_id, name, type, price, image} = product;
  // state variables
  const [orderQuantity, setOrderQuantity] = useState(product["orderQuantity"]);
  const [showInput, setShowInput] = useState(false);

  // increment order quantity
  function addOrderQuantity() {
    setOrderQuantity(orderQuantity+1)
    // updateCart({productId: _id, quantity})
  }

  // decrement order quantity
  function subOrderQuantity() {
    if (orderQuantity > 1) {
      setOrderQuantity(orderQuantity-1)
      // updateCart({productId: _id, quantity})
    } 
  }

  // decrement order quantity
  function deleteItem() {
    updateCart({_id, orderQuantity: 0})
  }

  // update cart when order quantity changes
  useEffect(() => {
    updateCart({_id, orderQuantity})
  }, [orderQuantity])

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col lg:flex-row rounded-md bg-eggshell text-space-cadet p-5 my-2 border border-solid border-space-cadet lg:divide-x-2 divide-space-cadet" >
        {/* Product image and name */}
        <div className="flex items-center flex-initial w-64">
          <div className='h-20 w-20 bg-periwinkle rounded-xl flex items-center justify-center'>
            <img src={product.image} alt={product.name} className='h-full w-full object-cover rounded-xl' />
          </div>
          <p className="text-xl poppins-regular ml-6"> {name} </p>
        </div>
        <div className="flex-1 flex ">
          {/* Order Quantity */}
          <div className="flex items-center w-full justify-center px-5">
              <div className="flex gap-10 justify-center items-center">
                <FontAwesomeIcon icon={faMinus} onClick={subOrderQuantity} className="btn btn-ghost btn-xs p-2" />
                <div className={`text-lg w-10 text-center`} onClick={() => setShowInput(true)}>
                { orderQuantity }
                </div>
                <FontAwesomeIcon icon={faPlus} onClick={addOrderQuantity} className="btn btn-ghost btn-xs p-2"/>
              </div>
          </div>
        </div>
        {/* Total Price of Product */}
        <div className="flex-1 flex flex-row text-lg text-center items-center justify-between">
          <p className="ml-6">$ { price*orderQuantity } </p>
          <FontAwesomeIcon icon={faTrash} className="btn btn-ghost size-5" onClick={deleteItem}/>
        </div>
      </div>
    </div>
    
  )
}