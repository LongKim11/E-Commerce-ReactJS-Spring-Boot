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
      <Navigation />
      <Outlet />
      <Footer />

      {isLoading && <Spinner />}
    </>
  );
};
