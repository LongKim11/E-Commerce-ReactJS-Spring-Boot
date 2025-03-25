import React, { useState, useCallback } from "react";

export const Size = ({ sizes, onChange }) => {
  const [appliedSizes, setAppliedSizes] = useState([]);
  const onClickDiv = useCallback(
    (item) => {
      if (appliedSizes.indexOf(item) > -1) {
        setAppliedSizes(appliedSizes?.filter((size) => size !== item));
        onChange("");
      } else {
        setAppliedSizes([...appliedSizes, item]);
        onChange(item);
      }
    },
    [appliedSizes, setAppliedSizes]
  );

  return (
    <div className="flex flex-col my-4">
      <p className="mb-3 text-lg font-semibold text-gray-700">Select Size</p>
      <div className="flex flex-wrap gap-3">
        {sizes?.map((item, index) => (
          <div key={index} className="flex flex-col">
            <button
              className={`w-[50px] h-10 text-center font-medium rounded-lg cursor-pointer transition-all duration-200 bg-gray-200 text-gray-600
              ${
                appliedSizes.includes(item.size)
                  ? "ring-2 ring-gray-700 scale-105 shadow-lg"
                  : "hover:bg-gray-200 hover:shadow-lg hover:scale-105"
              }`}
              onClick={() => onClickDiv(item.size)}
            >
              {item.size}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
