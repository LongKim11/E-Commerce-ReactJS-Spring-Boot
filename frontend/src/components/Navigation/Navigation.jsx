import React from "react";
import { Wishlist } from "../Common/Wishlist";
import { CartIcon } from "../Common/CartIcon";
import { AccountIcon } from "../Common/AccountIcon";
import { Logo } from "../Common/Logo";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

export const Navigation = () => {
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
        <ul className="flex items-center gap-8">
          <li>
            <NavLink to="/wishlist">
              <Wishlist />
            </NavLink>
          </li>
          <li>
            <NavLink to="/account">
              <AccountIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart">
              <CartIcon />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
