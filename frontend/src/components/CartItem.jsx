import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

export default function CartItem(props) {
  const [count, setCount] = useState(props.count);
  const [price, setPrice] = useState(props.price);

  useEffect(() => {
    const updatedPrice = props.price * props.count;
    setPrice(updatedPrice);
    console.log(updatedPrice);
    props.updatePrice(props.id, updatedPrice, count);
  }, [props.count, props.price]);

  const reduceCart = () => {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  };

  const addCart = () => {
    setCount(count + 1);
  };

  const deleteCartItem = () => {
    props.onDelete(props.id);
  };

  return (
    <div className="border-gray-400 flex">
      <div className="flex">
        <img src={props.image} alt={props.name} />
        <div className="flex flex-col">
          <h2 className="font-bold">{props.name}</h2>
        </div>
        <p>
          <span className="text-orange">₦</span>
          {props.price}
        </p>
        <div className="flex items-center">
          <button
            className="rounded-l-lg px-3 py-1 bg-gray-200 text-gray-600 hover:bg-gray-300"
            onClick={addCart}
          >
            <span className="font-bold text-xl leading-none">+</span>
          </button>
          <input
            className="w-1/4 px-3 py-1 bg-gray-100 border-l border-r border-gray-200 text-center font-bold appearance-none"
            type="text"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
          />
          <button
            className="rounded-r-lg px-3 py-1 bg-gray-200 text-gray-600 hover:bg-gray-300"
            onClick={reduceCart}
          >
            <span className="font-bold text-xl leading-none">-</span>
          </button>
        </div>
      </div>
      <button onClick={deleteCartItem}>
        <Icon icon="ph:trash-bold" />
      </button>
    </div>
  );
}
