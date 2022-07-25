import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import Navigation from './Components/Navigation'; 
import Cart from './pages/Cart';  
import SingleProduct from './pages/SingleProduct';
import {CartContext} from './CartContext';
import { useEffect, useState } from 'react';
import {FavContext} from './FavContext';
import Favourites from './pages/Favourites';

function App(){
    const[cart, setCart] = useState({});

    useEffect(()=>{
        const cart = window.localStorage.getItem('cart');
        setCart(JSON.parse(cart));
    },[])

    useEffect(()=>{
        window.localStorage.setItem('cart',JSON.stringify(cart ));

    },[cart])

    const[fav, setFav] = useState({});
    
    useEffect(()=>{
        const fav = window.localStorage.getItem('fav');
        setFav(JSON.parse(fav));
    },[])
    useEffect(()=>{
        window.localStorage.setItem('fav',JSON.stringify(cart));
    },[fav])

    return (
        <>
            
            <Router>
                <CartContext.Provider value={{cart, setCart}}>
                <FavContext.Provider value={{fav,setFav}}>
                    <Navigation />
                    <Routes>
                        <Route exact path="/" element={<Home />} ></Route>
                        <Route exact path="/products" element={<ProductsPage />} ></Route>
                        <Route exact path="/products/:_id" element={<SingleProduct />}></Route>
                        <Route path="/cart" element={<Cart />}></Route>
                        <Route path="/favourites" element={<Favourites/>}></Route>
                    </Routes>
                </FavContext.Provider>
                </CartContext.Provider>
            </Router>
        </>
    );
}

export default App;