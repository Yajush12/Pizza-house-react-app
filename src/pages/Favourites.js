import {useContext,useState,useEffect} from 'react'
import {CartContext} from '../CartContext';
import {FavContext} from '../FavContext';
import {Link} from 'react-router-dom';

const url = './products.json';
const Favourites = () => {
    const [products,setProducts]=useState([]);
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

    const{fav,setFav}=useContext(FavContext);
    const{cart,setCart}=useContext(CartContext);
    const increment=(productId)=>{
        const _cart={...cart};
        if(!_cart.items)
        {
            _cart.items={};
        }
        if(_cart.items[productId]){
            _cart.items[productId] += 1;
          }else{ 
            _cart.items[productId] = 1;
          }
        if(!cart.totalItems)
        {
            _cart.totalItems=0;
        }
        _cart.totalItems+=1;
        setCart(_cart);
      }
      const handleDelete=(productId,pName)=>{
        var answer = window.confirm('Are You Sure U Want To Delete '+ pName + ' From Favourites?')
        if (answer) {
        const _fav={...fav};
        delete _fav.items[productId];
        _fav.totalItems-=1;
        setFav(_fav);
        }
        // setProducts(products.filter((product)=>product._id!==productId)); //doubt why are we changing our product array
      }
  return (
    !fav.totalItems?
    <div className=' text-center'>
        <h1  className='text-xl font-bold my-8 '>You Have No Favourites </h1>
        <Link to="/products">
            <button className="px-6 py-2 rounded-full text-white 
            font bold mt-4 bg-yellow-500 hover:bg-yellow-600 ">Explore Favourites</button>
        </Link>
    </div>
    :
    <div>
        <div className="container mx-auto lg:w-1/2 w-full pb-24">
            <h1 className='text-lg font-bold my-8'>Favourites </h1>

        <ul>
        {
        
        products.map((content,i)=> {
          var product=content;
          if(fav.items[product._id]){

            return (
              
              <li className='mb-12 justify-between' key={i}>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <img className='h-16' src={content.image} alt='selectedPizza'/>
                  <span className='font-bold ml-4 w-48'>{content.name}</span>
                </div>
                
                
                <button onClick={()=>{increment(product._id)}} className='bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full leading-none'>Add To Cart</button>
                <span>₹{product.price}</span>
    
                <button onClick={()=>{handleDelete(product._id,product.name)}} className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full leading-none text-white'>Delete</button>
              </div>
            </li>

          )
        }
      })
        
      
      }
      </ul>

        </div>    

    </div>
  )
}

export default Favourites