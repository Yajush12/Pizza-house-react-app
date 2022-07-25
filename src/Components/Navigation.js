import {useContext, useState} from 'react';
import {CartContext} from '../CartContext';
import {Link} from 'react-router-dom';
const Navigation = () => {
    
    const {cart} = useContext(CartContext);

    const cartStyle={
        background:'#F59E0D',
        display:'flex',
        padding:'6px 12px',
        borderRadius: '50px'
    }
    
  return (
    <nav className='container px-10 flex justify-between items-center py-4'>
        {/* <div > */}
            <Link to="/">
                <img style={{height:45}} src="/images/logo.png" alt="logo"></img>
            </Link>
        {/* </div> */}
        <ul className="flex items-center">

            <li >
            <Link to="/">Home</Link>
            </li>

            <li className = "ml-6 hover:'gray" >
                <Link to="/products">Products</Link>
            </li>

            <li className = "ml-6 hover:'gray" >
                <Link to="/favourites">Favourites</Link>
            </li>

            <li className = "ml-6">
                <Link to="/cart">
                    <div style={cartStyle}>
                        <span >{cart.totalItems}</span>
                        <img className="ml-2" src="/images/cart.png" alt="cart-icon"></img>
                    </div> 
                </Link>
            </li>

        </ul>
        
    </nav>
  )
}

export default Navigation;
