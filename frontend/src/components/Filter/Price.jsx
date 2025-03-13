import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./Price.css";

export const Price = () => {
  const [range, setRange] = useState({ min: 0, max: 2000 });

  return (
    <div className="flex flex-col">
      <p className="mt-5">Price</p>
      <RangeSlider
        min={0}
        max={5000}
        defaultValue={[range.min, range.max]}
        className={"custom-range-slider"}
        onInput={(values) => setRange({ min: values[0], max: values[1] })}
      />
      <div className="flex justify-between">
        <div className="border rounded-lg h-8 mt-4 max-w-[50%] w-[40%] flex items-center">
          <p className="pl-4 text-gray-600">$</p>{" "}
          <input
            type="number"
            value={range?.min}
            className="outline-none px-4 text-gray-600"
            disabled
          />
        </div>
        <div className="border rounded-lg h-8 mt-4 max-w-[50%] w-[40%] flex items-center">
          <p className="pl-4 text-gray-600">$</p>{" "}
          <input
            type="number"
            value={range?.max}
            className="outline-none px-4 text-gray-600"
            disabled
          />
        </div>
      </div>
    </div>
  );
};
