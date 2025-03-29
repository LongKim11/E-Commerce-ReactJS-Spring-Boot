import React, { useEffect, useState } from "react";
import { FilterIcon } from "../../components/Common/FilterIcon";
import { ProductCard } from "./ProductCard";
import { getProductByGender } from "../../api/productAPI";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/loadingSlice";

const uniqueCategory = (products) => {
  return products?.reduce((acc, product) => {
    if (!acc.includes(product.category.name)) {
      acc.push(product.category.name);
    }
    return acc;
  }, []);
};

const uniqueColor = (products) => {
  return products?.reduce((acc, product) => {
    for (let c of product.productVariantList) {
      if (!acc.includes(c.color)) {
        acc.push(c.color);
      }
    }
    return acc;
  }, []);
};

const uniqueSize = (products) => {
  return products?.reduce((acc, product) => {
    for (let s of product.productVariantList) {
      if (!acc.includes(s.size)) {
        acc.push({ size: s.size });
      }
    }
    return acc;
  }, []);
};

export const ProductListPage = ({ gender }) => {
  const [productList, setProductList] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const dispatch = useDispatch();

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  const handleColorSelect = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleSizeSelect = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleApplyFilters = () => {
    const filters = {
      categories: selectedCategories,
      colors: selectedColors,
      sizes: selectedSizes,
      priceRange: {
        min: minPrice,
        max: maxPrice,
      },
    };
    console.log("Filters to send to backend:", filters);
  };

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
        <div className="w-[25%] p-6 rounded-lg m-5 shadow-md bg-white border border-gray-300">
          {/* Filter Header */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-semibold text-gray-700">Filters</p>
            <FilterIcon />
          </div>

          {/* Categories */}
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-800">Categories</p>
            <div className="mt-2 space-y-2">
              {categoryFilter?.map((category, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-black rounded border-gray-400 focus:ring-black"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategorySelect(category)}
                  />
                  <span className="text-gray-700">{category}</span>
                </label>
              ))}
            </div>
            <hr className="mt-4 border-gray-300" />
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              Price Range
            </p>

            {/* Preset Range Buttons */}
            <div className="flex flex-wrap gap-3">
              {[
                { min: 0, max: 50 },
                { min: 51, max: 100 },
                { min: 101, max: 200 },
                { min: 201, max: 500 },
                { min: 501, max: 1000 },
              ].map((range, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all cursor-pointer ${
                    minPrice == range.min && maxPrice == range.max
                      ? "bg-black text-white border-black scale-105 shadow-md"
                      : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                  }`}
                  onClick={() => {
                    setMinPrice(range.min);
                    setMaxPrice(range.max);
                  }}
                >
                  ${range.min} - ${range.max}
                </button>
              ))}
            </div>

            {/* Custom Input Fields */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Or enter a custom range:
              </p>
              <div className="flex items-center gap-4">
                {/* Min Price Input */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="5000"
                    className="w-28 pl-6 pr-2 py-1 border border-gray-400 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>

                <span className="text-gray-600">—</span>

                {/* Max Price Input */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="5000"
                    className="w-28 pl-6 pr-2 py-1 border border-gray-400 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-800">Colors</p>
            <div className="flex flex-wrap gap-3 mt-3">
              {colorFilter?.map((color, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full border cursor-pointer hover:scale-110 transition-transform ${
                      selectedColors.includes(color)
                        ? "border-gray-700 scale-110 shadow-lg"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                  ></div>
                  <p className="text-sm text-gray-600 mt-1">{color}</p>
                </div>
              ))}
            </div>
            <hr className="mt-4 border-gray-300" />
          </div>

          {/* Sizes */}
          <div className="mb-10">
            <p className="text-lg font-medium text-gray-800">Select Size</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {sizeFilter?.map((item, index) => (
                <button
                  key={index}
                  className={`w-12 h-10 text-gray-700 rounded-lg text-center font-medium cursor-pointer transition-all border ${
                    selectedSizes.includes(item.size)
                      ? "bg-black text-white border-black scale-105 shadow-md"
                      : "bg-gray-200 border-gray-300"
                  }`}
                  onClick={() => handleSizeSelect(item.size)}
                >
                  {item.size}
                </button>
              ))}
            </div>
          </div>

          {/* Apply Filter Button */}
          <div className="flex justify-center gap-x-3">
            <button
              className="w-1/2 px-4 py-2 text-white bg-gray-600 rounded-lg font-medium text-sm hover:bg-gray-700 transition-all focus:outline-none shadow-md cursor-pointer"
              onClick={() => {
                setSelectedCategories([]);
                setSelectedColors([]);
                setSelectedSizes([]);
                setMinPrice(0);
                setMaxPrice(5000);
                console.log("Filters Reset");
              }}
            >
              Reset Filters
            </button>
            <button
              className="w-1/2 px-4 py-2 text-white bg-blue-600 rounded-lg font-medium text-sm hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md cursor-pointer"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Products */}
        <div className="p-3">
          <p className="text-lg font-bold">{gender} COLLECTIONS</p>
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
