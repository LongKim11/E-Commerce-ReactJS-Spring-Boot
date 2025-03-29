import React from "react";
import { Navigation } from "../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { useSelector } from "react-redux";
import { Spinner } from "../components/Spinner/Spinner";

export const MainLayout = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);

  return (
    <>
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <Outlet />

      {/* Footer */}
      <Footer />

      {/* Loading Spinner */}
      {isLoading && <Spinner />}
    </>
  );
};
