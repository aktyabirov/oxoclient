import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import ProductCard from './ProductCard';

const PRODUCTS_PER_PAGE = 10;

const fetchProducts = async ({ pageParam = 1 }) => {
  const response = await axios.get(`http://localhost:8080/all?_page=${pageParam}&_limit=${PRODUCTS_PER_PAGE}`);
  return { data: response.data, nextPage: pageParam + 1, totalPages: Math.ceil(response.headers['x-total-count'] / PRODUCTS_PER_PAGE) };
};

const ProductList = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.totalPages) {
        return lastPage.nextPage;
      }
      return undefined; 
    },
  });




  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>An error has occurred: {error.message}</div>;

  return (
    <div className='pt-4'>
        <h2 className='font-bold text-2xl pb-4'>Siz uchun maxsus</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2'>
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.data.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </React.Fragment>
      ))}
      </div>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : ''}
      </button>
    </div>

  );
};

export default ProductList;
