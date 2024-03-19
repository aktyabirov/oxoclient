import React from 'react';
import { useSelector } from 'react-redux';
import { useQueries } from '@tanstack/react-query';
import ProductCard from '../../components/ProductCard';
import axios from 'axios';

const fetchProductDetails = async (id) => {
  const response = await axios.get(`http://localhost:8080/all/${id}`);
  return response.data;
};

const FavoritesPage = () => {
  const likedProductIds = useSelector(state => state.likes.likedProducts);

  const productQueries = useQueries({
    queries: likedProductIds.map(id => ({
      queryKey: ['product', id],
      queryFn: () => fetchProductDetails(id),
    })),
  });

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
          return null; 
        })}
      </div>
    </div>
  );
};

export default FavoritesPage;
