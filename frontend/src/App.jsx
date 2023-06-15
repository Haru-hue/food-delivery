import "./App.scss";
import { RouterProvider } from "react-router-dom";
import { useMemo, useEffect, useReducer, createContext } from "react";
import router from './router'
import axios from "axios";

const createInitialState = () => ({
  user: null,
  cartItems: []
})

const getInitialState = () => {
  const userData = localStorage.getItem('currentUser')
  const cartItemData = localStorage.getItem('cartItems')

  if (userData === null && cartItemData === null) {
    return createInitialState()
  }

  try {
    const user = JSON.parse(userData)
    const cartItems = JSON.parse(cartItemData)

    return {
      user,
      cartItems,
    }
  } catch(error) {
    if (error instanceof Error) {
      console.error(`Something went wrong: ${error.message}`)
    }

    console.error('Something went wrong during initial state parsing')
    return createInitialState()
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { session, ...user } = action.payload 

      // Save the session and user data to localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('session', JSON.stringify(session));
      // Update the state with the user data
      return {
        ...state,
        user,
      };
    case "LOGOUT":
      // Remove the user data from localStorage
      localStorage.removeItem('currentUser');
      localStorage.removeItem('session');

      // Reset the state to the initial state
      return getInitialState();
    case "SET_ITEMS":
      // Update the state with the cart items
      localStorage.setItem('cartItems', JSON.stringify(action.payload));
      return {
        ...state,
        cartItems: action.payload,
      };
      case "ADD_ITEM":
      // Add the new item to the cartItems array
      const newItem = action.payload;
      const updatedCartItems = [...state.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    default:
      return state;
  }
};

export const AppContext = createContext(null)

function App() {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  
  useEffect(() => {
    if (state.cartItems.length > 0) {      
      // The port API url should be stored inside an env file and used everywhere
      // Since you use axios, you can setup your axios client with default url, port, headers etc...
      axios.put(`http://localhost:5000/${state.user.userId}/cart`, { cart: state.cartItems })
        .then(response => {
          console.log('User cart updated:', response.data);
        })
        .catch(error => {
          console.error('Error updating user cart:', error);
        });
    }
  }, [state.cartItems]);
  
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
