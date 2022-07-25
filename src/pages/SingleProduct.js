import React,{useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {CartContext} from '../CartContext';
import {FavContext} from '../FavContext';
const url = '../products.json';
const SingleProduct = () => {

    const params=useParams();
    // console.log(params);
    const navigate= useNavigate();
    const {cart,setCart}=useContext(CartContext);
    const [added, setAdded]=useState(false);
    
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

  const addToCart=(itemId)=>{
    let _cart={...cart};
    if(!_cart.items){
      _cart.items={};
    }
    if(_cart.items[itemId]){
      _cart.items[itemId]+=1;
    }else{
      _cart.items[itemId]=1;
    }
    if(!_cart.totalItems){
      _cart.totalItems=0;
    }
    _cart.totalItems+=1;
    
    setCart(_cart);

    setAdded(true);
    setTimeout(()=>{
      setAdded(false);
    },1000);
  }
  
  const{fav,setFav}=useContext(FavContext);
  const addToFav = (event,item) => {
    event.preventDefault(); //to stop redirecting when add is clicked
    // console.log(event,item);
    let _fav={...fav};
    if(!_fav.items){
      _fav.items={};
    }
    
    if(_fav.items[item._id]){
      _fav.items[item._id] = false;
    }else{ 
      _fav.items[item._id] = true;
    }
    if(!_fav.totalItems)
    {
      _fav.totalItems=0;
    }
    if(_fav.items[item._id] === true)
    {
      _fav.totalItems+=1;
    }else{
      _fav.totalItems-=1;
    }
    console.log(_fav);
    setFav(_fav);

  }
 
    
    var item='';
    for(let i=0;i<products.length;i++)
    {
        if(params._id===products[i]._id)
        {
            item=products[i];
        }
    }
    // console.log(item.name);

  return (
    <div className='container px-20 mt-12'>
        <button className='mb-12 font-bold hover:bg-slate-200' onClick={()=>{navigate(-1)}}>Back</button>
        <div className='flex'>
            <img src={item.image} alt='PizzA'></img>
            <div className='ml-16'>
              <div className='flex justify-between'>
                <h1 className='text-xl font-bold'>{item.name}</h1>
                <button  onClick={(e)=>{addToFav(e,item)}} className={`${(fav.items && fav.items[item._id])?'bg-red-600':'bg-gray-200 hover:bg-red-400'} py-1 px-4  ml-4 rounded-full font-bold`}>
                ♥
              </button>
              </div>
                <div className='text-md '>{item.size}</div>
                <div className='font-bold mt-2'>₹ {item.price}</div>
                <button disabled={added} onClick={()=>{addToCart(item._id)}} className={`${added?'bg-green-500':'bg-yellow-500 hover:bg-yellow-600'} py-1 px-8 rounded-full font-bold mt-4`}>
                  {added?'Added':'Add to Cart'}</button>
            </div>
        </div>
    </div>
  )
}

export default SingleProduct