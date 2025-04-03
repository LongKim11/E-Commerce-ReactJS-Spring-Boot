import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart-item",
  initialState: { cart: JSON.parse(localStorage.getItem("cart")) || [] },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find(
        (product) =>
          product.productID === action.payload.productID &&
          product.variant[0].id === action.payload.variant[0].id
      );

      if (item) {
        item.quantity += 1;
        item.subTotal += item.price;
      } else {
        state.cart.push(action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) =>
          item.productID !== action.payload.productID ||
          item.variant[0].id !== action.payload.variant.id
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    increaseQuantity: (state, action) => {
      const item = state.cart.find(
        (product) =>
          product.productID === action.payload.productID &&
          product.variant[0].id === action.payload.variant.id
      );
      if (item) {
        item.quantity += 1;
        item.subTotal += item.price;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.cart.find(
        (product) =>
          product.productID === action.payload.productID &&
          product.variant[0].id === action.payload.variant.id
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.subTotal -= item.price;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    deleteAllCartItems: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  deleteAllCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
