import "./App.scss";
import { BrowserRouter as RouterProvider } from "react-router-dom";
import { useMemo, useEffect, useReducer, createContext } from "react";
import router from './router'
import axios from "axios";
import{ safeGetItem } from "./utils"

const getInitialState = () => {
  return {
    user: null,
    cartItems: [],
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // Save the session and user data to localStorage
      // localStorage.setItem('currentUser', JSON.stringify(action.payload.user));
      // localStorage.setItem('session', JSON.stringify(action.payload.session));

      // Update the state with the user data
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      // Remove the user data from localStorage
      localStorage.removeItem('currentUser');
      localStorage.removeItem('session');

      // Reset the state to the initial state
      return getInitialState();
    case "SET_ITEMS":
      // Update the state with the cart items
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};

export const AppContext = createContext(null)

function App() {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  
  useEffect(() => {
    const session = safeGetItem('session');
    const currentUser = safeGetItem('currentUser');
  
    if (session && currentUser) {
      const { user } = currentUser;
      dispatch({
        type: 'LOGIN',
        payload: { user },
      });
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
    if (state.user && state.cartItems.length > 0) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
      const updatedUser = { ...currentUser, cart: state.cartItems };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      axios.put(`http://localhost:5000/${updatedUser._id}/cart`, { cart: state.cartItems })
        .then(response => {
          console.log('User cart updated:', response.data);
        })
        .catch(error => {
          console.error('Error updating user cart:', error);
        });
    }
  }, [state.cartItems, state.user]);
  
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