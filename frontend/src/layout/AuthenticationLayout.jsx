import React from "react";
import { Navigation } from "../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import AuthBG from "../assets/images/authentication-bg.jpg";
import { useSelector } from "react-redux";
import { Spinner } from "../components/Spinner/Spinner";

export const AuthenticationLayout = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  return (
    <>
      <Navigation variant="authentication" />
      <div className="flex">
        <div className="w-[65%]">
          <img
            src={AuthBG}
            className="bg-cover w-full bg-center object-cover"
            style={{
              height: "calc(100vh - 100px)",
            }}
          ></img>
        </div>
        <div className="min-w-[35%]">
          <Outlet />
        </div>
      </div>
      {isLoading && <Spinner />}
      <Footer />
    </>
  );
};
