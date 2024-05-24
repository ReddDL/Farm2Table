import { faCross, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";

export default function CartProductCard ({ product, updateCart }) {
  const {_id, name, type, price, image} = product;
  console.log("card", product)
  const [orderQuantity, setOrderQuantity] = useState(product["orderQuantity"]);
  const [showInput, setShowInput] = useState(false);

  const products = [
    {
        name: "product1",
        description: "desc1",
        type: 'crop',
        price: 12,
        orderQuantity: 1
    },
    {
        name: "product2",
        description: "desc2",
        type: 'poultry',
        price: 20,
        orderQuantity: 10
    },
    {
        name: "product3",
        description: "desc3",
        type: 'crop',
        price: 300,
        orderQuantity: 100
    }
  ]

  function addOrderQuantity() {
    setOrderQuantity(orderQuantity+1)
    updateCart({productId: _id, quantity: 1})
  }

  function subOrderQuantity() {
    if (orderQuantity > 1) {
      setOrderQuantity(orderQuantity-1)
      updateCart({productId: _id, quantity: -1})
    } 
  }

  // useEffect(() => {
  //   updateCart({_id, orderQuantity})
  // }, [orderQuantity])

  return (
    <div className="flex-1 flex rounded-[20px] bg-white text-space-cadet p-5 my-5">
      <div className="flex flex-1 font-bold text-xl gap-5 items-center">
        {/* <div className="badge bg-midnight-green text-eggshell font-bold">
          { type.toUpperCase() }
        </div> */}
        <img src={image} className = "size-20"/>
        { name }
        
        {/* <p>
          { description }
        </p> */}
      </div>
      <div className="flex-1 flex ">
        <div className="flex items-center justify-start">
          <div className="divider divider-horizontal"></div>
            <div className="flex gap-10 justify-center items-center">
              <FontAwesomeIcon icon={faMinus} onClick={subOrderQuantity} className="btn btn-ghost btn-xs p-2" />
              <div className={`text-lg w-10 text-center`} onClick={() => setShowInput(true)}>
               { orderQuantity }
              </div>
              <FontAwesomeIcon icon={faPlus} onClick={addOrderQuantity} className="btn btn-ghost btn-xs p-2"/>
            </div>
          <div className="divider divider-horizontal"></div>
        </div>
      </div>
      <div className="flex-1 text-lg place-content-center text-center max-w-20">
        ₱ { price*orderQuantity }
      </div>
    </div>
  )
}