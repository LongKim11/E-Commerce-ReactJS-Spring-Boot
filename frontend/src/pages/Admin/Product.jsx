import React, { useEffect, useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { getAllProduct } from "../../api/productAPI";
import { setLoading } from "../../store/features/loadingSlice";
import { useDispatch } from "react-redux";
import { getAllCategory } from "../../api/categoryAPI";
import { handleUploadFile } from "../../services/UploadFile";
import { addNewProduct } from "../../api/productAPI";

export const Product = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    gender: "",
    category_id: "",
    variantList: [
      {
        color: "",
        size: "",
        stockQuantity: "",
      },
    ],
  });

  const [uploadImg, setUploadImg] = useState([]);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const addVariant = () => {
    setNewProduct({
      ...newProduct,
      variantList: [
        ...newProduct.variantList,
        { color: "", size: "", stockQuantity: "" },
      ],
    });
  };

  const removeVariant = (index) => {
    if (newProduct.variantList.length <= 1) return;

    const updatedVariants = [...newProduct.variantList];
    updatedVariants.splice(index, 1);

    setNewProduct({
      ...newProduct,
      variantList: updatedVariants,
    });
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...newProduct.variantList];
    updatedVariants[index][field] = value;

    setNewProduct({
      ...newProduct,
      variantList: updatedVariants,
    });
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setUploadImg([...files]);
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getAllProduct()
      .then((res) => {
        setProducts(res);
        console.log("Product List", res);
      })
      .catch((err) => console.log(err));

    getAllCategory()
      .then((res) => {
        setCategories(res);
        console.log("Category List", res);
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  }, []);

  useEffect(() => {
    console.log("New Product", newProduct);
  }, [newProduct]);

  const handleAddProduct = async () => {
    if (uploadImg.length === 0) {
      return;
    }

    dispatch(setLoading(true));
    try {
      dispatch(setLoading(true));
      const uploadUrls = await handleUploadFile(uploadImg);

      const newProductData = {
        ...newProduct,
        resourceList: uploadUrls.map((url) => ({ url })),
      };

      const res = await addNewProduct(newProductData);
      console.log("Add product", res);

      window.location.reload();
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 cursor-pointer">
            <FunnelIcon className="h-5 w-5 text-gray-500" />
            Filter
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Brand
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Gender
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products?.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.resources[0]?.url}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.brand}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {product.category.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.gender}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 backdrop-blur-[10px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-xl">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Add New Product
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Product name"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Brand name"
                      name="brand"
                      value={newProduct.brand}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Product description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="0.00"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={newProduct.category_id}
                      name="category_id"
                      onChange={handleInputChange}
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={newProduct.gender}
                      onChange={handleInputChange}
                      name="gender"
                    >
                      <option value="">Select gender</option>
                      <option value="MEN">MEN</option>
                      <option value="WOMEN">WOMEN</option>
                      <option value="KIDS">KIDS</option>
                      <option value="UNISEX">UNISEX</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Product Images
                </h3>
                <div
                  onClick={() => document.getElementById("imagesInput").click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500 transition-colors"
                >
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-50">
                    <PlusIcon className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-indigo-600">
                      Upload product images
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    {uploadImg?.length > 0 && (
                      <p className="text-xs text-green-500 mt-1 font-medium">
                        {uploadImg.length}{" "}
                        {uploadImg.length === 1 ? "file" : "files"} selected
                      </p>
                    )}
                  </div>
                  <input
                    id="imagesInput"
                    type="file"
                    multiple
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImagesUpload}
                  />
                </div>

                {/* Show Upload Filename */}
                {uploadImg?.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p className="font-medium">Selected files:</p>
                    <ul className="list-disc mt-1">
                      {uploadImg
                        .map((file, index) => (
                          <li key={index} className="truncate mt-2">
                            - {file.name}
                          </li>
                        ))
                        .slice(0, 3)}
                      {uploadImg.length > 3 && (
                        <li>+{uploadImg.length - 3} more files</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Variants */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    Product Variants
                  </h3>
                  <button
                    onClick={addVariant}
                    className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center cursor-pointer"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Variant
                  </button>
                </div>

                {newProduct.variantList.map((variant, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 space-y-4 mb-3"
                  >
                    <div className="flex justify-between items-center border-b pb-2">
                      <p className="font-medium text-gray-800">
                        Variant {index + 1}
                      </p>
                      <button
                        onClick={() => removeVariant(index)}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        disabled={newProduct.variantList.length <= 1}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Color
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="e.g. Blue"
                          value={variant.color}
                          onChange={(e) =>
                            handleVariantChange(index, "color", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Size
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="e.g. M"
                          value={variant.size}
                          onChange={(e) =>
                            handleVariantChange(index, "size", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stock Quantity
                        </label>
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="0"
                          min={0}
                          value={variant.stockQuantity}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "stockQuantity",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t px-6 py-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md cursor-pointer"
                onClick={handleAddProduct}
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
