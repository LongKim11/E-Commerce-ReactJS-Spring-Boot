import React from "react";
import { StarIcon } from "../Common/StarIcon";
import { EmptyStarIcon } from "../Common/EmptyStarIcon";

const ratingStar = [1, 2, 3, 4];
const emptyStar = [1];
const rating = 4;

export const Rating = () => {
  return (
    <div className="flex items-center">
      {ratingStar.map((_, index) => (
        <StarIcon key={index} />
      ))}
      {emptyStar.map((_, index) => (
        <EmptyStarIcon key={index} />
      ))}
      <span className="ml-2">{rating}</span>
    </div>
  );
};
