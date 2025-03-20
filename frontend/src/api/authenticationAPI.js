import axiosInstance from "./axiosInstance";
import { API_URLS } from "./endpoints";

export const login = async (formData) => {
  try {
    const response = await axiosInstance(API_URLS.AUTHENTICATION_LOGIN, {
      method: "POST",
      data: formData,
    });

    return response.data;
  } catch (err) {
    console.log("Error while loging in", err);
  }
};
