import React from "react";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import { Card } from "../../Card/Card";

export const Category = ({ title, data }) => {
  return (
    <div className="my-20">
      <SectionHeading title={title} />
      <div className="flex mt-5">
        {data.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            description={item.description}
            imagePath={item.imagePath}
            actionArrow={true}
            h={"280px"}
          ></Card>
        ))}
      </div>
    </div>
  );
};
