import React from "react";
import { ArrowIcon } from "../Common/ArrowIcon";

export const Card = ({
  imagePath,
  title,
  description,
  actionArrow,
  h = "240px",
  w = "200px",
}) => {
  return (
    <div className="flex flex-col px-10">
      <img
        src={imagePath}
        alt={title}
        style={{ height: h, width: w }}
        className="bg-cover bg-center rounded hover:scale-105 cursor-pointer transition-transform"
      />
      <div className="flex justify-between items-center">
        <div className="flex flex-col mt-3">
          <p className="text-md">{title}</p>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
        {actionArrow && (
          <span className="cursor-pointer">
            <ArrowIcon />
          </span>
        )}
      </div>
    </div>
  );
};
