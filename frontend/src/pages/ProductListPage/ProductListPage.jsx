import React, { useMemo } from "react";
import { FilterIcon } from "../../components/Common/FilterIcon";
import content from "../../data/content.json";

const categories = content.categories;

export const ProductListPage = ({ gender }) => {
  const data = useMemo(() => {
    return categories.find((category) => category.code == gender);
  }, [gender]);

  return (
    <>
      <div className="flex">
        {/* Filters */}
        <div className="w-[25%] p-[20px] border rounded-lg m-[20px]">
          <div className="flex justify-between">
            <p className="text-lg text-gray-600">Filter</p>
            <FilterIcon />
          </div>
          <div>
            <p className="text-lg mt-5">Categories</p>
          </div>
        </div>

        {/* Products */}
        <div>
          <p className="text-lg">{data?.description}</p>
        </div>
      </div>
    </>
  );
};
