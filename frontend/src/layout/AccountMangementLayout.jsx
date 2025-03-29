import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../api/userInfoAPI";
import { setLoading } from "../store/features/loadingSlice";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { isTokenValid } from "../utils/jwt-helper";
import { useNavigate } from "react-router-dom";
import { loadUserInfo } from "../store/features/userSlice";

export const AccountManagementLayout = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTokenValid()) {
      navigate("/auth/login");
    } else {
      dispatch(setLoading(true));
      getUserDetails()
        .then((res) => {
          console.log("User Details", res);
          dispatch(loadUserInfo(res));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => dispatch(setLoading(false)));
    }
  }, [dispatch, navigate]);

  return (
    <div className="max-w-5xl mx-auto mb-20">
      {userInfo?.email && (
        <>
          {/* Welcome Section */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Hello, {userInfo.firstName} {userInfo.lastName} 👋
            </h2>
            <p className="text-gray-500">Welcome to your account dashboard</p>
          </div>

          {/* Account Navigation */}
          <div className="md:flex gap-6">
            {/* Sidebar */}
            <ul className="w-full md:w-1/4 space-y-3">
              {[
                { to: "/account/profile", label: "Profile", icon: "👤" },
                { to: "/account/orders", label: "Orders", icon: "📦" },
                { to: "/account/logout", label: "Settings", icon: "⚙️" },
              ].map(({ to, label, icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 w-full text-lg ${
                        isActive
                          ? "bg-black text-white shadow-md"
                          : "bg-gray-200 text-gray-700 hover:bg-black hover:text-white"
                      }`
                    }
                  >
                    <span className="text-xl">{icon}</span> {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Content Area */}
            <div className="w-full md:w-3/4 p-6 bg-white rounded-lg shadow-md">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
