import { useState, useContext } from "react";
import { createTransaction, hallsData } from "../utils";
import { AppContext } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
// import { PaystackButton } from "react-paystack"


const Checkout = () => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [extraInfo, setExtraInfo] = useState("");
  const { state } = useContext(AppContext);
  const location = useLocation();
  const clickedItems = location.state?.clickedItems;
  const totalPrice = location.state?.totalPrice;
  const shippingFees = totalPrice > 5000 ? 500 : 200;
  const email = state.user?.email
  const history = useNavigate();

  console.log(clickedItems, totalPrice, state);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    setExtraInfo("");
  };

  const handleExtraInfoChange = (event) => {
    setExtraInfo(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePaymentSubmit = () => {
    // Handle payment submission logic here
    console.log("Payment submitted!");
  };

  const onSuccess = () => {
    history.push("/");
    alert("Order successful!");
  }

  return (
    <div className="bg-gray-300">
      <div className="container flex">
        <div className="p-4 w-7/10">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <select
                id="option"
                className="block w-full bg-white border border-gray-300 px-4 py-2 mt-2 rounded"
                value={address}
                onChange={handleAddressChange}
              >
                <option value="">-- Select an Option --</option>
                {hallsData.flatMap((category) =>
                  category.options.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))
                )}
              </select>

              {address &&
                hallsData.find((category) => category.options.includes(address))
                  .category === "Others" && (
                  <div className="mt-4">
                    <label htmlFor="extraInfo" className="text-lg font-bold">
                      Enter Extra Info:
                    </label>
                    <input
                      type="text"
                      id="extraInfo"
                      className="block w-full bg-white border border-gray-300 px-4 py-2 mt-2 rounded"
                      value={extraInfo}
                      onChange={handleExtraInfoChange}
                    />
                  </div>
                )}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg mt-4">
            <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
            <div className="mb-4 flex justify-between flex-col">
              <label className="flex items-center ">
                <input
                  type="radio"
                  value="creditCard"
                  checked={paymentMethod === "creditCard"}
                  onChange={handlePaymentMethodChange}
                  className="form-radio h-5 w-5 text-orange-500"
                />
                <span className="ml-2">Credit Card</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === "delivery"}
                  onChange={handlePaymentMethodChange}
                  className="form-radio h-5 w-5 text-orange-500"
                />
                <span className="ml-2">Pay on delivery</span>
              </label>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg mt-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-4">
                Cart Items ({clickedItems.length})
              </h2>
              {clickedItems.map((item, index) => {
                return (
                  <div className="flex items-center mb-2" key={index}>
                    <img
                      src={item.image.url}
                      alt="Product"
                      className="w-16 h-16 rounded-lg mr-2"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p>Price: ₦{item.price.toLocaleString()}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="p-5 w-3/10">
          <div className="bg-gray-100 rounded-lg p-5">
            <h2 className="text-2xl font-semibold mb-4">Order summary</h2>
            <div className="flex flex-col justify-between flex-wrap">
              <div className="flex justify-between content-center py-2">
                <p>Subtotal</p>
                <p>₦{totalPrice.toLocaleString()}</p>
              </div>
              <div className="flex justify-between content-center py-2">
                <p>Shipping:</p>
                <p>₦{shippingFees.toLocaleString()}</p>
              </div>
              <div className="flex justify-between py-4 content-center">
                <p className="font-bold text-lg">Total:</p>
                <p className="text-3xl font-black">
                  ₦{(totalPrice + shippingFees).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-center py-4">
                <button
                  className={`px-20 py-4 bg-orange rounded-xl text-2xl text-white font-bold content-center hover:bg-opacity-80`}
                  onClick={() => createTransaction(email, totalPrice, "http://localhost:5173/?order=confirmed", onSuccess)}
                >
                  Pay Now
                </button>
                {/* <PaystackButton {...componentProps} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
