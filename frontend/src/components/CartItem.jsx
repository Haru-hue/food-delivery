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
    <div className="border-2 border-solid border-gray-100 rounded-xl flex justify-between overflow-hidden items-center my-4 mx-3">
      <div className="cart-item">
        <div className="cart-button max-lg:p-4 max-lg:mx-2" onClick={() => props.onClick(props.id)}>
          {props.isClicked && <div className="w-2 h-2 md:w-4 md:h-4 lg:w-10 lg:h-10 rounded-full bg-orange self-center max-lg:p-2"></div>}
        </div>
        <img
          src={props.image}
          alt={props.name}
          className="cart-image"
        />
        <div className="flex xl:items-center max-xl:flex-col xl:space-y-10">
          <div className="flex flex-col space-y-2">
            <h1 className="xl:font-bold text-sm md:text-lg xl:text-2xl whitespace-nowrap overflow-hidden">{props.name}</h1>
            <p className="text-gray text-sm max-xl:hidden">{props.vendorName}</p>
          </div>
          <p className="text-base md:text-2xl lg:text-3xl font-bold">
            <span className="text-orange text-base">₦</span>
            {props.price.toLocaleString()}.00
          </p>
        </div>
        <div className="flex items-center justify-center space-x-0 md:w-3/10">
          <button
            className="minus hover:bg-orange-300"
            onClick={() => updateItemQuantity(props.id, -1)}
          >
            <span className="font-bold text-base lg:text-xl leading-none">-</span>
          </button>
          <input
            className="value appearance-none"
            type="text"
            min={1}
            value={props.quantity}
            onChange={(e) =>
              setItemQuantity(props.id, parseInt(e.target.value, 10))
            }
          />
          <button
            className="add hover:bg-orange-300"
            onClick={() => updateItemQuantity(props.id, 1)}
          >
            <span className="font-bold text-base lg:text-xl leading-none">+</span>
          </button>
        </div>
      </div>
      <button onClick={() => deleteCartItem(props.id)} className="max-lg:m-2 lg:px-12">
        <Icon icon="ph:trash-bold" className="text-2xl md:text-5xl text-orange" />
      </button>
    </div>
  );
}
