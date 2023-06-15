import { Icon } from "@iconify/react";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";

export default function CartItem(props) {
  const { state, dispatch } = useContext(AppContext)

  const deleteCartItem = (id) => {
    dispatch({type: 'SET_ITEMS', payload: state.cartItems.filter((item) => item._id !== id)})
  };

  const setItemQuantity = (id, quantity) => {
    dispatch({ type: 'SET_ITEMS', payload: state.cartItems.map((item) => {
      if (item._id !== id) return item;

      return { ...item, quantity: Math.max(1, quantity) };
    })})
  };

  const updateItemQuantity = (id, value) => {
    dispatch({ type: 'SET_ITEMS', payload: state.cartItems.map((item) => {
      if (item._id !== id) return item

      return { ...item, quantity: Math.max(1, item.quantity + value) };
    }) })
  };

  return (
    <div className="border-2 border-solid border-gray-100 rounded-xl flex justify-between overflow-hidden items-center my-4">
      <div className="flex bg-gray-300 bg-opacity-10 backdrop-filter backdrop-blur items-center justify-between w-lg">
        <img src={props.image} alt={props.name} className="w-96 h-48 rounded-2xl p-2 object-cover"/>
        <div className="flex flex-col space-y-2">
          <h1 className="font-bold text-3xl">{props.name}</h1>
          <p className="text-gray text-sm">{props.vendorName}</p>
        </div>
        <p className="text-3xl font-bold">
          <span className="text-orange text-base">₦</span>
          {props.price}.00
        </p>
        <div className="flex items-center justify-center space-x-0">
        <button
            className="rounded-l-lg px-3 py-1 bg-orange text-white hover:bg-orange-300"
            onClick={() => props.updateItemQuantity(props.id, -1)}
          >
            <span className="font-bold text-xl leading-none">-</span>
          </button>
          <input
            className="w-1/4 px-3 py-1 bg-orange text-white border-l border-r border-gray-200 text-center font-bold appearance-none"
            type="number"
            min={1}
            value={props.quantity}
            onChange={(e) =>
              setItemQuantity(props.id, parseInt(e.target.value, 10))
            }
          />
          <button
            className="rounded-r-lg px-3 py-1 bg-orange text-white hover:bg-orange-300"
            onClick={() => updateItemQuantity(props.id, 1)}
          >
            <span className="font-bold text-xl leading-none">+</span>
          </button>
        </div>
      </div>
      <button onClick={() => deleteCartItem(props.id)}>
        <Icon icon="ph:trash-bold" className="text-5xl text-orange"/>
      </button>
    </div>
  );
}
