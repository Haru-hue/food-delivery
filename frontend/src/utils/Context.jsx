import { createContext, useReducer, useMemo, useCallback } from "react";
import axios from "axios";

export const AppContext = createContext();

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
      const localItems = JSON.parse(localStorage.getItem("cartItems")) || []
      const userItems = action.cart
      const mergedCartItems = [...userItems]

      localItems?.forEach((localItem) => {
        const existingItem = mergedCartItems.find(item => item._id === localItem._id)
        if(existingItem) {
          existingItem.quantity += localItem.quantity
        } else {
          mergedCartItems.push(localItem)
        }
      })
      // Save the session and user data to localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      // Update the state with the user data and merged cart items
      return {
        ...state,
        user,
        cartItems: mergedCartItems,
      };
    case "LOGOUT":
      // Remove the user data from localStorage
      localStorage.removeItem("cartItems");
      localStorage.removeItem("currentUser");
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
      const remainingCartItems = state.cartItems.filter(
        (item) => !clickedItems.map((i) => i._id).includes(item._id)
      );
      localStorage.setItem("cartItems", JSON.stringify(remainingCartItems));
      return {
        ...state,
        cartItems: remainingCartItems,
      };
    default:
      return state;
  }
};

export function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  const setCartItems = useCallback(async () => {
    if (state.user) {
      axios
        .put(`http://localhost:5000/${state.user._id}/cart`, {
          cart: state.cartItems,
        })
        .then((response) => {
          console.log("User cart updated:", response.data);
        })
        .catch((error) => {
          console.error("Error updating user cart:", error);
        });;
    }
  }, [state.user, state.cartItems]);

  setCartItems()
  
  const totalItems = useMemo(
    () => state.cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [state.cartItems]
  );

  return (
    <AppContext.Provider value={{ state, dispatch, totalItems }}>
      {children}
    </AppContext.Provider>
  );
}
