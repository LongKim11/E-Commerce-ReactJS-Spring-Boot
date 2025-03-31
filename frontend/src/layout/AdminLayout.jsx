import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Logo } from "../components/Common/Logo";
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
  FaCog,
  FaChartLine,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Spinner } from "../components/Spinner/Spinner";
import { logout } from "../utils/jwt-helper";
import { useNavigate } from "react-router-dom";

export const AdminLayout = () => {
  const location = useLocation();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <FaHome /> },
    { name: "Products", path: "/admin/product", icon: <FaBox /> },
    { name: "Orders", path: "/admim/order", icon: <FaShoppingCart /> },
    { name: "Customers", path: "/admin/customer", icon: <FaUsers /> },
    { name: "Analytics", path: "/admin/income", icon: <FaChartLine /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  const handleLogOut = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 shadow-sm flex flex-col">
        {/* Logo Area */}
        <div className="py-6 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <Logo width={60} height={60} />
            <div className="ml-3">
              <h2 className="text-lg font-bold text-gray-800">ProAthlete</h2>
              <p className="text-xs text-gray-500">Administration</p>
            </div>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 py-6 px-4 overflow-y-auto">
          <div className="mb-4 px-2">
            <h3 className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
              Main
            </h3>
          </div>
          <ul className="space-y-1">
            {menuItems.slice(0, 3).map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                    location.pathname === item.path
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`mr-3 text-lg ${
                      location.pathname === item.path
                        ? "text-indigo-700"
                        : "text-gray-500 group-hover:text-gray-700"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                  {location.pathname === item.path && (
                    <span className="ml-auto w-1.5 h-8 rounded-full bg-indigo-600"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 mb-4 px-2">
            <h3 className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
              Management
            </h3>
          </div>
          <ul className="space-y-1">
            {menuItems.slice(3).map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                    location.pathname === item.path
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`mr-3 text-lg ${
                      location.pathname === item.path
                        ? "text-indigo-700"
                        : "text-gray-500 group-hover:text-gray-700"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                  {location.pathname === item.path && (
                    <span className="ml-auto w-1.5 h-8 rounded-full bg-indigo-600"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center p-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
              <span className="text-sm font-bold">AD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">admin@proathlete.com</p>
            </div>
          </div>
          <button
            className="cursor-pointer flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 group"
            onClick={handleLogOut}
          >
            <FaSignOutAlt className="mr-2 text-gray-500 group-hover:text-gray-700" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <div className="bg-white m-6 p-6 rounded-lg shadow-sm border border-gray-100">
          <Outlet />
        </div>
      </main>

      {isLoading && <Spinner />}
    </div>
  );
};
