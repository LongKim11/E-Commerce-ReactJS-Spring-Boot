import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/categorySlice";
import loadingReducer from "./features/loadingSlice";

const rootReducer = {
  category: categoryReducer,
  loading: loadingReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
