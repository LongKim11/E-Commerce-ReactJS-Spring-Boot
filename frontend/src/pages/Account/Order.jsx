import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/loadingSlice";
import { getOrdersByUser } from "../../api/orderAPI";

export const Order = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    dispatch(setLoading(true));
    getOrdersByUser()
      .then((res) => {
        console.log("Orders", res);
        setOrders(res);
      })
      .catch((err) => console.error(err))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-300 rounded-xl shadow-sm bg-white p-6 transition-all cursor-pointer hover:shadow-lg mb-6"
            onClick={() => toggleOrderDetails(order.id)}
          >
            {/* Order Summary */}

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Order ID: {order.id}
            </h2>

            <div className="flex justify-between">
              <div>
                <p className="text-gray-600 mb-2">
                  Date: {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-2">
                  Status:
                  <span className="font-bold ml-1 text-orange-500">
                    {order.orderStatus}
                  </span>
                </p>
                <p className="text-gray-600">
                  Total:
                  <span className="font-bold text-green-600">
                    {" "}
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800 mb-3">
                  {order.payment.paymentStatus !== "COMPLETED"
                    ? `❌ ${order.payment.paymentStatus}`
                    : `✔️ ${order.payment.paymentStatus}`}
                </p>
                <p className="text-sm text-gray-600">
                  Payment Method: {order.payment.paymentMethod || "Unknown"}
                </p>
              </div>
            </div>

            {/* Expandable Section */}
            <div className="mt-4 flex justify-between items-center border-t pt-4">
              <p className="text-blue-500 font-medium">View Details</p>
              <button className="text-gray-600 text-lg">
                {expandedOrder === order.id ? "▲" : "▼"}
              </button>
            </div>

            {expandedOrder === order.id && (
              <div className="mt-4 border-t pt-4 space-y-4">
                {/* Payment Details */}
                <h3 className="text-md font-semibold text-gray-800">
                  Payment Details
                </h3>
                <p className="text-gray-600">Payment ID: {order.payment.id}</p>
                <p className="text-gray-600">
                  Payment Date:{" "}
                  {new Date(order.payment.paymentDate).toLocaleString()}
                </p>
                <p className="text-green-600">
                  Amount: ${order.payment.amount.toFixed(2)}
                </p>

                {/* Product List */}
                <h3 className="text-md font-semibold text-gray-800">
                  Order Items
                </h3>
                <ul className="space-y-4">
                  {order.orderItemList.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center">
                        <img
                          src={
                            item.thumbnail || "https://via.placeholder.com/64"
                          }
                          alt="Product Thumbnail"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      {/* Product Details */}
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">
                          Product ID: {item.productVariantID}
                        </p>
                        <p className="text-gray-600">
                          Color: {item.color || "N/A"}
                        </p>
                        <p className="text-gray-600">
                          Size: {item.size || "N/A"}
                        </p>
                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      {/* Price */}
                      <div className="text-right">
                        <p className="text-blue-600 font-bold">
                          ${item.subTotal.toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
