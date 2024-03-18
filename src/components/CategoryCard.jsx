import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = (category) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${category.datakey}`);
  };

  return (
    
    <div className="group" onClick={handleNavigate}>
      <div
        key={category.datakey}
        className="flex flex-col justify-center items-center self-center"
      >
        <img
          className="w-[84px] h-[84px] group-hover:scale-110 transition ease-out "
          src={category.img}
          alt={category.title}
        />
        <div>
          <div className="text-black mt-2 mb-2 group-hover:text-red-500 group-hover:scale-110 transition ease-out">
            {category.title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
