export const API_URLS = {
  GET_PRODUCTS: "/api/products",
  GET_PRODUCT_BY_ID: (id) => `/api/product/${id}`,
  GET_PRODUCT_BY_GENDER: (gender) => `/api/product/by-gender?gender=${gender}`,
  GET_PRODUCT_BY_CATEGORY: (categoryID) =>
    `/api/product/by-category?categoryID=${categoryID}`,
  GET_CATEGORIES: "/api/category",
  GET_CATEGORY_BY_ID: (id) => `/api/category/${id}`,
  AUTHENTICATION_LOGIN: "/api/auth/login",
  AUTHENTICATION_REGISTER: "/api/auth/register",
};

export const API_BASE_URL = "http://localhost:8080";
