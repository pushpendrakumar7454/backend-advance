import React, { useEffect, useState } from "react";
import apiInstance from "../../../config/apiInstance";


const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiInstance.get("/payment/my-orders");

        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Fetch orders error:", error);

        setError(
          error.response?.data?.message || "Unable to load orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7">
          <p className="text-sm font-medium text-orange-600">
            YOUR PURCHASES
          </p>

          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            My Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Check your purchased products and payment status.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-xl border border-gray-200 px-5 py-14 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              No orders yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Your purchased products will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const product = order.product;

              return (
                <div
                  key={order._id}
                  className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gray-50 sm:w-32 sm:shrink-0">
                    {product?.image ? (
                      <img
                        src={product.image}
                        alt={product.title || "Product"}
                        className="h-full w-full rounded-lg object-contain p-2"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">
                        No image
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-gray-900">
                      {product?.title || "Product unavailable"}
                    </h2>

                    <p className="mt-2 text-sm text-gray-600">
                      Amount: {order.currency}{" "}
                      {Number(order.amount).toFixed(2)}
                    </p>

                    <p className="mt-1 break-all text-xs text-gray-500">
                      Order ID: {order.orderId}
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      Ordered on:{" "}
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "Date unavailable"}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        order.status === "completed"
                          ? "bg-green-50 text-green-700"
                          : order.status === "pending"
                          ? "bg-orange-50 text-orange-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;