import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentForm } from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51R7TW8BFXRoz8HmPXInSBbQlonZeFt5S4NOTCq0J8s3yjkJ43obaDtpuRpmcG39nOGrj5Y2b2Wd7Xtq4oQ4C4ySE00KlgFmoy9"
);

export const Payment = ({ userID, addressID, expectedDeliveryDate }) => {
  const options = {
    mode: "payment",
    amount: 1000,
    currency: "usd",
    appearance: { theme: "flat" },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm
        userID={userID}
        addressID={addressID}
        expectedDeliveryDate={expectedDeliveryDate}
      />
    </Elements>
  );
};
