import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./features/loadingSlice";
import cartReducer from "./features/cartSlice";
import userReducer from "./features/userSlice";

const rootReducer = {
  loading: loadingReducer,
  cart: cartReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
