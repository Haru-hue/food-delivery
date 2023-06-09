import { useContext, useMemo, useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import { line } from "./Menu";
import { AppContext } from "../App";
import { Link } from "react-router-dom";

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

  console.log(clickedItems, totalPrice);

  const itemsInCart = state.cartItems.map((item) => {
    const isClicked = clickedItems.includes(item);
    const totalPrice = isClicked ? item.price * item.count : 0;

    return (
      <CartItem
        key={item._id}
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
    </main>
  );
};

export default Cart;
