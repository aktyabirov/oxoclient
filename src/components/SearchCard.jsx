import React from "react";
import { useNavigate } from "react-router-dom";

export const SearchCard = ({ id, productUrl, title, price, location }) => {
  const navigate = useNavigate();

  const navigateToProductDetail = () => {
    navigate(`/all/${id}`);
  };

  return (
    <div
      className="flex items-center p-2 bg-white shadow-md hover:bg-gray-100 cursor-pointer w-[560px]"
      onClick={navigateToProductDetail}
    >
      <div className="flex-shrink-0">
        <img src={productUrl} alt={title} className="h-10 w-10 object-cover rounded-full mr-4" />
      </div>
      <div className="flex gap-4">
        <h2 className="text-sm font-medium">{title}</h2>
        <h2 className="text-sm font-medium">${price}</h2>
        <p className="text-sm font-medium">{location}</p>
      </div>
    </div>
  );
};
