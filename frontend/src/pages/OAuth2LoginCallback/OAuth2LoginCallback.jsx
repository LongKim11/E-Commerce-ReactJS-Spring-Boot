import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../../utils/jwt-helper";

export const OAuth2LoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      saveToken(token);
      navigate("/");
    } else {
      navigate("/auth/login");
    }
  }, []);

  return <div>OAuth2LoginCallback</div>;
};
