import React from 'react'

const ProductCard2 = (prop) => {
  let attributes = prop.data;
  return (
    <div className="card w-80 bg-white shadow-xl">
        <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
        <div className="card-body">
            <h2 className="card-title">{attributes.title}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <h4>{attributes.rating}</h4>
        </div>
    </div>
  )
}

export default ProductCard2
