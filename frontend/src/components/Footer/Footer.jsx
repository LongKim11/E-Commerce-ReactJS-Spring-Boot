import React from "react";
import { FacebookIcon } from "../Common/FacebookIcon";
import { InstagramIcon } from "../Common/InstagramIcon";

export const Footer = ({ content }) => {
  return (
    <div className="bg-black text-white py-5">
      <div className="flex p-8 justify-around">
        {content.items.map((item, index) => (
          <div key={index} className="flex flex-col">
            <p className="text-md mb-3">{item.title}</p>
            {item?.list &&
              item?.list.map((listItem, index) => (
                <a
                  key={index}
                  className="flex flex-col text-sm mb-1"
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
        {content.copyright}
      </p>
    </div>
  );
};
