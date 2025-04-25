
import React from "react";
import { footer } from "../data/Data";

const Footer = () => {
  return (
    <div className="bg-gray-900 py-10">
      <div className="w-10/12 m-auto">
        <div className="flex flex-col md:flex-row justify-between py-14 gap-8">
          {footer.map((item, key) => (
            <div className="text-gray-500 w-full md:w-2/6" key={key}>
              <h1 className="text-2xl mb-5 text-white">{item.header}</h1>
              <p>{item.content1}</p>
              <p>{item.content2}</p>
              <p>{item.content3}</p>
              <p>{item.content4}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
