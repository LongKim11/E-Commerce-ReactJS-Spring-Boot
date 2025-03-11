import React from "react";

export const Card = ({ imagePath, title }) => {
  return (
    <div className="flex flex-col px-10">
      <img
        src={imagePath}
        alt={title}
        className="h-[240px] w-[200px] bg-cover bg-center rounded hover:scale-105 cursor-pointer transition-transform"
      />
      <p className="text-lg mt-3">{title}</p>
    </div>
  );
};
