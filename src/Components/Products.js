import React,{useState, useEffect, useContext} from 'react';
import Product from './Product';
import contents from './contents';
import { CartContext } from '../CartContext';
const url = 'products.json';
const Products = () => {
    // const {name} = useContext(CartContext);
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetch(url
          ,{
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          }
        )
        .then(response=>{
          // console.log(response);
          return response.json();
        })
        .then(products=>{
          setProducts(products)
          // console.log(products);
        });
    },[]);

  return (
    <div className="container px-10 pb-24">
        <h1 className='text-lg font-bold my-8'>Products </h1>
        <div className="grid grid-cols-5 my-8 gap-24">
            {
              products.map(product=><Product key={product._id} product={product}/>)
            }
        </div>
    </div>
  )
}

export default Products;