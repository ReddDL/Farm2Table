import React from 'react'
import ProductCard2 from '../../components/user/ProductCard2';

const UserProducts = () => {
    var items = 0;

    // apply sort logic

  return (
    <>
    <div className='bg-eggshell flex flex-col px-8 lg:px-32 md:px-24 sm:px-10 pt-32'>
    <div className = 'flex justify-center mb-10'>
      <h1 className='text-midnight-green text-4xl'>Welcome to our shop</h1>
    </div>
    
        <div className='flex poppins-regular items-center gap-4'>
            <div>
                <label htmlFor="filter">Filter by: </label>
                <select name="filter" id="filter" className='bg-midnight-green text-white px-2 py-1 rounded-lg mr-3'>
                    <option value="name">Name</option> 
                    <option value="price">Price</option>
                    <option value="type">Type</option>
                    <option value="quantity">Quantity</option>
                </select>
                </div>
            <div>
                <label htmlFor="sort" >Sort by: </label>
                <select name="sort" id="sort" className='bg-midnight-green text-white px-2 py-1 rounded-lg'>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>
            <button onClick={filter}className='bg-midnight-green text-white px-3 py-1 rounded-lg'> Apply </button>
        </div>
        <div className='product bg-alabaster min-h-screen p-5 mb-5 rounded-xl mt-4 flex flex-col justify-center items-center'>
            <div className = 'flex flex-row justify-center mb-16 items-center'>
                <label className = "text-3xl mr-16">Number of Items Added to Cart: {items}</label>
                <button className = "text-3xl bg-midnight-green w-96 h-12 rounded-xl">Proceed to Checkout</button>
            </div>

            
            <div className = 'flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap gap-10 justify-center' id = 'product'>
                {Products.map((product)=>
                    <ProductCard2 data={product} key = {product.id}/>
                )}
            </div>

            
            
            
        </div>

        
    </div>
    </>
  )
}


const filter = (event) =>{
    var products = []
    // console.log(Product1)
    let sortValue = document.getElementById("sort");
    let filterValue = document.getElementById("filter");
    // console.log(document.getElementById("sort"));
    //console.log(document.getElementById("product"));
    //console.log(document.getElementById("product").children[0].childNodes[1].children[0].innerText);
    let object = document.getElementById("product")
    //console.log(object.children.length)
    console.log(object.children[1].childNodes[0].childNodes[0].attributes[0].nodeValue)
    console.log(object.children[1])
    for (let i=0; i<object.children.length; i++){


        // Code below is the directory to the value sent to productsCard2 in the console
        // object.children[i].childNodes[1].children[0] ; children[0] on the last part because first element of card
        let title = object.children[i].childNodes[1].children[0].innerText;
        let price = object.children[i].childNodes[1].children[2].innerText;
        let description = object.children[i].childNodes[1].children[1].innerText;
        let imageSrc = object.children[i].childNodes[0].childNodes[0].attributes[0].nodeValue
        // Creates a new instance of object
        var productMade = Product.create(title, price, description, imageSrc)

        products.push(productMade)

    }

    
    const container = document.querySelector('#product')
    // removeAllChildNodes(container)

    if (filterValue.value ==="price" &&sortValue.value ==="ascending"){
        products.sort((a,b)=>a.price-b.price);
    } else if (filterValue.value ==="price" && sortValue.value ==="descending"){
        products.sort((a,b)=>b.price-a.price);
    } else if (filterValue.value ==="name" && sortValue.value ==="ascending"){
        products.sort((a,b)=>a.title.localeCompare(b.title));
    } else if (filterValue.value ==="name" && sortValue.value ==="descending"){
        products.sort((a,b)=>b.title.localeCompare(a.title));
    }
    
    

    for(let i=0; i<products.length; i++){
        const node = document.createElement("li");
        const textnode = document.createTextNode(products[i].title);
        node.appendChild(textnode);
        object.children[i].childNodes[1].children[0].innerText = products[i].title
        object.children[i].childNodes[1].children[1].innerText = products[i].description
        object.children[i].childNodes[1].children[2].innerText = products[i].price
        object.children[i].childNodes[0].childNodes[0].attributes[0].nodeValue = products[i].imageSrc
        object.children[i].childNodes[0].childNodes[0].attributes[1].nodeValue = products[i].title // This is for alt in image
        object.children[i].attributes[1].nodeValue = products[i].title // This is for alt in image
    }
}


const Product = { //Creates Product
    title: "",
    price: 0,
    create: function (x, y, z, a) {
      const newPoint = Object.create(this);
      newPoint.title = x;
      newPoint.price = y;
      newPoint.description= z;
      newPoint.imageSrc = a;
      
      return newPoint;
    }
};


const Products = [
    {
        title: "Cartridge", 
        price: "3000", 
        description: "This is the best food in town!!",
        image : require('../../images/ProductImage/cartridge.png'),
        key : 1
    
    },

    {
        title: "Rice Cooker", 
        price: "5000", 
        description: "This is a drink, I will drink it",
        image : require('../../images/ProductImage/rice_cooker.png'),
        key : 2
    },

    {
        title: "Pancit Canton", 
        price: "4000", 
        description: "This is a food, I will eat it",
        image : require('../../images/ProductImage/pancit_canton.png'),
        key : 3
    }

    
]




export default UserProducts