import CartItem from "../components/CartItem";
import { line } from "./Menu";

const Cart = ({
  cartItems,
  deleteCartItem,
  totalPrice,
  totalItems,
  updateItemQuantity,
  setItemQuantity,
}) => {
  const itemsInCart = cartItems.map((item) => {
    if (!item || !item.vendor) {
      return null;
    }
  
    return (
      <CartItem
        key={item._id}
        id={item._id}
        name={item.name}
        image={item.image?.url}
        price={item.price}
        vendorName={item.vendor.name}
        quantity={item.quantity}
        totalPrice={item.price * item.count}
        count={item.count}
        deleteCartItem={deleteCartItem}
        updateItemQuantity={updateItemQuantity}
        setItemQuantity={setItemQuantity}
      />
    );
  });
  
  console.log(cartItems)

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
