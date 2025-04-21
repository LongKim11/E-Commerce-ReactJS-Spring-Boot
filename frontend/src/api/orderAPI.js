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

export const getOrdersByUser = async () => {
  try {
    const token = getToken();
    const response = await axiosInstance(API_URLS.GET_ORDERS_BY_USER, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.log("Error while fetching orders by user", err);
    throw new Error(err);
  }
};

export const getAllOrder = async () => {
  try {
    const token = getToken();
    const response = await axiosInstance(API_URLS.GET_ALL_ORDERS, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.log("Error while fetching orders by user", err);
    throw new Error(err);
  }
};

export const updateOrderDeliveryStatus = async (id, formData) => {
  try {
    const token = getToken();
    const response = await axiosInstance(
      API_URLS.UPDATE_ORDER_DELIVERY_STATUS(id),
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        data: formData,
      }
    );
    return response.data;
  } catch (err) {
    console.log("Error while fetching orders by user", err);
    throw new Error(err);
  }
};
