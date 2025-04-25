
import React from "react";
import { offer } from "../data/Data";

const Offer = () => {
  return (
    <div className="mt-8">
      <div className="w-11/12 m-auto">
        {offer.map((data, key) => (
          <div key={key} className="relative mb-8">
            <div className="craft-img rounded-3xl overflow-hidden">
              <img
                src={data.customer_img}
                alt="img"
                className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-500 ease-in-out rounded-3xl group-hover:scale-105"
              />
            </div>
            <div className="absolute top-0 right-0 p-4">
              <p className="bg-white p-2 text-lg md:text-xl rounded-full">
                {data.title}
              </p>
              <h1 className="bg-white px-4 py-2 text-xl md:text-3xl mt-2 rounded-full">
                {data.subtitle}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
