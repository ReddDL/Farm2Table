import React from 'react'
import ProductCard2 from '../../components/ProductCard2';

const UserProducts = () => {

    // apply sort logic

  return (
    <>
    <div className='bg-eggshell flex flex-col px-8 lg:px-32 md:px-24 sm:px-10 pt-32'>
    <div className = 'flex justify-center mb-10'>
      <h1 className='text-midnight-green text-4xl'>Welcome to our shop</h1>
    </div>
    
    <div className='flex poppins-regular items-center gap-4'>
        <div>
            <label for="filter">Filter by: </label>
            <select name="filter" id="filter" className='bg-midnight-green text-white px-2 py-1 rounded-lg mr-3'>
                <option value="name">Name</option> 
                <option value="price">Price</option>
                <option value="type">Type</option>
                <option value="quantity">Quantity</option>
            </select>
            </div>
        <div>
            <label for="sort" >Sort by: </label>
            <select name="sort" id="sort" className='bg-midnight-green text-white px-2 py-1 rounded-lg'>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
        </div>
        <button onClick={filter}className='bg-midnight-green text-white px-3 py-1 rounded-lg'> Apply </button>
    </div>
        <div id="product" className='product bg-alabaster min-h-screen p-5 mb-5 rounded-xl mt-4 flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap gap-10 justify-center'>
            <ProductCard2 data={Product1}/>
            <ProductCard2 data={Product2}/>
            <ProductCard2 data={Product3}/>
        </div>
      </div>
    </>
  )
}



function removeAllChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

const filter = (event) =>{
    var products = []
    // console.log(Product1)
    let sortValue = document.getElementById("sort");
    let filterValue = document.getElementById("filter");
    console.log(document.getElementById("sort"));
    //console.log(document.getElementById("product"));
    //console.log(document.getElementById("product").children[0].childNodes[1].children[0].innerText);
    let object = document.getElementById("product")
    //console.log(object.children.length)

    
    for (let i=0; i<object.children.length; i++){


        // Code below is the directory to the value sent to productsCard2 in the console
        // object.children[i].childNodes[1].children[0] ; children[0] on the last part because first element of card
        let title = object.children[i].childNodes[1].children[0].innerText;
        let rating = object.children[i].childNodes[1].children[2].innerText;
        
        // Creates a new instance of object
        var productMade = Product.create(title, rating)

        products.push(productMade)

    }

    
    const container = document.querySelector('#product')
    // removeAllChildNodes(container)

    if (filterValue.value ==="quantity" &&sortValue.value ==="ascending"){
        products.sort((a,b)=>a.rating-b.rating);
    } else if (filterValue.value ==="quantity" && sortValue.value ==="descending"){
        products.sort((a,b)=>b.rating-a.rating);
    } else if (filterValue.value ==="name" && sortValue.value ==="ascending"){
        products.sort((a,b)=>a.title.localeCompare(b.title));
    } else if (filterValue.value ==="name" && sortValue.value ==="descending"){
        products.sort((a,b)=>b.title.localeCompare(a.title));
    }
    
    console.log(products)

    for(let i=0; i<products.length; i++){
        const node = document.createElement("li");
        const textnode = document.createTextNode(products[i].title);
        node.appendChild(textnode);
        object.children[i].childNodes[1].children[0].innerText = products[i].title
        object.children[i].childNodes[1].children[2].innerText = products[i].rating
    }
}


const Product = { //Creates Product
    title: "",
    rating: 0,
    create: function (x, y) {
      const newPoint = Object.create(this);
      newPoint.title = x;
      newPoint.rating = y;
      return newPoint;
    }
};

const Product1 =
    {
        title: "Darrots", rating: "3"
    }



const Product2 =
    {
        title: "Ceas", rating: "5"
    }



const Product3 =
    {
        title: "Ereen Beans", rating: "4"
    }



export default UserProducts