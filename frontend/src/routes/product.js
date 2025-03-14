import content from "../data/content.json";

export const loadProductByID = ({ params }) => {
  const product = content.products.find(
    (product) => product.id == params.productID
  );

  return { product };
};
