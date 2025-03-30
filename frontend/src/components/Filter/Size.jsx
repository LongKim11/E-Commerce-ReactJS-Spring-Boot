import React, { useState, useMemo, useCallback } from "react";

export const Size = ({ sizes, onChange }) => {
  const [appliedSizes, setAppliedSizes] = useState([]);

  const uniqueSizes = useMemo(() => {
    if (!sizes) return [];
    return [...new Set(sizes.map((variant) => variant.size))];
  }, [sizes]);

  const onClickDiv = useCallback(
    (size) => {
      if (appliedSizes.includes(size)) {
        setAppliedSizes(appliedSizes.filter((s) => s !== size));
        onChange("");
      } else {
        setAppliedSizes([size]);
        onChange(size);
      }
    },
    [appliedSizes, setAppliedSizes]
  );

  return (
    <div className="flex flex-col my-4">
      <p className="mb-3 text-lg font-semibold text-gray-700">Select Size</p>
      <div className="flex flex-wrap gap-3">
        {uniqueSizes.map((size, index) => (
          <button
            key={index}
            className={`w-[50px] h-10 text-center font-medium rounded-lg cursor-pointer transition-all duration-200 bg-gray-200 text-gray-600
              ${
                appliedSizes.includes(size)
                  ? "ring-2 ring-gray-700 scale-105 shadow-lg"
                  : "hover:bg-gray-200 hover:shadow-lg hover:scale-105"
              }`}
            onClick={() => onClickDiv(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
