import React, { useMemo } from "react";
import { StarIcon } from "../Common/StarIcon";
import { EmptyStarIcon } from "../Common/EmptyStarIcon";

export const Rating = ({ rating }) => {
  const ratingStar = useMemo(() => {
    return Array.from({ length: Math.floor(Number(rating)) }, (_, i) => i + 1);
  }, [rating]);

  const emptyStar = useMemo(() => {
    return Array.from({ length: 5 - ratingStar.length }, (_, i) => i + 1);
  }, [ratingStar]);

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
