import { jwtDecode } from "jwt-decode";

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.clear();
};

export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp > currentTime;
  } catch (err) {
    console.log(err);
    return false;
  }
};
