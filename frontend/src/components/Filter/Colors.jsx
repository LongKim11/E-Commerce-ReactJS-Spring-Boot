import React, { useState, useCallback } from "react";

const colorSelector = {
  Purple: "#8434E1",
  Black: "#252525",
  White: "#FFFFFF",
  Gray: "#808080",
  Blue: "#0000FF",
  Red: "#FF0000",
  Orange: "#FFA500",
  Navy: "#000080",
  Grey: "#808080",
  Yellow: "#FFFF00",
  Pink: "#FFC0CB",
  Green: "#008000",
};

export const Colors = ({ colors }) => {
  const [appliedColors, setAppliedColors] = useState([]);
  const onClickDiv = useCallback(
    (item) => {
      if (appliedColors.indexOf(item) > -1) {
        setAppliedColors(appliedColors?.filter((color) => color !== item));
      } else {
        setAppliedColors([...appliedColors, item]);
      }
    },
    [appliedColors, setAppliedColors]
  );

  return (
    <div className="flex flex-col">
      <p className="my-5">Colors</p>
      <div className="flex flex-wrap">
        {colors?.map((color, index) => (
          <div className="flex flex-col mr-5 mb-5" key={index}>
            <div
              key={index}
              className="w-8 h-8 border border-slate-300 rounded-xl mr-4 cursor-pointer hover:scale-105 transition-transform"
              style={{ background: `${colorSelector[color]}` }}
              onClick={() => onClickDiv(color)}
            ></div>
            <p
              className="text-sm text-gray-500"
              style={{
                color: `${appliedColors?.includes(color) ? "black" : ""}`,
              }}
            >
              {color}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
