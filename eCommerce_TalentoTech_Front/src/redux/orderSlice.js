import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderDetails: null,
    error: null,
    successMessage: '',
  },
  reducers: {
    setOrderDetails(state, action) {
      state.orderDetails = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSuccessMessage(state, action) {
      state.successMessage = action.payload;
    },
  },
});

export const { setOrderDetails, setError, setSuccessMessage } = orderSlice.actions;
export default orderSlice.reducer;