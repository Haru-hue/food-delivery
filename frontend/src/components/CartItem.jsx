import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

export default function CartItem(props) {
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
            onClick={() => props.updateItemQuantity(props.id, 1)}
          >
            <span className="font-bold text-xl leading-none">+</span>
          </button>
          <input
            className="w-1/4 px-3 py-1 bg-gray-100 border-l border-r border-gray-200 text-center font-bold appearance-none"
            type="number"
            min={1}
            value={props.quantity}
            onChange={(e) =>
              props.setItemQuantity(props.id, parseInt(e.target.value, 10))
            }
          />
          <button
            className="rounded-r-lg px-3 py-1 bg-gray-200 text-gray-600 hover:bg-gray-300"
            onClick={() => props.updateItemQuantity(props.id, -1)}
          >
            <span className="font-bold text-xl leading-none">-</span>
          </button>
        </div>
      </div>
      <button onClick={() => props.deleteCartItem(props.id)}>
        <Icon icon="ph:trash-bold" />
      </button>
    </div>
  );
}
