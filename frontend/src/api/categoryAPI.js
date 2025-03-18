import axiosInstance from "./axiosInstance";
import { API_URLS } from "./endpoints";

export const getAllCategory = async () => {
  try {
    const response = await axiosInstance(API_URLS.GET_CATEGORIES, {
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.log("Error fetching category:", err);
  }
};
