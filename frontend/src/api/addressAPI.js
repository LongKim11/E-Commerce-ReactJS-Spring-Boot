import axiosInstance from "./axiosInstance";
import { API_URLS } from "./endpoints";
import { getToken } from "../utils/jwt-helper";

export const addNewAddress = async (data) => {
  try {
    const token = getToken();

    const response = await axiosInstance(API_URLS.ADD_NEW_ADDRESS, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      data: data,
    });
    return response.data;
  } catch (err) {
    console.log("Error while creating new address", err);
    throw new Error(err);
  }
};

export const deleteAddress = async (id) => {
  try {
    const token = getToken();

    const response = await axiosInstance(API_URLS.DELETE_ADDRESS(id), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.log("Error while deleting address", err);
    throw new Error(err);
  }
};
