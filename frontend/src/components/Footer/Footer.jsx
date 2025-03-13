import React from "react";
import { FacebookIcon } from "../Common/FacebookIcon";
import { InstagramIcon } from "../Common/InstagramIcon";

const footer = {
  items: [
    {
      title: "Need Help",
      list: [
        {
          label: "Contact Us",
          path: "/contact-us",
        },
        {
          label: "Track Order",
          path: "/track-order",
        },
        {
          label: "Returns & Refunds",
          path: "/refunds",
        },
        {
          label: "FAQ's",
          path: "/faq",
        },
        {
          label: "Career",
          path: "/career",
        },
      ],
    },
    {
      title: "Company",
      list: [
        {
          label: "About Us",
          path: "/about",
        },
        {
          label: "Media",
          path: "/media",
        },
      ],
    },
    {
      title: "More Info",
      list: [
        {
          label: "Term and Conditions",
          path: "/terms-conditions",
        },
        {
          label: "Privacy Policy",
          path: "/policies",
        },
        {
          label: "Shipping Policy",
          path: "/policies",
        },
      ],
    },
    {
      title: "Location",
      description: "Ho Chi Minh City",
    },
  ],
  copyright: "Copyright © 2025 LongKim11",
};

export const Footer = () => {
  return (
    <div className="bg-black text-white py-5">
      <div className="flex p-8 justify-around">
        {footer.items.map((item, index) => (
          <div key={index} className="flex flex-col">
            <p className="text-lg font-bold mb-3">{item.title}</p>
            {item?.list &&
              item?.list.map((listItem, index) => (
                <a
                  key={index}
                  className="flex flex-col text-sm mb-2"
                  href={listItem.path}
                >
                  {listItem.label}
                </a>
              ))}
            {item.description && <p className="text-sm">{item.description}</p>}
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-center py-4">
        <a href="/">
          <FacebookIcon />
        </a>
        <a href="/">
          <InstagramIcon />
        </a>
      </div>
      <p className="text-sm text-white text-center content-center">
        {footer.copyright}
      </p>
    </div>
  );
};
