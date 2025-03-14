import React, { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Breadcumb } from "../../components/Breadcumb/Breadcumb";
import content from "../../data/content.json";

const categories = content.categories;

export const ProductDetailPage = () => {
  const { product } = useLoaderData();
  const [currentImage, setCurrentImage] = useState(product.thumbnail);
  const [links, setLinks] = useState([]);

  const productCategory = useMemo(() => {
    return categories.find((category) => category.id === product.category_id);
  }, [product]);

  useEffect(() => {
    const arrLinks = [
      { title: "Shop", path: "/" },
      {
        title: productCategory.name,
        path: productCategory.path,
      },
    ];

    const type = productCategory.types.find(
      (type) => type.id === product.type_id
    );
    arrLinks.push({ title: type.name, path: type.name });
    setLinks(arrLinks);
  }, [productCategory, product]);

  return (
    <div className="flex flex-col md:flex-row px-10">
      <div className="w[100%] md:w-[40%] lg:w-[50%]">
        {/* Image */}
        <div className="flex flex-col md:flex-row h-[30%]">
          <div className="w-[100%] md:w-[20%] justity-center h-[40px] md:h-[420px]">
            {/* Stack Images */}
            <div className="flex flex-col justify-center h-full">
              {product.images.map((image, index) => (
                <button key={index} onClick={() => setCurrentImage(image)}>
                  <img
                    src={image}
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
        <Breadcumb links={links} />
      </div>
    </div>
  );
};
