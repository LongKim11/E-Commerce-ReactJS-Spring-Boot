import React from "react";
import { ChatIcon } from "../../Common/ChatIcon";
import { PhoneIcon } from "../../Common/PhoneIcon";
import { LocationIcon } from "../../Common/LocationIcon";

export const ContactUs = () => {
  return (
    <div className="my-20 px-25">
      <p className="text-3xl mb-10">| Contact Us</p>
      <div className="grid grid-cols-3 gap-10">
        <div className="flex flex-col text-center">
          <div className="flex justify-center mb-5">
            <ChatIcon />
          </div>
          <p className="font-bold">Chat with us</p>
          <p>7:00 - 00:00</p>
          <p>7 days a week</p>
        </div>
        <div className="flex flex-col text-center">
          <div className="flex justify-center mb-5">
            <PhoneIcon />
          </div>
          <p className="font-bold">Call us</p>
          <p>(+84) 336 836 516</p>
          <p>8:00 - 20:00</p>
          <p>Monday - Friday</p>
          <p>8:00 - 17:00</p>
          <p>Saturday</p>
        </div>
        <div className="flex flex-col text-center">
          <div className="flex justify-center mb-5">
            <LocationIcon />
          </div>
          <p className="font-bold">Find a Store</p>
          <p>Ho Chi Minh City</p>
          <p>Viet Nam</p>
        </div>
      </div>
    </div>
  );
};
