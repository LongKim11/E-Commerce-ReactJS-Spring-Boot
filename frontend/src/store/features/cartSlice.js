import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart-item",
  initialState: { cart: JSON.parse(localStorage.getItem("cart")) || [] },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.productID !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    increaseQuantity: (state, action) => {
      const item = state.cart.find(
        (product) => product.productID === action.payload
      );
      if (item) {
        item.quantity += 1;
        item.subTotal += item.price;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.cart.find(
        (product) => product.productID === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.subTotal -= item.price;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
