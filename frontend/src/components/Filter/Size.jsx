import React, { useState, useCallback } from "react";

export const Size = ({ sizes }) => {
  const [appliedSizes, setAppliedSizes] = useState([]);
  const onClickDiv = useCallback(
    (item) => {
      if (appliedSizes.indexOf(item) > -1) {
        setAppliedSizes(appliedSizes?.filter((size) => size !== item));
      } else {
        setAppliedSizes([...appliedSizes, item]);
      }
    },
    [appliedSizes, setAppliedSizes]
  );

  return (
    <div className="flex flex-col my-4">
      <p className="mb-5">Size</p>
      <div className="flex flex-wrap">
        {sizes?.map((item, index) => (
          <div className="flex flex-col" key={index}>
            <div
              key={index}
              className="w-[50px] text-gray-500 text-center h-8 border border-gray-300 bg-white rounded-xl mr-4 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => onClickDiv(item.size)}
              style={
                appliedSizes.includes(item.size)
                  ? { background: "black", color: "white" }
                  : {}
              }
            >
              {item.size  }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
