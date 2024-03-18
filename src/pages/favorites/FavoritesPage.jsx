import React from 'react';
import { useSelector } from 'react-redux';
import { useQueries } from '@tanstack/react-query';
import ProductCard from '../../components/ProductCard';
import axios from 'axios';

// Assuming this function fetches product details given an ID
const fetchProductDetails = async (id) => {
  const response = await axios.get(`http://localhost:8080/all/${id}`);
  return response.data;
};

const FavoritesPage = () => {
  // Fetch likedProductIds from Redux store or local storage
  const likedProductIds = useSelector(state => state.likes.likedProducts);

  // Execute queries to fetch details for all liked products
  const productQueries = useQueries({
    queries: likedProductIds.map(id => ({
      queryKey: ['product', id],
      queryFn: () => fetchProductDetails(id),
    })),
  });

  // Check if any query is loading
  const isLoading = productQueries.some(query => query.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <h2>My Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {productQueries.map((query, index) => {
          if (query.isSuccess) {
            return <ProductCard key={index} {...query.data} />;
          }
          return null; // Or a placeholder for error/loading states if needed
        })}
      </div>
    </div>
  );
};

export default FavoritesPage;
