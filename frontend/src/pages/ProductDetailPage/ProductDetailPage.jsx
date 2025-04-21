import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "../../components/Rating/Rating";
import { Link } from "react-router-dom";
import { Size } from "../../components/Filter/Size";
import { ProductColors } from "./ProductColors";
import { CartIcon } from "../../components/Common/CartIcon";
import { CreditCardIcon } from "../../components/Common/CreditCardIcon";
import { ClothIcon } from "../../components/Common/ClothIcon";
import { ShippingIcon } from "../../components/Common/ShippingIcon";
import { ReturnIcon } from "../../components/Common/ReturnIcon";
import { ProductCard } from "../ProductListPage/ProductCard";
import { getProductByID } from "../../api/productAPI";
import { getProductByCategory } from "../../api/productAPI";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/loadingSlice";
import { addToCart } from "../../store/features/cartSlice";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProduct, setSimilarProduct] = useState([]);
  const [currentImage, setCurrentImage] = useState();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    getProductByID(id)
      .then((res) => {
        console.log("Product: ", res);
        setProduct(res);
        setCurrentImage(res.resources[0].url);
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  }, [id, dispatch]);

  useEffect(() => {
    if (product?.category?.id) {
      getProductByCategory(product?.category?.id)
        .then((res) => {
          const filteredProduct = res.filter((p) => p.id != product.id);
          console.log("Similar products:", filteredProduct);
          setSimilarProduct(filteredProduct);
        })
        .catch((err) => console.log(err));
    }
  }, [product, dispatch]);

  useEffect(() => {
    if (selectedSize) {
      setError("");
    }
  }, [selectedSize]);

  useEffect(() => {
    if (selectedColor) {
      setError("");
    }
  }, [selectedColor]);

  const addItemToCart = () => {
    if (!selectedSize) {
      setError("Please select product size!");
    } else if (!selectedColor) {
      setError("Please select product color!");
    } else {
      const selectedVariant = product.productVariantList.filter(
        (item) => item.color == selectedColor && item.size == selectedSize
      );
      console.log("Select variant", selectedVariant);
      if (selectedVariant) {
        dispatch(
          addToCart({
            productID: product.id,
            name: product.name,
            brand: product.brand,
            thumbnail: product.resources[0].url,
            variant: selectedVariant,
            quantity: 1,
            price: product.price,
            subTotal: product.price,
          })
        );
      }
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row px-10">
        <div className="w-[100%] md:w-[40%] lg:w-[50%]">
          {/* Image */}
          <div className="flex flex-col md:flex-row">
            <div className="w-[100%] md:w-[15%] justity-center">
              {/* Stack Images */}
              <div className="flex flex-col justify-center h-full">
                {product?.resources?.map((resource, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(resource.url)}
                  >
                    <img
                      src={resource.url}
                      alt={`Product Image ${index + 1}`}
                      className="h-[60px] w-[60px] bg-cover bg-center p-2"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full md:w-[80%] flex justify-center">
              {/* Current Image */}
              <img
                src={currentImage}
                className="h-[720px] w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
        <div className="w-[60%] px-10">
          {/* Product Description */}
          <p className="text-3xl my-3">{product?.name}</p>
          <Rating />
          <p className="text-2xl text-bold my-3">$ {product?.price}</p>
          <Size
            sizes={product?.productVariantList}
            onChange={(values) => setSelectedSize(values)}
          ></Size>
          <Link
            to={"https://en.wikipedia.org/wiki/Clothing_sizes"}
            className="text-gray-500 hover:text-gray-700"
            target="_blank"
          >{`Size Guide ->`}</Link>
          <div>
            <p className="text-lg font-bold mt-5 mb-2">Colors Available</p>
            <ProductColors
              data={product?.productVariantList}
              onChange={(values) => setSelectedColor(values)}
            />
          </div>
          <hr className="my-5"></hr>
          <div className="flex my-5">
            <button
              onClick={addItemToCart}
              className="bg-black hover:bg-gray-800 rounded-lg px-6 py-3 text-white font-medium flex items-center gap-3 shadow-md cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
              Add to Cart
            </button>
          </div>
          {error && <p className="text-lg text-red-500">{error}</p>}
          <div className="grid grid-cols-2 gap-4 my-5">
            <div className="flex items-center">
              <CreditCardIcon />
              Secure Payment
            </div>
            <div className="flex items-center">
              <ClothIcon />
              Size & Fit
            </div>
            <div className="flex items-center">
              <ShippingIcon />
              Free shipping
            </div>

            <div className="flex items-center">
              <ReturnIcon />
              Return and Refund Policy
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[50%] p-10">
        <p className="text-3xl">| Product Description</p>
        <p className="mt-3">{product?.description}</p>
      </div>
      <div className="p-10">
        <p className="text-3xl">| Similar Product</p>
        <div className="grid md:grid-cols-5 gap-12 mt-5">
          {similarProduct?.map((product, index) => (
            <ProductCard key={index} data={product} />
          ))}
          {!similarProduct.length && (
            <p>Follow our website to get latest products!</p>
          )}
        </div>
      </div>
    </>
  );
};
