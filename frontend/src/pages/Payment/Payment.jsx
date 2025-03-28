import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51R7TW8BFXRoz8HmPXInSBbQlonZeFt5S4NOTCq0J8s3yjkJ43obaDtpuRpmcG39nOGrj5Y2b2Wd7Xtq4oQ4C4ySE00KlgFmoy9"
);

export const Payment = ({ paymentMethod }) => {
  const options = {
    mode: "payment",
    amount: 1000,
    currency: "usd",
    appearance: { theme: "flat" },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <form>
        <PaymentElement></PaymentElement>
        <button className="mt-5 w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all cursor-pointer">
          Pay Now
        </button>
      </form>
    </Elements>
  );
};
