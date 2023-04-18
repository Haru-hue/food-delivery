import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

export default function CartItem(props) {
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
          {props.price.toLocaleString()}.00
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
              props.setItemQuantity(props.id, parseInt(e.target.value, 10))
            }
          />
          <button
            className="rounded-r-lg px-3 py-1 bg-orange text-white hover:bg-orange-300"
            onClick={() => props.updateItemQuantity(props.id, 1)}
          >
            <span className="font-bold text-xl leading-none">+</span>
          </button>
        </div>
      </div>
      <button onClick={() => props.deleteCartItem(props.id)}>
        <Icon icon="ph:trash-bold" className="text-5xl text-orange"/>
      </button>
    </div>
  );
}
