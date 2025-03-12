import React from "react";

export const SectionHeading = ({ title }) => {
  return (
    <div className="flex flex-wrap px-10">
      <div></div>
      <p className="text-3xl">| {title}</p>
    </div>
  );
};
