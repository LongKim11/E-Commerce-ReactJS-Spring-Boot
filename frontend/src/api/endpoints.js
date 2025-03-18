export const API_URLS = {
  GET_PRODUCTS: "/api/products",
  GET_PRODUCT_BY_ID: (id) => `/api/product/${id}`,
  GET_PRODCUT_BY_GENDER: (gender) => `/api/product/by-gender?gender=${gender}`,
  GET_CATEGORIES: "/api/category",
  GET_CATEGORY_BY_ID: (id) => `/api/category/${id}`,
};

export const API_BASE_URL = "http://localhost:8080";
