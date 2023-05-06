import "./App.scss";
import { BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom";
import { useState, useMemo, useEffect, useReducer, createContext } from "react";
import router from './router'
import axios from "axios";

const initialState = {
  name: null, 
  gender: null, 
  loggedIn: false,
  user: null,
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, loggedIn: true, user: action.payload,
          name: action.payload.name,
          gender: action.payload.gender
        }
    case 'LOGOUT':
      return {...initialState}
    case 'SET_ITEMS':
      return {...state, cartItems: action.payload }
    default:
      return state
  }
}

export const AppContext = createContext(null)

function App({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { name, gender, user, loggedIn, cartItems } = state;

  useEffect(() => {
    const sessionStr = localStorage.getItem('session');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (session && currentUser) {
          const { user } = currentUser;
          dispatch({
            type: 'LOGIN',
            payload: { user, name: user.firstName, gender: user.gender },
          });
        }
      } catch (error) {
        console.error('Invalid session:', sessionStr);
        localStorage.removeItem('session'); // remove invalid session from storage
      }
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, []);
  

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
        dispatch({ type: 'SET_ITEMS', payload: JSON.parse(savedCartItems) })
    }
  }, []); 

  useEffect(() => {
    if (user) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
      const updatedUser = { ...currentUser, cart: cartItems };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      axios.put(`http://localhost:5000/${updatedUser._id}/cart`, { cart: cartItems })
        .then(response => {
          console.log('User cart updated:', response.data);
        })
        .catch(error => {
          console.error('Error updating user cart:', error);
        });
    } else {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [state.cartItems, user]);

  const totalItems = useMemo(
    () => state.cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [state.cartItems]
  );

  return (
      <AppContext.Provider value={{ state, dispatch, totalItems }}>
        <RouterProvider router={router}/>
      </AppContext.Provider>
  );
}

export default App;
