import React from "react";
import { useParams } from "react-router-dom";
import { useFetchDetail } from "../../hooks/useFetchDetail";
import { useDispatch, useSelector } from "react-redux";


const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const {id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useFetchDetail(id);

  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product details: {error.message}</div>;


  const date = new Date(product.postedTime);
  const readableDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const readableTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (

      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="flex justify-center">
            <img
              src={product.productUrl}
              alt={product.title}
              className="max-w-full h-auto rounded-md shadow-md"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-lg mb-4">
              <strong>Brand:</strong> {product.brand}
            </p>
            <p className="text-lg mb-4">
              <strong>Price:</strong> {product.price} Сум
            </p>
            <p className="text-gray-700 mb-4">
              {product.location || "No location."}
            </p>
            <p className="text-gray-700 mb-4">
              {product.description || "No detailed description available."}
            </p>
            <p className="text-gray-700 mb-4">
                {`${readableDate} ${readableTime}` || "No time."}
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            >
             Call : {product.phoneNumber}
            </button>
          </div>
        </div>
      </div>
  );
};

export default ProductDetailPage;
