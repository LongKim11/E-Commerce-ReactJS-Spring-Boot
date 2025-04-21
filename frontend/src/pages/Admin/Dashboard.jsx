import React, { useState, useEffect, use } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/loadingSlice";
import { getAllOrder } from "../../api/orderAPI";
import { getAllProduct } from "../../api/productAPI";

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: null,
    shippedOrders: null,
    cancelledOrders: null,
    pendingOrders: null,
    inProgressOrders: null,
    deliveredOrders: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    getAllProduct()
      .then((products) => {
        getAllOrder().then((orders) => {
          const shipped = orders.filter(
            (o) => o.orderStatus === "SHIPPED"
          ).length;
          const cancelled = orders.filter(
            (o) => o.orderStatus === "CANCELLED"
          ).length;
          const pending = orders.filter(
            (o) => o.orderStatus === "PENDING"
          ).length;
          const inProgress = orders.filter(
            (o) => o.orderStatus === "IN_PROGRESS"
          ).length;
          const delivered = orders.filter(
            (o) => o.orderStatus === "DELIVERED"
          ).length;

          setDashboardData({
            totalProducts: products.length,
            shippedOrders: shipped,
            cancelledOrders: cancelled,
            pendingOrders: pending,
            inProgressOrders: inProgress,
            deliveredOrders: delivered,
          });
        });
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
      })
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Products Box */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Total Products
            </h3>
            <p className="text-2xl font-bold text-blue-500">
              {dashboardData.totalProducts}
            </p>
          </div>
          <div className="text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shirt-icon lucide-shirt"
            >
              <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
            </svg>
          </div>
        </div>

        {/* Shipped Orders Box */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Shipped Orders
            </h3>
            <p className="text-2xl font-bold text-green-500">
              {dashboardData.shippedOrders}
            </p>
          </div>
          <div className="text-green-500">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Cancelled Orders Box */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Cancelled Orders
            </h3>
            <p className="text-2xl font-bold text-red-500">
              {dashboardData.cancelledOrders}
            </p>
          </div>
          <div className="text-red-500">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        {/* Pending Orders Box */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Pending Orders
            </h3>
            <p className="text-2xl font-bold text-yellow-500">
              {dashboardData.pendingOrders}
            </p>
          </div>
          <div className="text-yellow-500">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* In Progress Orders Box */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              In Progress Orders
            </h3>
            <p className="text-2xl font-bold text-orange-500">
              {dashboardData.inProgressOrders}
            </p>
          </div>
          <div className="text-orange-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-repeat-icon lucide-repeat"
            >
              <path d="m17 2 4 4-4 4" />
              <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
              <path d="m7 22-4-4 4-4" />
              <path d="M21 13v1a4 4 0 0 1-4 4H3" />
            </svg>
          </div>
        </div>

        {/* Delivered Orders Box */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Delivered Orders
            </h3>
            <p className="text-2xl font-bold text-indigo-500">
              {dashboardData.deliveredOrders}
            </p>
          </div>
          <div className="text-indigo-500">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
