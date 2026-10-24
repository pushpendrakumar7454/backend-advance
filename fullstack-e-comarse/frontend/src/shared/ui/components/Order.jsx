import React, { useEffect, useMemo, useState } from "react";
import apiInstance from "../../../config/apiInstance";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiInstance.get("/payment/my-orders");

      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Fetch orders error:", error);

      setError(
        error.response?.data?.message || "Unable to load your orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const orderCounts = useMemo(() => {
    const counts = {
      all: orders.length,
      completed: 0,
      pending: 0,
      failed: 0,
    };

    for (const order of orders) {
      const status = String(order.status || "").toLowerCase();

      if (status === "completed") {
        counts.completed++;
      } else if (status === "pending") {
        counts.pending++;
      } else if (status === "failed") {
        counts.failed++;
      }
    }

    return counts;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return orders.filter((order) => {
      const product = order.product;
      const status = String(order.status || "").toLowerCase();

      const matchesFilter =
        activeFilter === "all" || status === activeFilter;

      const matchesSearch =
        String(order.orderId || "").toLowerCase().includes(searchText) ||
        String(order.paymentId || "").toLowerCase().includes(searchText) ||
        String(product?.title || "").toLowerCase().includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [orders, search, activeFilter]);

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    const value = String(status || "").toLowerCase();

    if (value === "completed") {
      return {
        badge: "bg-emerald-50 text-emerald-700 ring-emerald-100",
        dot: "bg-emerald-500",
        label: "Completed",
      };
    }

    if (value === "pending") {
      return {
        badge: "bg-orange-50 text-orange-700 ring-orange-100",
        dot: "bg-orange-500",
        label: "Pending",
      };
    }

    if (value === "failed") {
      return {
        badge: "bg-red-50 text-red-700 ring-red-100",
        dot: "bg-red-500",
        label: "Failed",
      };
    }

    return {
      badge: "bg-gray-100 text-gray-600 ring-gray-200",
      dot: "bg-gray-400",
      label: status || "Unknown",
    };
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-800">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Top heading */}
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-7 rounded-full bg-orange-500" />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                Your purchases
              </p>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              My Orders
            </h1>

            <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
              All your purchases, payment details and order history in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchOrders}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-orange-200 bg-white px-4 py-2.5 text-sm font-semibold text-orange-600 shadow-sm transition hover:border-orange-400 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-60 sm:self-center"
          >
            <span className={loading ? "animate-spin" : ""}>↻</span>
            Refresh orders
          </button>
        </div>

        {/* Orange hero banner */}
        <section className="relative mb-6 overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 via-white to-orange-100/80 p-5 sm:p-7 lg:p-8">
          <div className="pointer-events-none absolute -right-8 -top-16 h-52 w-52 rounded-full border-[24px] border-orange-200/30" />
          <div className="pointer-events-none absolute -bottom-16 right-24 h-36 w-36 rounded-full bg-orange-200/30 blur-2xl" />

          <div className="relative flex items-center justify-between gap-4">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-orange-700">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                ORDER DASHBOARD
              </span>

              <h2 className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl">
                Your shopping,{" "}
                <span className="text-orange-600">simplified.</span>
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Track your purchases and stay updated on every payment.
              </p>
            </div>

            <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-white bg-white/80 text-5xl shadow-sm sm:flex lg:h-28 lg:w-28">
              <span className="text-orange-500">▣</span>
            </div>
          </div>
        </section>

        {/* Summary cards */}
        <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                Total orders
              </p>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-lg text-orange-600">
                ▤
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">
              {orderCounts.all}
            </p>
            <p className="mt-1 text-xs text-slate-400">All purchases</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                Completed
              </p>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-600">
                ✓
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-emerald-600">
              {orderCounts.completed}
            </p>
            <p className="mt-1 text-xs text-slate-400">Successful payments</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                Pending
              </p>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-lg text-orange-600">
                ◷
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-orange-600">
              {orderCounts.pending}
            </p>
            <p className="mt-1 text-xs text-slate-400">Awaiting confirmation</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                Failed
              </p>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-lg text-red-600">
                !
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-red-600">
              {orderCounts.failed}
            </p>
            <p className="mt-1 text-xs text-slate-400">Unsuccessful payments</p>
          </div>
        </section>

        {/* Search and filters */}
        <section className="mb-5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-2">
              {[
                { label: "All orders", value: "all", count: orderCounts.all },
                {
                  label: "Completed",
                  value: "completed",
                  count: orderCounts.completed,
                },
                {
                  label: "Pending",
                  value: "pending",
                  count: orderCounts.pending,
                },
                {
                  label: "Failed",
                  value: "failed",
                  count: orderCounts.failed,
                },
              ].map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition sm:text-sm ${
                    activeFilter === filter.value
                      ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {filter.label}
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[11px] ${
                      activeFilter === filter.value
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative w-full xl:max-w-xs">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                ⌕
              </span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search product or order ID..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />
            </div>
          </div>
        </section>

        {/* Orders list */}
        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              Recent purchases
            </h2>
            <span className="text-xs text-slate-500 sm:text-sm">
              {filteredOrders.length}{" "}
              {filteredOrders.length === 1 ? "order" : "orders"} found
            </span>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-xl text-red-600">
                !
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-800">
                Could not load your orders
              </p>
              <p className="mt-2 text-sm text-slate-500">{error}</p>
              <button
                type="button"
                onClick={fetchOrders}
                className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Try again
              </button>
            </div>
          ) : loading ? (
            <div className="grid gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
                >
                  <div className="flex gap-4">
                    <div className="h-24 w-24 shrink-0 rounded-xl bg-slate-100 sm:h-28 sm:w-28" />
                    <div className="flex-1 space-y-3 py-2">
                      <div className="h-4 w-2/3 rounded bg-slate-100" />
                      <div className="h-3 w-1/2 rounded bg-slate-100" />
                      <div className="h-3 w-3/4 rounded bg-slate-100" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-3xl text-orange-500">
                ▤
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {orders.length === 0
                  ? "Your orders will appear here"
                  : "No matching orders"}
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                {orders.length === 0
                  ? "You haven't placed any orders yet. Once you make a purchase, you can track it here."
                  : "Try another search term or select a different payment status."}
              </p>

              {(search || activeFilter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveFilter("all");
                  }}
                  className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const product = order.product;
                const statusStyle = getStatusStyle(order.status);

                const productImage =
                  Array.isArray(product?.images) && product.images.length > 0
                    ? product.images[0]
                    : "";

                return (
                  <article
                    key={order._id}
                    className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/50"
                  >
                    <div className="p-4 sm:p-5 lg:p-6">
                      <div className="flex flex-col gap-5 sm:flex-row">
                        {/* Product image */}
                        <div className="relative flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:h-32 sm:w-32">
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={product?.title || "Product"}
                              loading="lazy"
                              className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-slate-400">
                              <span className="text-3xl">▧</span>
                              <span className="text-xs">No image</span>
                            </div>
                          )}

                          <span className="absolute left-2 top-2 rounded-md bg-orange-500 px-2 py-1 text-[10px] font-bold text-white shadow-sm">
                            ORDER
                          </span>
                        </div>

                        {/* Product information */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="break-words text-base font-bold text-slate-900 transition group-hover:text-orange-600 sm:text-lg">
                                {product?.title || "Product unavailable"}
                              </h3>

                              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                Order placed on {formatDate(order.createdAt)}
                              </p>
                            </div>

                            <span
                              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${statusStyle.badge}`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                              />
                              {statusStyle.label}
                            </span>
                          </div>

                          <div className="mt-5 grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2 xl:grid-cols-3">
                            <div>
                              <p className="text-xs text-slate-400">
                                Total amount
                              </p>
                              <p className="mt-1 text-lg font-bold text-slate-900">
                                <span className="mr-1 text-orange-500">₹</span>
                                {formatAmount(order.amount)}
                                <span className="ml-1 text-xs font-medium text-slate-400">
                                  {order.currency || "INR"}
                                </span>
                              </p>
                            </div>

                            <div className="min-w-0">
                              <p className="text-xs text-slate-400">
                                Order ID
                              </p>
                              <p className="mt-1 break-all text-xs font-medium leading-5 text-slate-700">
                                {order.orderId || "Not available"}
                              </p>
                            </div>

                            <div className="min-w-0">
                              <p className="text-xs text-slate-400">
                                Payment ID
                              </p>
                              <p className="mt-1 break-all text-xs font-medium leading-5 text-slate-700">
                                {order.paymentId || "Not available"}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                            <p className="text-xs text-slate-500">
                              Payment status:{" "}
                              <span className="font-semibold text-slate-700">
                                {statusStyle.label}
                              </span>
                            </p>

                            <button
                              type="button"
                              onClick={() => setSelectedOrder(order)}
                              className="inline-flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-2.5 text-xs font-semibold text-orange-700 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white sm:text-sm"
                            >
                              View details
                              <span aria-hidden="true">→</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Footer */}
        {!loading && !error && orders.length > 0 && (
          <div className="mt-6 flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center">
            <p>
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
            <p>
              Your order history, all in one place.
            </p>
          </div>
        )}
      </main>

      {/* Order details modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-details-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-5 shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
                  Purchase information
                </p>
                <h2
                  id="order-details-title"
                  className="mt-2 text-xl font-bold text-slate-900"
                >
                  Order details
                </h2>
              </div>

              <button
                type="button"
                aria-label="Close order details"
                onClick={() => setSelectedOrder(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-lg text-slate-600 transition hover:bg-orange-50 hover:text-orange-600"
              >
                ×
              </button>
            </div>

            <div className="mt-6 rounded-xl bg-orange-50/70 p-4">
              <p className="text-sm font-semibold text-slate-800">
                {selectedOrder.product?.title || "Product unavailable"}
              </p>
              <p className="mt-2 text-xl font-bold text-orange-600">
                {selectedOrder.currency || "INR"}{" "}
                {formatAmount(selectedOrder.amount)}
              </p>
              <div className="mt-3">
                <span
                  className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(selectedOrder.status).badge}`}
                >
                  {getStatusStyle(selectedOrder.status).label}
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {[
                ["Order ID", selectedOrder.orderId || "Not available"],
                ["Payment ID", selectedOrder.paymentId || "Not available"],
                ["Order date", formatDate(selectedOrder.createdAt)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border-b border-slate-100 pb-3 last:border-0"
                >
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="mt-1 break-all text-sm font-medium text-slate-700">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="mt-5 w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Close details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;