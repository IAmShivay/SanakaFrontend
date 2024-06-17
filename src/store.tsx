import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/app/auth/authSlice";
import productReducer from './app/products/productSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
