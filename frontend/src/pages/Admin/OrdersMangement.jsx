import React, { useEffect, useState } from "react";
import { getAllOrder } from "../../api/orderAPI";
import { setLoading } from "../../store/features/loadingSlice";
import { useDispatch } from "react-redux";
import { updateOrderDeliveryStatus } from "../../api/orderAPI";

export const OrdersMangement = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedOrderForUpdate, setSelectedOrderForUpdate] = useState(null);
  const [newStatus, setNewStatus] = useState({ status: "" });

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleOpenUpdateStatusModal = (order) => {
    setSelectedOrderForUpdate(order);
    setNewStatus({ status: order.orderStatus });
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateStatusModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedOrderForUpdate(null);
    setNewStatus({ status: "" });
  };

  const handleUpdateOrderStatus = () => {
    dispatch(setLoading(true));
    console.log(selectedOrderForUpdate.id, newStatus);
    updateOrderDeliveryStatus(selectedOrderForUpdate.id, newStatus)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(setLoading(false)));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getAllOrder()
      .then((res) => {
        console.log("All Orders:", res);
        const sortedOrders = [...res].sort(
          (a, b) => new Date(a.orderDate) - new Date(b.orderDate)
        );
        setOrders(sortedOrders);
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  return (
    <div>
      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-300 rounded-xl shadow-sm bg-white p-6 transition-all cursor-pointer hover:shadow-lg mb-6"
          >
            {/* Order Summary */}

            <div className="flex justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Order ID: {order.id}
              </h2>
              <button
                className="bg-black px-3 py-1 rounded-md text-white cursor-pointer hover:bg-slate-700"
                onClick={() => handleOpenUpdateStatusModal(order)}
              >
                Update status
              </button>
            </div>

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
            <div
              className="mt-4 flex justify-between items-center border-t pt-4"
              onClick={() => toggleOrderDetails(order.id)}
            >
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

      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-500/30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Update Delivery Status
            </h2>
            <p className="text-gray-600 mb-6">
              Please select the new status for this order.
            </p>

            <label
              htmlFor="orderStatus"
              className="block text-gray-700 font-medium mb-2"
            >
              Order Status
            </label>
            <select
              id="orderStatus"
              value={newStatus.status}
              onChange={(e) => setNewStatus({ status: e.target.value })}
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white bg-no-repeat pl-4 pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundPosition: "right 0.5rem center",
                backgroundSize: "1.5em 1.5em",
              }}
            >
              <option value="PENDING">PENDING</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                onClick={handleCloseUpdateStatusModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                onClick={handleUpdateOrderStatus}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
