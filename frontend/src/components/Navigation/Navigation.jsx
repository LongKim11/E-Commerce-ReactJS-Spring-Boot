import React, { useState } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between py-2 px-4 md:px-8 lg:px-16">
      {/* Logo */}
      <div className="flex items-center gap-2 md:gap-6">
        <NavLink to="/">
          <Logo />
        </NavLink>
        <NavLink className="text-xl md:text-3xl text-black font-bold" to="/">
          ProAthlete
        </NavLink>
      </div>

      {/* Mobile menu button */}
      <div className="block lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-gray-500 hover:border-gray-500"
        >
          <svg
            className="fill-current h-5 w-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            ) : (
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            )}
          </svg>
        </button>
      </div>

      {/* Nav items - desktop */}
      <div
        className={`lg:flex flex-grow lg:flex-grow-0 items-center w-full lg:w-auto ${
          mobileMenuOpen ? "flex flex-col" : "hidden"
        }`}
      >
        <ul className="flex flex-col lg:flex-row lg:gap-8 xl:gap-14 mt-4 lg:mt-0">
          <li className="text-gray-500 hover:text-black py-2 lg:py-0">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Shop
            </NavLink>
          </li>
          <li className="text-gray-500 hover:text-black py-2 lg:py-0">
            <NavLink
              to="/men"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Men
            </NavLink>
          </li>
          <li className="text-gray-500 hover:text-black py-2 lg:py-0">
            <NavLink
              to="/women"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Women
            </NavLink>
          </li>
          <li className="text-gray-500 hover:text-black py-2 lg:py-0">
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
      <div
        className={`rounded-md bg-gray-100 w-full lg:w-auto mt-4 lg:mt-0 ${
          mobileMenuOpen ? "flex" : "hidden lg:flex"
        }`}
      >
        <div className="flex overflow-hidden w-full">
          <div className="flex items-center justify-center px-4 w-full">
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
              className="px-4 py-2 outline-none w-full"
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      {/* Action Items - Icons */}
      <div
        className={`flex flex-wrap items-center mt-4 lg:mt-0 ${
          mobileMenuOpen ? "flex w-full justify-start" : "hidden lg:flex"
        }`}
      >
        {variant == "default" && (
          <ul className="flex gap-8">
            <li className="cursor-pointer">
              <Wishlist />
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
          <div className="flex gap-x-3 w-full lg:w-auto">
            <Link to="/auth/login" className="w-full lg:w-auto">
              <button className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-800 w-full">
                Log in
              </button>
            </Link>
            <Link to="/auth/register" className="w-full lg:w-auto">
              <button className="border border-black text-black px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-100 w-full">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
