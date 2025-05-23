import React from "react";
import ShopMenImage from "../../../assets/images/shop-men.png";
import ShopWomenImage from "../../../assets/images/shop-women.jpg";
import ShopKidsImage from "../../../assets/images/shop-kids.png";
import { NavLink } from "react-router-dom";

const items = [
  { title: "Shop's Women", imagePath: ShopWomenImage, link: "/women" },
  { title: "Shop's Men", imagePath: ShopMenImage, link: "/men" },
  { title: "Shop's Kids", imagePath: ShopKidsImage, link: "kids" },
];

export const ShopByGender = () => {
  return (
    <div className="my-20 px-25">
      <p className="text-3xl">| Shop By Gender</p>
      <div className="grid grid-cols-3 mt-10 gap-x-10">
        {items.map((item, index) => (
          <NavLink to={`${item.link}`} key={index}>
            <div className="relative hover:scale-105 transition-transform cursor-pointer">
              <img
                src={item.imagePath}
                alt={item.title}
                className="rounded-lg w-full h-[500px] object-cover 2xl:h-[700px]"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 items-center flex justify-center">
                <p className="text-white text-2xl">{item.title}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
