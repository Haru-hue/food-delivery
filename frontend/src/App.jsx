import Home from './layouts/Home'
import Menu from './layouts/Menu'
import './App.scss'
import Cart from './layouts/Cart'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

function App() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems") || "[]")
  );
  const [totalItems, setTotalItems] = useState(cartItems.length); 
  
  const deleteCartItem = (id, count) => {
    const filteredItems = cartItems.filter((item) => item !== id);
    setCartItems(filteredItems);
    setTotalItems((prevTotalItems) => prevTotalItems - count); // subtract the count of the deleted item from the total count
  };  

  const handleClick = (id) => {
    if (!cartItems.includes(id)) {
      const updatedCart = [...cartItems, id];
      setCartItems(updatedCart);
      console.log(`Added item with id ${id} to the cart.`);
    } else {
      console.log(`Item with id ${id} has already been added to the cart.`);
    }
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Router basename='/'>
        <Navbar totalItems={totalItems} cartItems={cartItems}/>
          <Routes>
            <Route path="/" element={<Home/>} exact/>
            <Route path="/menu" element={<Menu handleClick={handleClick}/>} exact/>
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems}
            deleteCartItem={deleteCartItem} totalItems={totalItems} setTotalItems={setTotalItems}/>} exact/>
          </Routes>
    </Router>
  )
}

export default App
