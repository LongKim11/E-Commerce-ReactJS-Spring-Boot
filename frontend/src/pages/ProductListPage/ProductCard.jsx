import React from "react";
import { FavoriteIcon } from "../../components/Common/FavoriteIcon";

export const ProductCard = ({ data }) => {
  return (
    <div className="flex flex-col hover:scale-105 transition-transform cursor-pointer relative">
      <img
        src={data.thumbnail}
        alt={data.title}
        className="bg-cover bg-center rounded cursor-pointer h-[320px] w-[280px] object-cover"
      />

      <div className="flex justify-between items-center">
        <div className="flex flex-col pt-2">
          <p className="text-md">{data.title}</p>
          {data.description && (
            <p className="text-sm text-gray-500">{data.brand}</p>
          )}
        </div>
        <div>$ {data.price}</div>
      </div>

      <button
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => {
          console.log("Favorite Icon Clicked");
        }}
      >
        <FavoriteIcon />
      </button>
    </div>
  );
};
