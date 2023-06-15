import { useContext, useMemo } from "react";
import CartItem from "../components/CartItem";
import { line } from "./Menu";
import { AppContext } from "../App";
import axios from "axios";
axios

const Cart = () => {
  const { state, totalItems } = useContext(AppContext)
  console.log(state.cartItems)
  const totalPrice = useMemo(
    () => state.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [state.cartItems]
  );

  const itemsInCart = state.cartItems.map((item) => {
    const product = item.product
    return (
      <CartItem
        key={item._id}
        id={item._id}
        name={(product || item)?.name}
        image={(item || product)?.image?.url}
        price={item.price} // It only shows this
        vendorName={(item || product)?.vendor?.name}
        quantity={item.quantity} // And this
        totalPrice={item.price * item.count} //Also this
        count={item.count}
      />
    );
  });
  
  return (
    <main className="container pt-10">
      <h1 className="text-center title-font text-4xl pb-3">
        Your <span className="text-orange">Cart</span> ({totalItems})
      </h1>
      {line}
      <div className="py-4">{itemsInCart}</div>
      {line}
      <div className="flex justify-between pt-10 px-5">
        <p className="font-semibold text-lg">Total</p>
        <p className="text-4xl font-semibold">
          <span className="text-lg text-orange">₦</span>
          {totalPrice.toLocaleString()}.00
        </p>
      </div>
      <div className="flex justify-center py-16">
        <button className="px-72 py-10 bg-orange rounded-xl text-3xl text-white uppercase">
          Proceed to CheckOut
        </button>
      </div>
    </main>
  );
};

export default Cart;
