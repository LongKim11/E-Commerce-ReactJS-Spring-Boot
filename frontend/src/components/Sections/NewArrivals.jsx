import React from "react";
import { SectionHeading } from "./SectionHeading";
import { Card } from "../Card/Card";
import HoodieImage from "../../assets/images/hoodie.jpg";
import Carousel from "react-multi-carousel";
import { responsive } from "../../utils/Section.constants";
import "./NewArrivals.css";

const items = [
  { title: "Hoodie", imagePath: HoodieImage },
  { title: "Hoodie", imagePath: HoodieImage },
  { title: "Hoodie", imagePath: HoodieImage },
  { title: "Hoodie", imagePath: HoodieImage },
  { title: "Hoodie", imagePath: HoodieImage },
  { title: "Hoodie", imagePath: HoodieImage },
  { title: "Hoodie", imagePath: HoodieImage },
  { title: "Hoodie", imagePath: HoodieImage },
  { title: "Hoodie", imagePath: HoodieImage },
];

export const NewArrivals = () => {
  return (
    <div className="my-20">
      <SectionHeading title={"New Arrivals"} />
      <Carousel
        responsive={responsive}
        autoPlay={false}
        swipeable={true}
        draggable={false}
        showDots={false}
        infinite={false}
        partialVisbile={false}
        itemClass={"react-slider-custom-item"}
        className="mt-5"
      >
        {items.map((item, index) => (
          <Card key={index} title={item.title} imagePath={item.imagePath} />
        ))}
      </Carousel>
    </div>
  );
};
