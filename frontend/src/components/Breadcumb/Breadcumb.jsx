import React from "react";
import { Link } from "react-router-dom";
import { BreadcumbIcon } from "../Common/BreadcumbIcon";

export const Breadcumb = ({ links }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {links?.map((link, index) => (
          <li key={index} className="inline-flex items-center">
            <Link
              to={link?.path}
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black"
            >
              {link?.title}
              {links.length - 1 !== index && <BreadcumbIcon />}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};
