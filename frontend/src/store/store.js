import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./features/loadingSlice";
import cartReducer from "./features/cartSlice";
const rootReducer = {
  loading: loadingReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
