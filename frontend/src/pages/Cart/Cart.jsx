import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../store/features/cartSlice";
import { DeleteIcon } from "../../components/Common/DeleteIcon";

export const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

  console.log("Cart items:", cartItems);

  return (
    <div className="px-8 mb-25">
      <p className="text-2xl font-bold text-gray-800 text-center pb-2 mb-6">
        Shopping Bag
      </p>
      <table className="table-auto w-full shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-900 text-white uppercase tracking-wide rounded-t-lg">
          <tr>
            <th className="px-6 py-3">Product Details</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Quantity</th>
            <th className="px-6 py-3">Shipping</th>
            <th className="px-6 py-3">Subtotal</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.map((item, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="px-6 py-4">
                <div className="flex items-center gap-x-3">
                  <img
                    src={item.thumbnail}
                    alt="thumbnail"
                    className="h-24 w-24 object-cover rounded-lg shadow"
                  ></img>
                  <div className="flex flex-col">
                    <p className="font-semibold">
                      Name of Product: {item.name}
                    </p>
                    <p className="text-sm text-gray-600">Brand: {item.brand}</p>
                    <p className="text-sm text-gray-600">
                      Size: {item.variant[0].size}
                    </p>
                    <p className="text-sm text-gray-600">
                      Color: {item.variant[0].color}
                    </p>
                  </div>
                </div>
              </td>
              <td className="text-center text-gray-700 font-medium">
                ${item.price}
              </td>
              <td className="text-center">
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    id="decrement-button"
                    className="bg-gray-700 text-white w-8 h-8 hover:bg-gray-800 rounded-full flex items-center justify-center"
                    onClick={() => dispatch(decreaseQuantity(item.productID))}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeWidth="2" d="M1 1h16" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    name="quantity"
                    disabled
                    value={item.quantity}
                    className="mx-2 bg-gray-100 w-12 text-center font-medium rounded-md"
                  />
                  <button
                    type="button"
                    id="increment-button"
                    className="bg-gray-700 text-white w-8 h-8 hover:bg-gray-800 rounded-full flex items-center justify-center"
                    onClick={() => dispatch(increaseQuantity(item.productID))}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 18 18">
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="text-center text-green-600 font-semibold">FREE</td>
              <td className="text-center text-gray-700 font-medium">
                ${item.subTotal}
              </td>
              <td>
                <button
                  className="flex justify-center items-center cursor-pointer w-full"
                  onClick={() => dispatch(removeFromCart(item.productID))}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
