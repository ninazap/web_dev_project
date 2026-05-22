import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductById } from './asyncThunks';

const productsSlice = createSlice({
  name: 'products',
  initialState: { list: [], current: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.status = 'succeeded'; state.list = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(fetchProductById.fulfilled, (state, action) => { state.current = action.payload; })
      .addCase(fetchProductById.rejected, (state, action) => { state.error = action.payload; });
  }
});

export default productsSlice.reducer;
