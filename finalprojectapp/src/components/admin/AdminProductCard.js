import React from 'react'

const AdminProductCard = ({ product }) => {
  return (
    <div className="card w-80 bg-white shadow-xl" key = {product._id} id = {product.name}>
        <figure className="object-fill w-80 h-60"><img src={product.image} alt={product.title} className = "h-80"/></figure>
        <div className="card-body">
            <div className = 'flex flex-col flex-wrap'>
              <div className="flex justify-between">
                <h2 className="card-title lato-bold">{product.name}</h2>
                <h3> ${product.price}</h3>
              </div>
                <div className="bg-periwinkle w-fit px-4 py-1 rounded-3xl mb-4">
                  <p className="text-xs poppins-regular">
                    {product.type}
                  </p>
                </div>
                <p className = "poppins-regular">{product.description}</p>
                <p className="text-xs poppins-regular"> {product.quantity} left</p>
            </div>
            
        </div>
    </div>
  )
}

export default AdminProductCard
