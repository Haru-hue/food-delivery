import axios from "axios";
import { useState } from "react";

const publicKey = import.meta.env.VITE_API_KEY;

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

export const createTransaction = async (
  email,
  amount,
  callbackUrl,
  onSuccess,
  onFailure
) => {
  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      { email, amount, callback_url: callbackUrl },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicKey}`,
        },
      }
    );
    const data = response.data;
    if (data.status) {
      // Redirect to the authorization_url
      window.location = data.data.authorization_url;
      if (onSuccess) onSuccess();
    } else {
      // Handle error
      console.error(data.message);
      if (onFailure) onFailure(data.message);
    }
  } catch (error) {
    console.error(error);
    if (onFailure) onFailure(error);
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
    <div className="animation-ctn">
      <div className="icon icon--order-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14"
          width="154px"
          height="154px"
        >
          <g fill="none" stroke="#F44812" strokeWidth="2">
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
              fill="#F44812"
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
              points="43.5,77.8  112.2,77.8"
              style={{
                strokeDasharray: "100px, 100px",
                strokeDashoffset: "200px",
              }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
