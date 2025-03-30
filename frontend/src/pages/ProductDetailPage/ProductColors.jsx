import React, { useState, useMemo } from "react";

export const ProductColors = ({ data, onChange }) => {
  const [appliedColors, setAppliedColors] = useState([]);

  const uniqueColors = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.map((variant) => variant.color))];
  }, [data]);

  const onClickDiv = (color) => {
    if (appliedColors.includes(color)) {
      setAppliedColors(appliedColors.filter((item) => item !== color));
      onChange("");
    } else {
      setAppliedColors([color]);
      onChange(color);
    }
  };

  return (
    <div className="flex">
      {uniqueColors.map((color, index) => (
        <div
          className={`rounded-full w-6 h-6 mr-4 cursor-pointer transition-all duration-200 
            hover:scale-110 hover:ring-2 hover:ring-gray-400
            ${
              appliedColors.includes(color)
                ? "scale-110 ring-2 ring-gray-400 shadow-lg brightness-110"
                : "ring-1 ring-gray-300"
            }`}
          style={{ background: color }}
          key={index}
          onClick={() => onClickDiv(color)}
        ></div>
      ))}
    </div>
  );
};
