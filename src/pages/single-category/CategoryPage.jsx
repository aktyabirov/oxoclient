import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';

const fetchCategoryProducts = async ({ queryKey }) => {
  const categoryKey = queryKey[1];
  const response = await axios.get(`http://localhost:8080/${categoryKey}`);
  return response.data;
};

const CategoryPage = () => {
  const { categoryKey } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryKey === "support") {
      navigate("/supportPage");
    }
  }, [categoryKey, navigate]);

  const { data: products, error, isLoading, isError } = useQuery({
    queryKey: ['categoryProducts', categoryKey],
    queryFn: fetchCategoryProducts,
    enabled: categoryKey !== "support", 
  });

  if (categoryKey === "support") {
    return null;
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className='container'>
      <h2 className='font-bold text-2xl px-4 py-4'>Products in {categoryKey}</h2>
      <div className='container'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default CategoryPage;
