import axiosInstance from "./axiosInstance";
import { API_URLS } from "./endpoints";
import { getToken } from "../utils/jwt-helper";

export const createOrder = async (formData) => {
  try {
    const token = getToken();

    const response = await axiosInstance(API_URLS.CREATE_ORDER, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      data: formData,
    });
    return response.data;
  } catch (err) {
    console.log("Error while creating order");
    throw new Error(err);
  }
};

export const confirmPayment = async (formData) => {
  try {
    const token = getToken();

    const response = await axiosInstance(API_URLS.CONFIRM_PAYMENT, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      data: formData,
    });
    return response.data;
  } catch (err) {
    console.log("Error while confirming payment");
    throw new Error(err);
  }
};
