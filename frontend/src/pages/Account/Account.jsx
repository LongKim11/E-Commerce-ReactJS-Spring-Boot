import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid, logout } from "../../utils/jwt-helper";

export const Account = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTokenValid()) {
      console.log(isTokenValid);
      navigate("/auth/login");
    }
  }, [navigate]);

  const handleLogOut = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 shadow-lg rounded-lg mb-32 border border-slate-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Account Management
      </h2>
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
    </div>
  );
};
