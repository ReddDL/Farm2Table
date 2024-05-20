import React from 'react'

const AdminProductCard = ({ product }) => {
  return (
    <div className="card w-80 bg-white shadow-xl">
      <figure><img src={product.image} alt={product.name} /></figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>Price: ${product.price}</p>
        <p>Type: {product.type}</p>
        <p>Quantity: {product.quantity}</p>
      </div>
    </div>
  )
}

export default AdminProductCard
