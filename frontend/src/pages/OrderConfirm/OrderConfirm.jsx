import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const OrderConfirm = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const orderID = query.get("orderID");
  const navigate = useNavigate("");

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100 ">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          🎉 Thank You for Your Order!
        </h2>
        <p className="text-gray-600 mb-6">
          Your order has been successfully placed.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-lg font-semibold text-gray-700">
          Order ID: <span className="text-blue-600">{orderID}</span>
        </div>
        <button
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition cursor-pointer"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
