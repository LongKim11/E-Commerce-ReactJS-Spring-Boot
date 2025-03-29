import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/jwt-helper";

export const Logout = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <>
      <div className="flex justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/10477/10477736.png"
          alt="Logout Icon"
          className="w-40 h-40 my-6"
        />
      </div>
      <button
        className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-all cursor-pointer"
        onClick={handleLogOut}
      >
        Logout
      </button>
    </>
  );
};
