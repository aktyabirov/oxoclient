import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../features/categories/categoriesSlice';
import likesReducer from '../features/products/likesSlice'; 

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    likes: likesReducer, 
  },
});
