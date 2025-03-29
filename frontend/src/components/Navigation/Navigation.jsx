import React from "react";
import { Wishlist } from "../Common/Wishlist";
import { CartIcon } from "../Common/CartIcon";
import { AccountIcon } from "../Common/AccountIcon";
import { Logo } from "../Common/Logo";
import { NavLink, Link } from "react-router-dom";
import "./Navigation.css";
import { useSelector } from "react-redux";

export const Navigation = ({ variant = "default" }) => {
  const cartItems = useSelector((state) => state.cart.cart);
  const cartLength = cartItems.length;

  return (
    <nav className="flex items-center justify-between py-2 px-16 gap-56">
      {/* Logo */}
      <div className="flex items-center gap-6">
        <NavLink to="/">
          <Logo />
        </NavLink>
        <NavLink className="text-3xl text-black font-bold gap-8" to="/">
          ProAthlete
        </NavLink>
      </div>
      {/* Nav items */}
      <div className="flex flex-wrap flex-1 items-center gap-10">
        <ul className="flex gap-14">
          <li className="text-gray-500 hover:text-black">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Shop
            </NavLink>
          </li>
          <li className="text-gray-500 hover:text-black">
            <NavLink
              to="/men"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Men
            </NavLink>
          </li>
          <li className="text-gray-500 hover:text-black">
            <NavLink
              to="/women"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Women
            </NavLink>
          </li>
          <li className="text-gray-500 hover:text-black">
            <NavLink
              to="/kids"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Kids
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Search bar */}
      <div className="flex justify-center rounded-md bg-gray-100">
        <div className="flex overflow-hidden">
          <div className="flex items-center justify-center px-4">
            <svg
              className="h-4 w-4 text-gray-500"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
            <input
              type="text"
              className="px-4 py-2 outline-none"
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      {/* Action Items - Icons */}
      <div className="flex flex-wrap items-center gap-4">
        {variant == "default" && (
          <ul className="flex gap-8">
            <li>
              <NavLink to="/wishlist">
                {({ isActive }) => <Wishlist isActive={isActive} />}
              </NavLink>
            </li>
            <li>
              <NavLink to="/account/profile">
                {({ isActive }) => <AccountIcon isActive={isActive} />}
              </NavLink>
            </li>
            <li className="relative">
              <NavLink to="/cart">
                {({ isActive }) => <CartIcon isActive={isActive} />}
              </NavLink>
              {cartLength > 0 && (
                <div className="absolute top-2 right-1 transform translate-x-2 -translate-y-2 h-6 w-6 bg-black text-white text-xs rounded-full border-2 border-white flex items-center justify-center">
                  {cartLength}
                </div>
              )}
            </li>
          </ul>
        )}

        {variant == "authentication" && (
          <div className="flex gap-x-3">
            <Link to="/auth/login">
              <button className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:hover:bg-slate-800">
                Log in
              </button>
            </Link>
            <Link to="/auth/register">
              <button className="border border-black text-black px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-100">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
