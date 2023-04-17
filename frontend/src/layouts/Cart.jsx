import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import CartItem from "../components/CartItem";
import { line } from "./Menu";
import foods from "../foods";

const Cart = ({
  cartItems,
  deleteCartItem,
  totalPrice,
  totalItems,
  updateItemQuantity,
  setItemQuantity,
}) => {
  const itemsInCart = cartItems.map((item) => {
    if (!item) {
      return null;
    }

    return (
      <CartItem
        key={item._id}
        id={item._id}
        name={item.name}
        image={item.image?.url}
        price={item.price}
        quantity={item.quantity}
        totalPrice={item.price * item.count}
        count={item.count}
        deleteCartItem={deleteCartItem}
        updateItemQuantity={updateItemQuantity}
        setItemQuantity={setItemQuantity}
      />
    );
  });

  return (
    <main className="container">
      <h1 className="text-center">
        Your <span className="text-orange">Cart ({totalItems})</span>
      </h1>
      {line}
      {itemsInCart}
      {line}
      <div className="flex justify-between">
        <p className="font-bold">Total</p>
        <p className="font-bold text-4xl">
          <span className="text-xl text-orange">₦</span>
          {totalPrice}.00
        </p>
      </div>
    </main>
  );
};

export default Cart;
