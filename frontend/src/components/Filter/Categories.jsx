import React from "react";

export const Categories = ({ types }) => {
  return (
    <div>
      {types?.map((type, index) => (
        <div className="flex items-center p-1" key={index}>
          <input
            type="checkbox"
            name={type.name}
            className="border rounded-xl w-4 h-4 accent-black text-black"
          ></input>
          <label htmlFor={type.name} className="px-2 text-gray-600 text-md">
            {type.name}
          </label>
        </div>
      ))}
    </div>
  );
};
