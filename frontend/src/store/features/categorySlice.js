import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: { allCategory: [] },
  reducers: {
    setCategories: (state, action) => {
      state.allCategory = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
