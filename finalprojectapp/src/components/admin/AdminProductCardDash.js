import {React, useState, useEffect} from 'react';
import axios from 'axios';

const AdminProductCardDash = ({ product }) => {

    const [productData, setProductData] = useState({});

    useEffect(() => {
        async function fetchProduct() {
          try {
            const res = await axios.get(`http://localhost:3000/api/products/view/${product.key}`);
            console.log(res.data)
            setProductData(res.data);
          } catch (error) {
            console.log("Error fetching product data");
          }
        }
        fetchProduct();
      }, [product.key]);

  return (
    <tr className='text-center poppins-regular'>
        <td>
            <div className='h-20 w-20 bg-periwinkle rounded-xl flex items-center justify-center'>
                <img src={productData.image} alt={productData.name} className='h-full w-full object-cover rounded-xl' />
            </div>
        </td>
        <td className='poppins-bold'>{product.productName}</td>
        <td> { product.quantitySold} </td>
        <td>${product.income}</td>
    </tr>
  );
};

export default AdminProductCardDash;