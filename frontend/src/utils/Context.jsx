import { createContext, useReducer, useMemo, useCallback, useEffect } from "react";
import axios from "axios";
import { safeParse } from "../hooks/safeParse";

export const AppContext = createContext();
export const url = import.meta.env.VITE_API_URL;

const createInitialState = () => ({
  user: null,
  cartItems: [],
});

const getInitialState = () => {
  const userData = safeParse("currentUser", null);
  const cartItemData = safeParse("cartItem", null);

  if (userData === null && cartItemData === null) {
    return createInitialState();
  }

  return { userData, cartItemData };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const user = safeParse("currentUser", {});
      const localItems = safeParse("cartItems", []);
      const userItems = action.cart || [];

      localItems?.forEach((localItem) => {
        const existingItem = userItems.find(
          (item) => item._id === localItem._id
        );
        if (existingItem) {
          existingItem.quantity += localItem.quantity;
        } else {
          userItems.push(localItem);
        }
      });

      localStorage.setItem("currentUser", JSON.stringify(user));
      return {
        ...state,
        user,
        cartItems: userItems,
      };
    case "LOGOUT":
      localStorage.removeItem("cartItems");
      localStorage.removeItem("currentUser");
      return getInitialState();
    case "SET_ITEMS":
      const items = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(items));
      return {
        ...state,
        cartItems: items,
      };
    case "ADD_ITEM":
      const newItem = action.payload;
      const updatedCartItems = [...state.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case "CHECKOUT":
      const clickedItems = action.payload;
      const remainingCartItems = state.cartItems.filter(
        (item) =>
          !clickedItems.find((clickedItem) => clickedItem._id === item._id)
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
        .put(`${url}/${state.user._id}/cart`, {
          cart: state.cartItems,
        })
        .then((response) => {
          console.log("User cart updated:", response.data);
        })
        .catch((error) => {
          console.error("Error updating user cart:", error);
        });
    }
  }, [state.user, state.cartItems]);

  useEffect(() => {
    setCartItems();
  }, [setCartItems]);

  const totalItems = useMemo(() => {
    if (!state.cartItems) return 0;
    return state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [state.cartItems]);

  return (
    <AppContext.Provider value={{ state, dispatch, totalItems }}>
      {children}
    </AppContext.Provider>
  );
}
