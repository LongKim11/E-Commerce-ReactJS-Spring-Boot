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

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProduct, setSimilarProduct] = useState([]);
  const [currentImage, setCurrentImage] = useState();
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
                      src={currentImage}
                      className="h-[60px] w-[60px] bg-cover bg-center p-2"
                    ></img>
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full md:w-[80%] flex justify-center">
              {/* Current Image */}
              <img
                src={currentImage}
                className="h-[520px] w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
        <div className="w-[60%] px-10">
          {/* Product Description */}
          <p className="text-3xl my-3">{product?.name}</p>
          <Rating />
          <p className="text-2xl text-bold my-3">$ {product?.price}</p>
          <Size sizes={product?.productVariantList}></Size>
          <Link
            to={"https://en.wikipedia.org/wiki/Clothing_sizes"}
            className="text-gray-500 hover:text-gray-700"
            target="_blank"
          >{`Size Guide ->`}</Link>
          <div>
            <p className="text-lg font-bold mt-5 mb-2">Colors Available</p>
            <ProductColors data={product?.productVariantList} />
          </div>
          <hr className="my-5"></hr>
          <div className="flex mt-5">
            <button className="bg-black rounded-lg w-[150px] px-2">
              <div className="flex items-center text-white">
                <CartIcon bgColor={"white"} />
                Add to cart
              </div>
            </button>
          </div>
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
        <div className="flex gap-12 mt-5">
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
