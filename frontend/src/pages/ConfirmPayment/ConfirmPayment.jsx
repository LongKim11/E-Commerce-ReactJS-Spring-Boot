import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmPayment } from "../../api/orderAPI";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/loadingSlice";

export const ConfirmPayment = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    // const clientSecret = query.get("payment_intent_client_secret");
    const redirectStatus = query.get("redirect_status");
    const paymentIntent = query.get("payment_intent");

    if (redirectStatus === "succeeded") {
      dispatch(setLoading(true));
      confirmPayment({ paymentIntent: paymentIntent, status: redirectStatus })
        .then((res) => {
          const orderID = res.orderID;
          localStorage.removeItem("cart");
          navigate(`/confirm-order?orderID=${orderID}`);
        })
        .catch(() => {
          console.log("Something went wrong!");
        })
        .finally(() => dispatch(setLoading(false)));
    } else {
      console.log("Confirm payment failed: ", redirectStatus);
    }
  }, []);

  return (
    <div className="p-8 mb-40 flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold text-gray-800">
          Processing Your Payment...
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Please wait while we confirm your transaction.
        </p>
      </div>
    </div>
  );
};
