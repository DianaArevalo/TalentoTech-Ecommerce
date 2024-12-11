import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Asegúrate de que la ruta sea correcta
import cartReducer from './cartSlice'; // Asegúrate de que la ruta sea correcta

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;