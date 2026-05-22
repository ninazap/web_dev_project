import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('http://localhost:8000/api/products');
    if (!res.ok) throw new Error('Ошибка загрузки товаров');
    return await res.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`http://localhost:8000/api/products/${id}`);
    if (!res.ok) throw new Error('Товар не найден');
    return await res.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
