import React from "react";
import { Navigation } from "../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";

export const MainLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};
