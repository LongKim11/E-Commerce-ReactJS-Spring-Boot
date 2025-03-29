import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: {} },
  reducers: {
    loadUserInfo: (state, action) => {
      state.userInfo = action.payload || {};
    },
    updateAddressList: (state, action) => {
      state.userInfo.addressList.push(action.payload);
    },
    deleteAddressList: (state, action) => {
      state.userInfo.addressList = state.userInfo.addressList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { loadUserInfo, updateAddressList, deleteAddressList } =
  userSlice.actions;
export default userSlice.reducer;
