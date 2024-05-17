// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import usersReducer from './slices/usersSlice';

export const history = createBrowserHistory();

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
