import { createSlice } from "@reduxjs/toolkit";

const likesSlice = createSlice({
    name: 'likes',
    initialState: {
      likedProducts: JSON.parse(localStorage.getItem('likedProducts')) || [],
    },
    reducers: {
      toggleLike(state, action) {
        const productId = action.payload;
        const index = state.likedProducts.indexOf(productId);
        if (index !== -1) {
          state.likedProducts.splice(index, 1);
        } else {
          state.likedProducts.push(productId);
        }
        
        localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts));
      },
    },
  });
  
  export const { toggleLike } = likesSlice.actions;
  export default likesSlice.reducer;
  