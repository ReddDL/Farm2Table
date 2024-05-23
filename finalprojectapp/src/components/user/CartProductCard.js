import { faCross, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";

export default function CartProductCard ({ product, updateCart }) {
  const {name, type, price} = product;
  const [quantity, setQuantity] = useState(product["quantity"]);
  const [showInput, setShowInput] = useState(false);

  const products = [
    {
        name: "product1",
        description: "desc1",
        type: 'crop',
        price: 12,
        quantity: 1
    },
    {
        name: "product2",
        description: "desc2",
        type: 'poultry',
        price: 20,
        quantity: 10
    },
    {
        name: "product3",
        description: "desc3",
        type: 'crop',
        price: 300,
        quantity: 100
    }
  ]

  function addQuantity() {
    setQuantity(quantity+1);
  }

  function subQuantity() {
    if (quantity > 1) {
      setQuantity(quantity-1);
    } 
  }

  useEffect(() => {
    updateCart({...product, quantity})
    console.log("nani")
  }, [quantity])

  return (
    <div className="flex-1 flex rounded-[20px] bg-white text-space-cadet p-5 my-5">
      <div className="flex flex-col flex-1">
        <div className="badge bg-midnight-green text-eggshell font-bold">
          { type.toUpperCase() }
        </div>
        <p className="font-bold text-xl">
          { name }
        </p>
        {/* <p>
          { description }
        </p> */}
      </div>
      <div className="flex-1 flex ">
        <div className="flex items-center justify-start">
          <div className="divider divider-horizontal"></div>
            <div className="flex gap-10 justify-center items-center">
              <FontAwesomeIcon icon={faMinus} onClick={subQuantity} className="btn btn-ghost btn-xs p-2" />
              <div className={`text-lg w-10 text-center`} onClick={() => setShowInput(true)}>
               { quantity }
              </div>
              <FontAwesomeIcon icon={faPlus} onClick={addQuantity} className="btn btn-ghost btn-xs p-2"/>
            </div>
          <div className="divider divider-horizontal"></div>
        </div>
      </div>
      <div className="flex-1 text-lg place-content-center text-center max-w-20">
        ₱ { price*quantity }
      </div>
    </div>
  )
}