import axios from "axios";
import emailjs from "@emailjs/browser";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

export const sendReceiptEmail = (
  userName,
  items,
  deliveryFees,
  total,
  deliveryAddress,
  recipientEmail
) => {
  const templateParams = {
    user_name: userName,
    items: items,
    delivery_fees: deliveryFees,
    total_price: total,
    delivery_address: deliveryAddress,
    to_email: recipientEmail,
  };

  emailjs
    .send(serviceKey, templateKey, templateParams, emailKey)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
};

const publicKey = import.meta.env.VITE_API_KEY;
const serviceKey = import.meta.env.VITE_SERVICE_KEY;
const templateKey = import.meta.env.VITE_TEMPLATE_KEY;
const emailKey = import.meta.env.VITE_EMAIL_KEY;

export const hallsData = [
  {
    category: "Halls",
    options: [
      "Samuel Akande",
      "Nelson Mandela",
      "Bethel Splendor",
      "Gideon Troopers",
      "Winslow",
      "Queen Esther",
      "Felicia Adebisi Dada",
      "Crystal",
      "Ogden",
      "White",
    ],
  },
  {
    category: "Others",
    options: ["SAT", "New Horizons", "BUSA", "BBS", "EAH", "BUTH"],
  },
];

export const createTransaction = async (email, amount, callBackURL) => {
  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      { email, amount, callback_url: callBackURL },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicKey}`,
        },
      }
    );
    const data = response.data;
    if (data.status) {
      localStorage.setItem("reference", JSON.stringify(data.data.reference));
      window.location = data.data.authorization_url;
      console.log(data);
    } else {
      // Handle error
      console.error(data.message);
      if (onFailure) onFailure(data.message);
      return false;
    }
  } catch (error) {
    console.error(error);
    if (onFailure) onFailure(error);
    return false;
  }
};

export const verifyTransaction = async (reference) => {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicKey}`,
        },
      }
    );
    const data = response.data;
    if (data.status && data.data.status === "success") {
      console.log("Transaction successful!");
      return true;
    } else {
      console.error("Transaction not successful!");
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

export const AnimatedCheckMark = () => {
  return (
    <div className="icon icon--order-success">
      <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">
        <g fill="none" stroke="#22AE73" strokeWidth="2">
          <circle
            cx="77"
            cy="77"
            r="72"
            style={{
              strokeDasharray: "480px, 480px",
              strokeDashoffset: "960px",
            }}
          ></circle>
          <circle
            id="colored"
            fill="#22AE73"
            cx="77"
            cy="77"
            r="72"
            style={{
              strokeDasharray: "480px, 480px",
              strokeDashoffset: "960px",
            }}
          ></circle>
          <polyline
            className="st0"
            stroke="#fff"
            strokeWidth="10"
            points="43.5,77.8 63.7,97.9 112.2,49.4"
            style={{
              strokeDasharray: "100px, 100px",
              strokeDashoffset: "200px",
            }}
          />
        </g>
      </svg>
    </div>
  );
};

export const AnimatedWrongMark = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="w-12 h-12 animate-wrongmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle
          className="wrongmark-circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path className="wrongmark-path" d="M16 16 36 36 M36 16 16 36" />
      </svg>
    </div>
  );
};

const OrderDeclinedPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Order Declined</h2>
        <AnimatedWrongMark />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

const OrderConfirmedPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Order Confirmed</h2>
        <AnimatedCheckMark />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export const OrderConfirmed = () => {
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(true);
  const { dispatch } = useContext(AppContext)
  const clickedItems = JSON.parse(localStorage.getItem("clickedItems"));


  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const reference = JSON.parse(localStorage.getItem("reference"));

    // Verify the transaction with the Paystack API
    verifyTransaction(reference).then((isSuccessful) => {
      if (isSuccessful) {
        // Payment was successful
        // Update your application state here
        localStorage.removeItem("reference");
        dispatch({ type: "CHECKOUT", payload: clickedItems })
        setLoading(false);
        setIsOrderConfirmed(true);
      } else {
        // Payment failed or user closed payment page
        // Handle this case here
        localStorage.removeItem("reference");
        // navigate("/?order-declined");
        setLoading(false);
        setIsOrderConfirmed(false);
      }
    });
  }, []);

  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        {isOrderConfirmed === true && !loading && showPopup && (
          <OrderConfirmedPopup onClose={handleClosePopup} />
        )}
        {isOrderConfirmed === false && !loading && showPopup && (
          <OrderDeclinedPopup onClose={handleClosePopup} />
        )}
      </div>
    );
  }
};
