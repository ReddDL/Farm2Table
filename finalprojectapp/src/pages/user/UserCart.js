// import { useOutletContext } from "react-router-dom";
// import CartProductCard from '../../components/user/CartProductCard.js'
const UserCart = () => {
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

  return (
    <>
    <div className='bg-eggshell flex flex-row px-8 lg:px-32 md:px-24 sm:px-10 pt-32'>
      <div className = 'w-1/2'>
        <label className = "text-2xl text-gunmetal">Your Shopping Cart</label>
      </div>
      <div className = 'w-1/2'>
        2nd div
      </div>

    </div>
    </>
    
  )
}

export default UserCart