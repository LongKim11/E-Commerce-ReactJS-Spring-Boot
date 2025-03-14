import React from "react";

export const ProductColors = ({ colors }) => {
  return (
    <div className="flex">
      {colors.map((color, index) => (
        <div
          className="rounded-[50%] w-4 h-4 border border-gray-500 mr-2"
          style={{ background: color }}
          key={index}
        ></div>
      ))}
    </div>
  );
};
