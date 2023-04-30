import Home from "./layouts/Home";
import Menu from "./layouts/Menu";
import "./App.scss";
import Cart from "./layouts/Cart";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import Footer from './components/Footer'
import LoginRegister from "./layouts/LoginRegister";
import axios from "axios";

function App() {
  const [name, setName] = useState(null);
  const [gender, setGender] = useState(null)
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const sessionStr = localStorage.getItem('session');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (session) {
          setUser(currentUser);
          setGender(currentUser.gender);
          setName(currentUser.firstName);
          if (!loggedIn) {
            setLoggedIn(true);
          }
        }
        console.log(name);
        console.log(gender);
      } catch (error) {
        console.error('Invalid session:', sessionStr);
        localStorage.removeItem('session'); // remove invalid session from storage
      }
    } else {
      setUser(null);
      setGender(null);
      setName(null);
      setLoggedIn(false);
      setCartItems([]);
    }
  }, [loggedIn]);
  
  
  const handleLogout = () => {
    axios.post('http://localhost:5000/logout', { withCredentials: true })
      .then(response => {
        setUser(null);
        setGender(null);
        setName(null);
        setLoggedIn(false);
        setCartItems([]);
        localStorage.removeItem('session'); // remove invalid session from storage
        localStorage.removeItem('currentUser'); // remove invalid session from storage
        // navigate('/login');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

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
    if (user) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      currentUser.cart = cartItems;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      console.log(currentUser.cart)
      axios.put(`http://localhost:5000/${user._id}/cart`, { cart: cartItems })
        .then(response => {
          console.log('User cart updated:', response.data);
        })
        .catch(error => {
          console.error('Error updating user cart:', error);
        });
    }
  }, [cartItems, user]);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/${user._id}/cart`)
        .then(response => {
          setCartItems(response.data);
        })
        .catch(error => {
          console.error('Error retrieving cart items:', error);
        });
    } else {
      setCartItems([]);
    }
  }, [user]);

  return (
    <Router basename="/">
      <Navbar totalItems={totalItems} name={name} loggedIn={loggedIn} gender={gender} handleLogout={handleLogout}/>
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
        <Route path="/login" element={<LoginRegister setName={setName} setLoggedIn={setLoggedIn} setGender={setGender}/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
