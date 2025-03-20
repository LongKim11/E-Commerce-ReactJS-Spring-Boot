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
    throw new Error(err);
  }
};

export const register = async (formData) => {
  try {
    const response = await axiosInstance(API_URLS.AUTHENTICATION_REGISTER, {
      method: "POST",
      data: formData,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log("Error while registering", err);
    throw new Error(err);
  }
};
