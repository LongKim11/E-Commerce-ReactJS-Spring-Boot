import React from "react";
import { FavoriteIcon } from "../../components/Common/FavoriteIcon";
import { Link } from "react-router-dom";

export const ProductCard = ({ data }) => {
  return (
    <div className="flex flex-col w-full max-w-[320px] group relative">
      <Link
        to={`/product/${data.id}`}
        className="overflow-hidden rounded block"
      >
        <img
          src={data.resources[0].url}
          alt={data.name}
          className="w-full aspect-[3/4] object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex justify-between items-center mt-3 w-full">
        <div className="flex flex-col">
          <p className="text-md font-medium truncate">
            {data?.name?.length > 20
              ? data.name.slice(0, 21) + "..."
              : data.name}
          </p>
          {data.description && (
            <p className="text-sm text-gray-500 truncate">{data.brand}</p>
          )}
        </div>
        <div className="font-semibold whitespace-nowrap">${data.price}</div>
      </div>

      <button
        className="absolute top-2 right-2 cursor-pointer bg-white rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => {
          console.log("Favorite Icon Clicked");
        }}
      >
        <FavoriteIcon />
      </button>
    </div>
  );
};
