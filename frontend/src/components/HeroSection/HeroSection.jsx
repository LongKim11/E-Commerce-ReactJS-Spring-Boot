import React from "react";
import HeroSectionImage from "../../assets/images/hero-section.jpg";

export const HeroSection = () => {
  return (
    <div
      className="relative flex items-center bg-cover bg-center text-left"
      style={{
        backgroundImage: `url(${HeroSectionImage})`,
        height: "calc(100vh - 100px)",
      }}
    >
      <main className="px-20 absolute top-36">
        <p className="text-white mt-6 text-6xl">Strong Looks,</p>
        <p className="text-white mt-6 text-6xl">Stronger Performance</p>
        <p className="text-white mt-6 text-xl">
          Conquer every challenge and push beyond limits
        </p>

        <button className="cursor-pointer rounded-3xl mt-6 w-44 h-12 bg-white text-black hover:bg-slate-100">
          Shop Women's
        </button>
        <button className="ml-5 cursor-pointer rounded-3xl mt-6 w-44 h-12 bg-gray-600 text-white hover:bg-gray-500">
          Shop Men's
        </button>
      </main>
    </div>
  );
};
