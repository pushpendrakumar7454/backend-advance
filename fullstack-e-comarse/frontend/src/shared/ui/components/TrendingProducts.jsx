
import React from "react";

const TrendingProducts = () => {
  return (
    <section className="bg-white px-4 py-10 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[2px] text-orange-500">
              Handpicked for you
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Trending Products
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              The products everyone is talking about.
            </p>
          </div>

          <button className="hidden items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:border-orange-500 hover:text-orange-600 sm:flex">
            Explore All <span className="text-orange-500">→</span>
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

          {/* Product 1 */}
          <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative m-2 overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-gray-100">
              <span className="absolute left-3 top-3 z-10 rounded-md bg-orange-500 px-2.5 py-1 text-[10px] font-bold text-white">
                -25% OFF
              </span>

              <button
                aria-label="Add iPhone to wishlist"
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg text-gray-700 shadow-sm transition hover:bg-orange-500 hover:text-white"
              >
                ♡
              </button>

              <div className="flex h-40 items-center justify-center p-4 sm:h-52">
                <img
                  src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500"
                  alt="iPhone 15 Pro"
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
                />
              </div>

              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-gray-700">
                Bestseller
              </span>
            </div>

            <div className="px-3 pb-4 pt-2 sm:px-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Smartphones
              </p>
              <h3 className="mt-1 truncate text-sm font-bold text-gray-900 sm:text-base">
                iPhone 15 Pro
              </h3>

              <div className="mt-1 flex items-center gap-1 text-xs">
                <span className="text-amber-500">★</span>
                <span className="font-semibold text-gray-700">4.8</span>
                <span className="text-gray-400">(120)</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-base font-extrabold text-gray-900">
                  ₹89,999
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹1,10,000
                </span>
              </div>

              <button className="mt-4 w-full rounded-lg bg-gray-900 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-500 sm:text-sm">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Product 2 */}
          <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative m-2 overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-gray-100">
              <span className="absolute left-3 top-3 z-10 rounded-md bg-orange-500 px-2.5 py-1 text-[10px] font-bold text-white">
                -20% OFF
              </span>

              <button
                aria-label="Add laptop to wishlist"
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg text-gray-700 shadow-sm transition hover:bg-orange-500 hover:text-white"
              >
                ♡
              </button>

              <div className="flex h-40 items-center justify-center p-4 sm:h-52">
                <img
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
                  alt="MacBook Air"
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
                />
              </div>

              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-gray-700">
                Popular
              </span>
            </div>

            <div className="px-3 pb-4 pt-2 sm:px-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Electronics
              </p>
              <h3 className="mt-1 truncate text-sm font-bold text-gray-900 sm:text-base">
                MacBook Air M2
              </h3>

              <div className="mt-1 flex items-center gap-1 text-xs">
                <span className="text-amber-500">★</span>
                <span className="font-semibold text-gray-700">4.7</span>
                <span className="text-gray-400">(98)</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-base font-extrabold text-gray-900">
                  ₹79,990
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹99,000
                </span>
              </div>

              <button className="mt-4 w-full rounded-lg bg-gray-900 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-500 sm:text-sm">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Product 3 */}
          <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative m-2 overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-gray-100">
              <span className="absolute left-3 top-3 z-10 rounded-md bg-orange-500 px-2.5 py-1 text-[10px] font-bold text-white">
                -30% OFF
              </span>

              <button
                aria-label="Add headphones to wishlist"
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg text-gray-700 shadow-sm transition hover:bg-orange-500 hover:text-white"
              >
                ♡
              </button>

              <div className="flex h-40 items-center justify-center p-4 sm:h-52">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
                  alt="Wireless Headphones"
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
                />
              </div>

              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-gray-700">
                Top Rated
              </span>
            </div>

            <div className="px-3 pb-4 pt-2 sm:px-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Audio
              </p>
              <h3 className="mt-1 truncate text-sm font-bold text-gray-900 sm:text-base">
                Wireless Headphones
              </h3>

              <div className="mt-1 flex items-center gap-1 text-xs">
                <span className="text-amber-500">★</span>
                <span className="font-semibold text-gray-700">4.6</span>
                <span className="text-gray-400">(76)</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-base font-extrabold text-gray-900">
                  ₹6,999
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹9,999
                </span>
              </div>

              <button className="mt-4 w-full rounded-lg bg-gray-900 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-500 sm:text-sm">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Product 4 */}
          <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative m-2 overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-gray-100">
              <span className="absolute left-3 top-3 z-10 rounded-md bg-orange-500 px-2.5 py-1 text-[10px] font-bold text-white">
                -15% OFF
              </span>

              <button
                aria-label="Add smartwatch to wishlist"
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg text-gray-700 shadow-sm transition hover:bg-orange-500 hover:text-white"
              >
                ♡
              </button>

              <div className="flex h-40 items-center justify-center p-4 sm:h-52">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
                  alt="Smart Watch"
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
                />
              </div>

              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-gray-700">
                New Arrival
              </span>
            </div>

            <div className="px-3 pb-4 pt-2 sm:px-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Wearables
              </p>
              <h3 className="mt-1 truncate text-sm font-bold text-gray-900 sm:text-base">
                Premium Smartwatch
              </h3>

              <div className="mt-1 flex items-center gap-1 text-xs">
                <span className="text-amber-500">★</span>
                <span className="font-semibold text-gray-700">4.5</span>
                <span className="text-gray-400">(64)</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-base font-extrabold text-gray-900">
                  ₹3,999
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹4,699
                </span>
              </div>

              <button className="mt-4 w-full rounded-lg bg-gray-900 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-500 sm:text-sm">
                Add to Cart
              </button>
            </div>
          </div>

        </div>

        {/* Mobile View All */}
        <button className="mt-6 w-full rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-800 transition hover:border-orange-500 hover:text-orange-600 sm:hidden">
          Explore All Products →
        </button>

      </div>
    </section>
  );
};

export default TrendingProducts;
