import { Icon } from "@iconify/react";
import { useContext } from "react";
import { AppContext } from "../utils/Context";

export default function CartItem(props) {
  const { state, dispatch } = useContext(AppContext);

  const deleteCartItem = (id) => {
    dispatch({
      type: "SET_ITEMS",
      payload: state.cartItems.filter((item) => item._id !== id),
    });
  };

  const setItemQuantity = (id, quantity) => {
    dispatch({
      type: "SET_ITEMS",
      payload: state.cartItems.map((item) => {
        if (item._id !== id) return item;

        return { ...item, quantity: Math.max(1, quantity) };
      }),
    });
  };

  const updateItemQuantity = (id, value) => {
    dispatch({
      type: "SET_ITEMS",
      payload: state.cartItems.map((item) => {
        if (item._id !== id) return item;

        return { ...item, quantity: Math.max(1, item.quantity + value) };
      }),
    });
  };

  return (
    <div className="border-2 border-solid border-gray-100 rounded-xl flex justify-between overflow-hidden items-center my-4">
      <div className="flex bg-gray-300 bg-opacity-10 backdrop-filter backdrop-blur items-center justify-between w-lg px-10 py-4">
        <div className="w-14 h-14 rounded-full border-2 border-orange flex justify-center cursor-pointer" onClick={() => props.onClick(props.id)}>
          {props.isClicked && <div className="w-10 h-10 rounded-full bg-orange self-center"></div>}
        </div>
        <img
          src={props.image}
          alt={props.name}
          className="w-96 h-48 rounded-2xl p-2 object-cover"
        />
        <div className="flex flex-col space-y-2">
          <h1 className="font-bold text-2xl w-[175px]">{props.name}</h1>
          <p className="text-gray text-sm">{props.vendorName}</p>
        </div>
        <p className="text-3xl font-bold">
          <span className="text-orange text-base">₦</span>
          {props.price.toLocaleString()}.00
        </p>
        <div className="flex items-center justify-center space-x-0">
          <button
            className="rounded-l-lg px-3 py-1 bg-orange text-white hover:bg-orange-300"
            onClick={() => updateItemQuantity(props.id, -1)}
          >
            <span className="font-bold text-xl leading-none">-</span>
          </button>
          <input
            className="w-1/5 px-3 py-1 bg-orange text-white border-l border-r border-gray-200 text-center font-bold appearance-none"
            type="text"
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
      <button onClick={() => deleteCartItem(props.id)} className="pr-24">
        <Icon icon="ph:trash-bold" className="text-6xl text-orange" />
      </button>
    </div>
  );
}
