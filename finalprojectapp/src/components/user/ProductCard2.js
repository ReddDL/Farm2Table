import React from 'react'

const ProductCard2 = (prop) => {
  let attributes = prop.data;
  return (
    <div className="card w-80 bg-white shadow-xl" key = {attributes.key} id = {attributes.title}>
        <figure className="object-fill w-80 h-60"><img src={attributes.image} alt={attributes.title} className = "h-80"/></figure>
        <div className="card-body">
            <h2 className="card-title">{attributes.title}</h2>
            <p>{attributes.description}</p>
            <h4>{attributes.price}</h4>
            <button className = "bg-tea-green h-10 mt-3 rounded-lg text-oxford-blue">ADD TO CART</button>
        </div>
    </div>
  )
}

export default ProductCard2
