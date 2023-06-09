import "./App.scss";
import { RouterProvider } from "react-router-dom";
import { useMemo, useEffect, useReducer, createContext } from "react";
import router from "./router";
import axios from "axios";

const createInitialState = () => ({
  user: null,
  cartItems: [],
});

const getInitialState = () => {
  const userData = localStorage.getItem("currentUser");
  const cartItemData = localStorage.getItem("cartItems");

  if (userData === null && cartItemData === null) {
    return createInitialState();
  }

  try {
    const user = JSON.parse(userData);
    const cartItems = JSON.parse(cartItemData);

    return {
      user,
      cartItems,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Something went wrong: ${error.message}`);
    }

    console.error("Something went wrong during initial state parsing");
    return createInitialState();
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { ...user } = action.payload;

      // Save the session and user data to localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      // Update the state with the user data
      return {
        ...state,
        user,
      };
    case "LOGOUT":
      // Remove the user data from localStorage
      localStorage.removeItem("currentUser");
      localStorage.removeItem("cartItems");

      // Reset the state to the initial state
      return getInitialState();
    case "SET_ITEMS":
      // Update the state with the cart items
      localStorage.setItem("cartItems", JSON.stringify(action.payload));
      return {
        ...state,
        cartItems: action.payload,
      };
    case "ADD_ITEM":
      // Add the new item to the cartItems array
      const newItem = action.payload;
      const updatedCartItems = [...state.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case "CHECKOUT":
      // Remove the clicked items from the cartItems array
      const clickedItems = action.payload;
      console.log(clickedItems)
      const remainingCartItems = state.cartItems.filter(
        (item) => !clickedItems.map(i => i._id).includes(item._id)
      );
      console.log(remainingCartItems)
      localStorage.setItem("cartItems", JSON.stringify(remainingCartItems));
      return {
        ...state,
        cartItems: remainingCartItems,
      };
    default:
      return state;
  }
};

export const AppContext = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  useEffect(() => {
    if (state.user) {
      // The port API url should be stored inside an env file and used everywhere
      // Since you use axios, you can setup your axios client with default url, port, headers etc...
      axios
        .put(`http://localhost:5000/${state.user._id}/cart`, {
          cart: state.cartItems,
        })
        .then((response) => {
          console.log("User cart updated:", response.data);
        })
        .catch((error) => {
          console.error("Error updating user cart:", error);
        });
    } else {
      dispatch({ type: "SET_ITEMS", payload: state.cartItems });
    }
  }, [state.cartItems]);

  const totalItems = useMemo(
    () => state.cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [state.cartItems]
  );

  return (
    <AppContext.Provider value={{ state, dispatch, totalItems }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
