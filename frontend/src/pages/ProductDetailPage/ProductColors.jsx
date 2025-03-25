import React, { useState } from "react";

export const ProductColors = ({ data, onChange }) => {
  const [appliedColors, setAppliedColors] = useState([]);

  const onClickDiv = (color) => {
    if (appliedColors.indexOf(color) > -1) {
      setAppliedColors(appliedColors.filter((item) => color !== item));
      onChange("");
    } else {
      setAppliedColors([...appliedColors, color]);
      onChange(color);
    }
  };

  return (
    <div className="flex">
      {data?.map((item, index) => (
        <div
          className={`rounded-full w-6 h-6 mr-4 cursor-pointer transition-all duration-200 
    hover:scale-110 hover:ring-2 hover:ring-gray-400
    ${
      appliedColors.includes(item.color)
        ? "scale-110 ring-2 ring-gray-400 shadow-lg brightness-110"
        : "ring-1 ring-gray-300"
    }`}
          style={{ background: item.color }}
          key={index}
          onClick={() => onClickDiv(item.color)}
        ></div>
      ))}
    </div>
  );
};
