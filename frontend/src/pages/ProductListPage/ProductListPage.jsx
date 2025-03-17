import React, { useMemo } from "react";
import { FilterIcon } from "../../components/Common/FilterIcon";
import content from "../../data/content.json";
import { Categories } from "../../components/Filter/Categories";
import { Price } from "../../components/Filter/Price";
import { Colors } from "../../components/Filter/Colors";
import { Size } from "../../components/Filter/Size";
import { ProductCard } from "./ProductCard";
const categories = content.categories;

export const ProductListPage = ({ gender }) => {
  const categoriesData = useMemo(() => {
    return categories.find((category) => category.code == gender);
  }, [gender]);

  const productsData = useMemo(() => {
    return content.products.filter(
      (product) => product.category_id == categoriesData.id
    );
  }, [categoriesData]);

  return (
    <>
      <div className="flex mt-10 mb-20">
        {/* Filters */}
        <div className="w-[25%] p-6 border rounded-lg m-5">
          <div className="flex justify-between">
            <p className="text-lg text-gray-600">Filter</p>
            <FilterIcon />
          </div>
          {/* Categories */}
          <div>
            <p className="text-lg mt-5">Categories</p>
            <Categories types={categoriesData?.types} />
            <hr className="mt-3"></hr>
          </div>
          {/* Price */}
          <div>
            <Price />
            <hr className="mt-5"></hr>
          </div>
          {/* Colors */}
          <div>
            <Colors colors={categoriesData?.meta_data.colors} />
            <hr className="mt-5"></hr>
          </div>
          {/* Sizes */}
          <div>
            <Size sizes={categoriesData?.meta_data.sizes} />
          </div>
        </div>

        {/* Products */}
        <div className="p-3">
          <p className="text-lg">{categoriesData?.description}</p>
          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {productsData.map((product, index) => (
              <ProductCard key={index} data={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
