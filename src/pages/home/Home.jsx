import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../features/categories/categoriesSlice';
import CategoryCard from '../../components/CategoryCard';
import ProductList from '../../components/ProductList';

const Home = () => {
  const dispatch = useDispatch();
  const { items: categories, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className='bg-secondary'>

   
    <div className='bg-white'>
    <div className="container mx-auto px-4 pt-8 pb-14 ">
        <h2 className='font-bold text-2xl pb-8 '>Kategoriyalar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-9">
        {categories.map((category) => (
         <CategoryCard key={category.datakey} {...category}/>
        ))}
      </div>
    </div>
    </div>
    <div className='container'>
      <ProductList/>
    </div>
    </div>
  );
};

export default Home;
