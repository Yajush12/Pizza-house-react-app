import {useContext,useState,useEffect} from 'react'
import {CartContext} from '../CartContext';
import {Link} from 'react-router-dom';
const url = './products.json';

const Cart = () => {
  const {cart,setCart} = useContext(CartContext);
  // console.log(cart);

  const [products,setProducts]= useState([]);
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

  
  let total=0;
  const increment=(productId)=>{
    // const oldQty=cart.items[productId];
    const _cart={...cart};
    _cart.items[productId]+=1;
    _cart.totalItems+=1;
    setCart(_cart);
  }

  const decrement = (productId)=>{
    const _cart={...cart};
    // if(_cart.items[productId]===1)
    // { 
    //   return;
    // }
    _cart.items[productId]-=1;
    _cart.totalItems-=1;
    setCart(_cart);
    
  } 

  const totalsingle=(qty,price)=>{
    total+=qty*price;
    return qty*price;
  }

  const handleDelete=(productId,pName)=>{
    var answer = window.confirm('Are You Sure U Want To Delete '+ pName + ' From Cart?')
    if (answer) {
      const _cart={...cart};
      const qty = _cart.items[productId];
      delete _cart.items[productId];
      _cart.totalItems-=qty;
      setCart(_cart);
    }
    // setProducts(products.filter((product)=>product._id!==productId)); 
  }

  const handleOrderNow=()=>{
    window.alert('Order Placed Successfully!');
    setProducts([]);
    setCart({});
  }

  return (
    cart.totalItems?
    <div className='container mx-auto lg:w-1/2 w-full pb-24'>
      <h1 className='text-lg font-bold my-12'>Cart Items</h1>
      <ul>
        {
        
        products.map((content,i)=> {
          var product=content;
          if(cart.items[product._id]){

            return (
              
              <li className='mb-12 justify-between' key={i}>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <img className='h-16' src={content.image} alt='selectedPizza'/>
                  <span className='font-bold ml-4 w-48'>{content.name}</span>
                </div>
                <div className='flex items-center'>
                  <button onClick={()=>{decrement(product._id)}} className='bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full leading-none'>-</button>
                  <b className='px-4'>{cart.items[product._id]}</b>
                  <button onClick={()=>{increment(product._id)}} className='bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full leading-none'>+</button>
                </div >
                <span>₹{totalsingle(cart.items[product._id],product.price)}</span>
    
                <button onClick={()=>{handleDelete(product._id,product.name)}} className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full leading-none text-white'>Delete</button>
              </div>
            </li>

          )
        }
      })
        
      
      }
      </ul>

      <hr className='my-6'/>

      <div className='text-right'>
        <b>Grand Total:</b> ₹{total}
        <div>
          <button onClick={handleOrderNow} className=' mt-6 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full leading-none'>Order Now</button>
        </div>
      </div>

    </div>
    :
    <div className='flex'>
      <img className='ma-auto w-1/2 mt-12' src="/images/empty-cart.png" alt="Empty Cart"></img>
      <Link to="/products">
        <button className="px-6 py-2 rounded-full text-white 
        font bold ml-15 mt-20 bg-yellow-500 hover:bg-yellow-600 ">Order Now</button>
      </Link>
    </div>
  )
}

export default Cart