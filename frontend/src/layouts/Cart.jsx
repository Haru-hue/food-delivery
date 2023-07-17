import { useContext, useMemo, useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import { line } from "./Menu";
import { AppContext } from "../utils/Context";
import { Link } from "react-router-dom";
import { basket } from "../assets";
import { nanoid } from 'nanoid'

const Cart = () => {
  const { state, totalItems } = useContext(AppContext);
  const [clickedItems, setClickedItems] = useState([]);

  const handleClick = (item) => {
    setClickedItems((prevClickedItems) => {
      if (prevClickedItems.includes(item)) {
        return prevClickedItems.filter((clickedItem) => clickedItem !== item);
      } else {
        return [...prevClickedItems, item];
      }
    });
  };

  const totalPrice = useMemo(
    () =>
      clickedItems.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [clickedItems]
  );

  const itemsInCart = state.cartItems.map((item) => {
    const isClicked = clickedItems.includes(item);
    const totalPrice = isClicked ? item.price * item.count : 0;

    return (
      <CartItem
        key={nanoid()}
        id={item._id}
        name={item.name}
        image={item.image?.url}
        price={item.price}
        vendorName={item.vendor?.name}
        quantity={item.quantity}
        totalPrice={totalPrice}
        count={item.count}
        onClick={() => handleClick(item)}
        isClicked={isClicked}
      />
    );
  });

  const isActive = clickedItems.length > 0;

  const cart = () => {
    if (totalItems > 0) {
      return (
        <div>
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
            <Link
              to={isActive ? "/checkout" : ""}
              state={{ clickedItems: clickedItems, totalPrice: totalPrice }}
            >
              <button
                className={`px-72 py-10 bg-orange rounded-xl text-3xl text-white uppercase ${
                  isActive
                    ? "active:cursor-pointer"
                    : "disabled:bg-orange-lighter cursor-not-allowed"
                }`}
                disabled={!isActive}
              >
                Proceed to CheckOut
              </button>
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center space-y-3">
        <img src={basket} className="w-1/20" />
        <p className="text-orange text-2xl">Your Cart is empty!</p>
        <Link to={`/menu`}>
          <button className="text-md bg-gradient-to-r from-orange to-purple-500 p-6 rounded-full text-white">
            Start shopping now!
          </button>
        </Link>
      </div>
    );
  };

  return <main className="container pt-10">{cart()}</main>;
};

export default Cart;
