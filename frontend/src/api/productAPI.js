import axiosInstance from "./axiosInstance";
import { API_URLS } from "./endpoints";

const getAllProduct = async () => {
  try {
    const response = await axiosInstance(API_URLS.GET_PRODUCTS, {
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.log("Error fetching Product:", err);
  }
};

const getProductByGender = async (gender) => {
  try {
    const response = await axiosInstance(
      API_URLS.GET_PRODUCT_BY_GENDER(gender),
      { method: "GET" }
    );
    return response.data;
  } catch (err) {
    console.log("Error fetching Product:", err);
  }
};

const getProductByID = async (id) => {
  try {
    const response = await axiosInstance(API_URLS.GET_PRODUCT_BY_ID(id), {
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.log("Error fetching Product:", err);
  }
};

const getProductByCategory = async (categoryID) => {
  try {
    const response = await axiosInstance(
      API_URLS.GET_PRODUCT_BY_CATEGORY(categoryID)
    );
    return response.data;
  } catch (err) {
    console.log("Error fetching Product:", err);
  }
};

export {
  getAllProduct,
  getProductByGender,
  getProductByID,
  getProductByCategory,
};
