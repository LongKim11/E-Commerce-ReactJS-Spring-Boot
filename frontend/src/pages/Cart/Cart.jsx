import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../store/features/cartSlice";
import { DeleteIcon } from "../../components/Common/DeleteIcon";
import { isTokenValid } from "../../utils/jwt-helper";
import { Link } from "react-router-dom";

export const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    setTotal(
      cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  }, [cartItems]);

  console.log("Cart items:", cartItems);

  const isLoggedIn = useMemo(() => {
    return isTokenValid();
  }, []);

  return (
    <div className="px-8 mb-25">
      <p className="text-2xl font-bold text-gray-800 text-center pb-2 mb-6">
        Shopping Bag
      </p>
      {cartItems?.length > 0 ? (
        <>
          <table className="table-auto w-full shadow-md rounded-lg overflow-hidden">
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
                        <p className="text-sm text-gray-600">
                          Brand: {item.brand}
                        </p>
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
                        onClick={() =>
                          dispatch(decreaseQuantity(item.productID))
                        }
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 18 2">
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
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
                        onClick={() =>
                          dispatch(increaseQuantity(item.productID))
                        }
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="text-center text-green-600 font-semibold">
                    FREE
                  </td>
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
          <div className="flex justify-between bg-gray-100 p-6 rounded-lg shadow-md my-12">
            <div className="flex flex-col w-1/2">
              <p className="text-lg font-bold text-gray-800">Discount Coupon</p>
              <p className="text-sm text-gray-600 mb-3">
                Enter your coupon code
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center"
              >
                <input
                  type="text"
                  className="w-40 h-12 border border-gray-400 rounded-l-lg p-3 focus:outline-none bg-white"
                  name="coupon"
                  placeholder="Enter code"
                ></input>
                <button className="h-12 px-5 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700 transition cursor-pointer">
                  Apply
                </button>
              </form>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <div className="flex justify-between text-lg text-gray-700 border-b pb-3 mb-3">
                <p>Total</p>
                <p className="font-semibold">${total}</p>
              </div>
              <div className="flex justify-between text-lg text-gray-700 border-b pb-3 mb-3">
                <p>Shipping</p>
                <p className="text-green-600 font-semibold">FREE</p>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <p>Grand Total</p>
                <p>${total}</p>
              </div>
              <Link
                to={isLoggedIn ? "/checkout" : "/auth/login"}
                className="text-center w-full h-14 mt-5 bg-black text-white font-semibold rounded-lg text-lg hover:bg-gray-800 transition-all cursor-pointer flex items-center justify-center"
              >
                {isLoggedIn ? "Checkout" : "Login to checkout"}
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-80">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="w-40 h-40 mb-4"
          />
          <p className="text-lg text-gray-700 font-semibold">
            Your cart is empty
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Looks like you haven't added anything yet!
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};
