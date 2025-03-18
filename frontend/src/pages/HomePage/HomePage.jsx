import React, { useRef } from "react";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { ShopByGender } from "../../components/Sections/ShopByGender/ShopByGender";
import { ContactUs } from "../../components/Sections/ContactUs/ContactUs";


export const HomePage = () => {
  const shopByGenderRef = useRef(null);
  const contactUsRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <>
      <HeroSection
        onShopNowClick={() => scrollToSection(shopByGenderRef)}
        onContactUsClick={() => scrollToSection(contactUsRef)}
      />
      <div ref={shopByGenderRef}>
        <ShopByGender />
      </div>
      <div ref={contactUsRef}>
        <ContactUs />
      </div>
    </>
  );
};
