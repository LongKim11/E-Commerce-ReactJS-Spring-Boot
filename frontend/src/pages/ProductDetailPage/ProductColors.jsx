import React from "react";

export const ProductColors = ({ data }) => {
  return (
    <div className="flex">
      {data?.map((item, index) => (
        <div
          className="rounded-[50%] w-4 h-4 border border-gray-500 mr-2"
          style={{ background: item.color }}
          key={index}
        ></div>
      ))}
    </div>
  );
};
