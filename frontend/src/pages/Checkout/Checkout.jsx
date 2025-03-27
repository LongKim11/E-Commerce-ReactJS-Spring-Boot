import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../../api/userInfoAPI";
import { setLoading } from "../../store/features/loadingSlice";

export const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const [userInfo, setUserInfo] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [selectedDeliveryDay, setSelectedDeliveryDay] = useState("");

  console.log("Cart Items: ", cartItems);

  const dispatch = useDispatch();

  const total = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    dispatch(setLoading(true));
    getUserDetails()
      .then((res) => {
        console.log("User info", res);
        setUserInfo(res);
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  }, []);

  return (
    <div className="p-10 w-[90%] mx-auto bg-gray-100 rounded-lg shadow-lg mb-32 mt-5">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Checkout
      </h2>

      <div className="flex gap-8">
        {/* LEFT SECTION */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
          {/* Customer Information */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">Customer Information</h3>
            <p>
              <strong>First Name:</strong> {userInfo.firstName || "N/A"}
            </p>
            <p>
              <strong>Last Name:</strong> {userInfo.lastName || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {userInfo.phoneNumber || "N/A"}
            </p>
          </div>

          <hr className="border-gray-300 mb-6" />
          {/* Delivery Address */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">Delivery Address</h3>
            {userInfo?.addressList?.length > 0 ? (
              <div className="space-y-3">
                {userInfo.addressList.map((address, index) => (
                  <label
                    key={index}
                    className={`flex items-start p-4 border rounded-md shadow-sm cursor-pointer transition ${
                      selectedAddress === address
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery-address"
                      checked={selectedAddress === address}
                      onChange={() => setSelectedAddress(address)}
                      className="mt-1 w-5 h-5 text-blue-600"
                    />
                    <div className="ml-3">
                      <p>
                        <strong>Street:</strong> {address.street}
                      </p>
                      <p>
                        <strong>City:</strong> {address.city}
                      </p>
                      <p>
                        <strong>State:</strong> {address.state}
                      </p>
                      <p>
                        <strong>ZIP:</strong> {address.zipCode}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No address found.</p>
            )}
          </div>

          <hr className="border-gray-300 mb-6" />

          {/* Choose Delivery Day */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">Choose Delivery Day</h3>
            <div className="flex gap-4">
              {[...Array(3)].map((_, index) => {
                const deliveryDate = new Date(Date.now() + index * 86400000);
                const formattedDate = deliveryDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                return (
                  <label
                    key={index}
                    className={`flex flex-col items-center p-4 border rounded-md shadow-sm cursor-pointer transition w-1/3 ${
                      selectedDeliveryDay === formattedDate
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery-day"
                      checked={selectedDeliveryDay === formattedDate}
                      onChange={() => setSelectedDeliveryDay(formattedDate)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <p className="text-lg font-semibold mt-2">
                      {deliveryDate.toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </p>
                    <p className="text-gray-600">
                      {deliveryDate.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </label>
                );
              })}
            </div>
          </div>

          <hr className="border-gray-300 mb-6" />

          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">Payment Method</h3>
            <div className="space-y-3">
              {[
                "Credit/Debit Card",
                "Cash On Delivery (COD)",
                "UPI/Wallet",
              ].map((method, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 bg-gray-100 p-3 rounded-md cursor-pointer hover:bg-gray-200 transition"
                >
                  <input
                    type="radio"
                    name="payment-method"
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700">{method}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all cursor-pointer">
            Pay Now
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-md h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>

          {/* Danh sách sản phẩm */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Products</h4>
            <ul className="space-y-2">
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between text-gray-700">
                  <span>
                    {item.name}{" "}
                    <span className="text-sm text-gray-500">
                      x{item.quantity}
                    </span>
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fee */}
          <h4 className="text-lg font-semibold mb-2">Charges</h4>
          <p className="flex justify-between text-gray-700">
            <span>Items Count:</span>
            <span>{cartItems.length}</span>
          </p>
          <p className="flex justify-between text-gray-700">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-gray-700">
            <span>Shipping Fee:</span>
            <span>$0.00</span>
          </p>
          <hr className="border-gray-300 my-4" />
          <p className="flex justify-between text-xl font-semibold">
            <span>Total Amount:</span>
            <span>${total.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
