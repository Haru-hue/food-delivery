import Home from "./layouts/Home";
import Menu from "./layouts/Menu";
import "./App.scss";
import Cart from "./layouts/Cart";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import Footer from './components/Footer'

function App() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems") || "[]")
  );

  const deleteCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const handleClick = (newItem) => {
    setCartItems((prevItems) => {
      const itemOpt = prevItems.find((item) => item._id === newItem._id);

      if (!itemOpt) {
        return [...prevItems, { ...newItem, quantity: 1 }];
      }

      return prevItems.map((item) => {
        if (item._id === newItem._id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const setItemQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id !== id) return item;

        return { ...item, quantity: Math.max(1, quantity) };
      })
    );
  };

  const updateItemQuantity = (id, value) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id !== id) return item;

        return {
          ...item,
          quantity: Math.max(1, item.quantity + value),
        };
      })
    );
  };

  const totalPrice = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [cartItems]
  );

  const totalItems = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Router basename="/">
      <Navbar cartItems={cartItems} totalItems={totalItems} />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route
          path="/menu"
          element={<Menu handleClick={handleClick} />}
          exact
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              updateItemQuantity={updateItemQuantity}
              setItemQuantity={setItemQuantity}
              deleteCartItem={deleteCartItem}
              totalItems={totalItems}
              totalPrice={totalPrice}
            />
          }
          exact
        />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
