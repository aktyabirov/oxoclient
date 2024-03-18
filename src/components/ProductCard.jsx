import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../features/products/likesSlice";
import LikeIcon from "../assets/icon/LikeIcon";
import { NotLikeIcon } from "../assets/icon/NotLikeIcon";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


const ProductCard = ({
  id,
  title,
  productUrl,
  price,
  location,
  postedTime,
}) => {
  const dispatch = useDispatch();
  const likedProducts = useSelector((state) => state.likes.likedProducts);
  const liked = likedProducts.includes(id);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    dispatch(toggleLike(id));
  };


  const date = new Date(postedTime);
  const readableDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const readableTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const { categoryKey } = useParams();
  const navigate = useNavigate();

  const navigateToProductDetail = () => {
    const path = categoryKey ? `/${categoryKey}/${id}` : `/all/${id}`;
    navigate(path);
  };

  return (
    <div onClick={navigateToProductDetail} className="product-card bg-white shadow-md w-[220px] rounded-md cursor-pointer">
      <img className="w-[220px] h-[150px] rounded-tl-lg rounded-tr-lg" src={productUrl} alt={title} />
      <div className="product-info px-2">
        <h3 className="pt-2">{title}</h3>
        <p className="text-red-500 font-bold text-2xl pt-3 pb-2">${price}</p>
        <p className="text-darkgrey">{location}</p>
        <div className="flex items-center justify-between px-1 pb-3">
          <p className="text-darkgrey text-xs">
            {readableDate} at {readableTime}
          </p>
          <button onClick={handleLikeClick}>{liked ? <LikeIcon/> : <NotLikeIcon/> }</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
