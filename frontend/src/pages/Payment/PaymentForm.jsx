import React from "react";
import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { createOrder } from "../../api/orderAPI";
import { useSelector } from "react-redux";
import { createOrderRequest } from "../../utils/order-util";
import { setLoading } from "../../store/features/loadingSlice";
import { useDispatch } from "react-redux";

export const PaymentForm = ({ userID, addressID, expectedDeliveryDate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderRequest = createOrderRequest(
      cartItems,
      userID,
      addressID,
      expectedDeliveryDate
    );

    console.log("Order Request:", orderRequest);

    dispatch(setLoading(true));

    await elements.submit();

    if (elements) {
      createOrder(orderRequest)
        .then(async (res) => {
          console.log("Payment response", res);

          stripe
            .confirmPayment({
              elements,
              clientSecret: res?.credentials?.client_secret,
              confirmParams: {
                payment_method: "pm_card_visa",
                return_url: "http://localhost:5173/confirm-payment",
              },
            })
            .then((res) => console.log("Response stripe", res));
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch(setLoading(false)));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement></PaymentElement>
      <button
        className="mt-5 w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all cursor-pointer"
        disabled={!stripe}
        type="submit"
      >
        Pay Now
      </button>
    </form>
  );
};
