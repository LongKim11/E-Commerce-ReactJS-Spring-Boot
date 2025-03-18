import React from "react";

export const Categories = ({ types }) => {
  return (
    <div>
      {types?.map((type, index) => (
        <div className="flex items-center py-1" key={index}>
          <input
            type="checkbox"
            name={type}
            className="border rounded-xl w-4 h-4 accent-black text-black"
          ></input>
          <label htmlFor={type} className="px-2 text-gray-600 text-md">
            {type}
          </label>
        </div>
      ))}
    </div>
  );
};
