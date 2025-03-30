import axiosInstance from "./axiosInstance";
import { API_URLS } from "./endpoints";
import { getToken } from "../utils/jwt-helper";

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

const addNewProduct = async (formData) => {
  try {
    console.log("Form data", formData);
    const response = await axiosInstance(API_URLS.ADD_NEW_PRODUCT, {
      method: "POST",
      data: formData,
    });
    return response.data;
  } catch (err) {
    console.log("Error while adding new product");
    throw new Error(err);
  }
};

export {
  getAllProduct,
  getProductByGender,
  getProductByID,
  getProductByCategory,
  addNewProduct,
};
