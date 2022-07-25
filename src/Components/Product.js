import React,{useContext, useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import {CartContext} from '../CartContext';
import {FavContext} from '../FavContext';

const Product = (props) => {
  // console.log(props);
  const {product}=props;
  
  const {cart, setCart} = useContext(CartContext);
  
  const [isAdded, setIsAdded]=useState(false);

  const{fav,setFav}=useContext(FavContext);
  
  
  const addToCart = (event,product) => {
    event.preventDefault(); //to stop redirecting when add is clicked
    // console.log(event,product);
    let _cart={...cart};
    if(!_cart.items){
      _cart.items={};
    }
    if(_cart.items[product._id]){
      _cart.items[product._id] += 1;
    }else{ 
      _cart.items[product._id] = 1;
    }

    if(!_cart.totalItems)
    {
      _cart.totalItems=0;
    }
   
    _cart.totalItems+=1;
    console.log(_cart);
    setCart(_cart);

    setIsAdded(true);
    
    setTimeout(() => {
      setIsAdded(false);
    }, 1000);

  }
  const addToFav = (event,product) => {
    event.preventDefault(); //to stop redirecting when add is clicked
    // console.log(event,product);
    let _fav={...fav};
    if(!_fav.items){
      _fav.items={};
    }
    
    if(_fav.items[product._id]){
      _fav.items[product._id] = false;
    }else{ 
      _fav.items[product._id] = true;
    }
    if(!_fav.totalItems)
    {
      _fav.totalItems=0;
    }
    if(_fav.items[product._id] === true)
    {
      _fav.totalItems+=1;
    }else{
      _fav.totalItems-=1;
    }
    console.log(_fav);
    setFav(_fav);

  }
 
  
  // if(fav.items[product._id]){
  //   isFav = false;
  // }else{ 
  //   isFav = true;
  // }

  return (
    <Link to = {`/products/${product._id}`}>

    <div>
      
        <img src={product.image} alt="peproni" ></img>
        <div className='text-right'>
            <button  onClick={(e)=>{addToFav(e,product)}} className={`${(fav.items && fav.items[product._id])?'bg-red-600':'bg-gray-200 hover:bg-red-400'} py-1 px-4 rounded-full font-bold`}>
              ♥
            </button>
        </div>
        <div className='text-center'>
            <h2 className='text-lg font-bold py-2'>{product.name}</h2>
            <span className='bg-gray-200 py-1 rounded-full text-sm px-4'>{product.size}</span>
        </div>
        <div className="flex justify-between items-center mt-4">
            <span>₹{product.price}</span>
            <button disabled={isAdded} onClick={(event) => { addToCart(event,product) }} className={`${isAdded?'bg-green-500':'bg-yellow-500 hover:bg-yellow-600'} py-1 px-4 rounded-full font-bold`}>
                    ADD{isAdded?'ED':''}
            </button>

                
        </div>
    </div>

    </Link>
  )
}

export default Product