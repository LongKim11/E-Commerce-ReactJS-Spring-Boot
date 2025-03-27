import axiosInstance from "./axiosInstance";
import { API_URLS } from "./endpoints";
import { getToken } from "../utils/jwt-helper";

export const getUserDetails = async () => {
  try {
    const token = getToken();

    const response = await axiosInstance(API_URLS.GET_USER_DETAILS, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.log("Error while fetching User Detail", err);
    throw new Error(err);
  }
};
