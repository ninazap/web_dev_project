import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createOrder = createAsyncThunk('orders/create', async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch('http://localhost:8001/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Ошибка оформления');
    return await res.json();
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { status: 'idle', orderId: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => { state.status = 'loading'; })
      .addCase(createOrder.fulfilled, (state, action) => { state.status = 'succeeded'; state.orderId = action.payload.id; })
      .addCase(createOrder.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; });
  }
});

export default ordersSlice.reducer;
