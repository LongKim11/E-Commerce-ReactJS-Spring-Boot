import React, { useEffect, useMemo, useState } from "react";
import { FilterIcon } from "../../components/Common/FilterIcon";
import content from "../../data/content.json";
import { Categories } from "../../components/Filter/Categories";
import { Price } from "../../components/Filter/Price";
import { Colors } from "../../components/Filter/Colors";
import { Size } from "../../components/Filter/Size";
import { ProductCard } from "./ProductCard";
import { getProductByGender } from "../../api/productAPI";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/loadingSlice";

const categories = content.categories;

const uniqueCategory = (products) => {
  return products.reduce((acc, product) => {
    if (!acc.includes(product.category.name)) {
      acc.push(product.category.name);
    }
    return acc;
  }, []);
};

const uniqueColor = (products) => {
  return products.reduce((acc, product) => {
    for (let c of product.productVariantList) {
      if (!acc.includes(c.color)) {
        acc.push(c.color);
      }
    }
    return acc;
  }, []);
};

const uniqueSize = (products) => {
  return products.reduce((acc, product) => {
    for (let s of product.productVariantList) {
      if (!acc.includes(s.size)) {
        acc.push({ size: s.size });
      }
    }
    return acc;
  }, []);
};

export const ProductListPage = ({ gender }) => {
  const categoriesData = useMemo(() => {
    return categories.find((category) => category.code == gender);
  }, [gender]);

  const [productList, setProductList] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    getProductByGender(gender)
      .then((res) => {
        console.log("Data: ", res);
        setProductList(res);
        setCategoryFilter(uniqueCategory(res));
        setColorFilter(uniqueColor(res));
        setSizeFilter(uniqueSize(res));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  }, [gender, dispatch]);

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
            <Categories types={categoryFilter} />
            <hr className="mt-3"></hr>
          </div>
          {/* Price */}
          <div>
            <Price />
            <hr className="mt-5"></hr>
          </div>
          {/* Colors */}
          <div>
            <Colors colors={colorFilter} />
            <hr className="mt-5"></hr>
          </div>
          {/* Sizes */}
          <div>
            <Size sizes={sizeFilter} />
          </div>
        </div>

        {/* Products */}
        <div className="p-3">
          <p className="text-lg">{categoriesData?.description}</p>
          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {productList?.map((product, index) => (
              <ProductCard key={index} data={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
