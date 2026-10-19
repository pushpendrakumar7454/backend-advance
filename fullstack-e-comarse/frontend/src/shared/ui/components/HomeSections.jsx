
import React from "react";

const HomeSections = () => {
  return (
    <div className="bg-white">

      {/* SHOP BY CATEGORY */}
      <section className="px-4 py-8 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Shop by Category
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Explore our top categories and find what you love
              </p>
            </div>

            <button className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-orange-500">
              View All <span className="text-orange-500">→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">

            {/* Mobiles */}
            <div className="group cursor-pointer rounded-xl border border-gray-200 p-3 transition hover:border-orange-400 hover:shadow-md">
              <div className="flex h-20 items-center justify-center sm:h-24">
                <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300" alt="Mobiles" className="h-full w-full object-contain transition group-hover:scale-105" />
              </div>
              <div className="mt-3 flex items-center justify-between gap-1">
                <h3 className="text-xs font-semibold text-gray-800 sm:text-sm">Mobiles</h3>
                <span className="text-orange-500">→</span>
              </div>
            </div>

            {/* Laptops */}
            <div className="group cursor-pointer rounded-xl border border-gray-200 p-3 transition hover:border-orange-400 hover:shadow-md">
              <div className="flex h-20 items-center justify-center sm:h-24">
                <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300" alt="Laptops" className="h-full w-full object-contain transition group-hover:scale-105" />
              </div>
              <div className="mt-3 flex items-center justify-between gap-1">
                <h3 className="text-xs font-semibold text-gray-800 sm:text-sm">Laptops</h3>
                <span className="text-orange-500">→</span>
              </div>
            </div>

            {/* Headphones */}
            <div className="group cursor-pointer rounded-xl border border-gray-200 p-3 transition hover:border-orange-400 hover:shadow-md">
              <div className="flex h-20 items-center justify-center sm:h-24">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" alt="Headphones" className="h-full w-full object-contain transition group-hover:scale-105" />
              </div>
              <div className="mt-3 flex items-center justify-between gap-1">
                <h3 className="text-xs font-semibold text-gray-800 sm:text-sm">Headphones</h3>
                <span className="text-orange-500">→</span>
              </div>
            </div>

            {/* Smartwatches */}
            <div className="group cursor-pointer rounded-xl border border-gray-200 p-3 transition hover:border-orange-400 hover:shadow-md">
              <div className="flex h-20 items-center justify-center sm:h-24">
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" alt="Smartwatches" className="h-full w-full object-contain transition group-hover:scale-105" />
              </div>
              <div className="mt-3 flex items-center justify-between gap-1">
                <h3 className="text-xs font-semibold text-gray-800 sm:text-sm">Smartwatches</h3>
                <span className="text-orange-500">→</span>
              </div>
            </div>

            {/* Footwear */}
            <div className="group cursor-pointer rounded-xl border border-gray-200 p-3 transition hover:border-orange-400 hover:shadow-md">
              <div className="flex h-20 items-center justify-center sm:h-24">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300" alt="Footwear" className="h-full w-full object-contain transition group-hover:scale-105" />
              </div>
              <div className="mt-3 flex items-center justify-between gap-1">
                <h3 className="text-xs font-semibold text-gray-800 sm:text-sm">Footwear</h3>
                <span className="text-orange-500">→</span>
              </div>
            </div>

            {/* Bags */}
            <div className="group cursor-pointer rounded-xl border border-gray-200 p-3 transition hover:border-orange-400 hover:shadow-md">
              <div className="flex h-20 items-center justify-center sm:h-24">
                <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300" alt="Bags" className="h-full w-full object-contain transition group-hover:scale-105" />
              </div>
              <div className="mt-3 flex items-center justify-between gap-1">
                <h3 className="text-xs font-semibold text-gray-800 sm:text-sm">Bags</h3>
                <span className="text-orange-500">→</span>
              </div>
            </div>

            {/* Fashion */}
            <div className="group cursor-pointer rounded-xl border border-gray-200 p-3 transition hover:border-orange-400 hover:shadow-md">
              <div className="flex h-20 items-center justify-center sm:h-24">
                <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300" alt="Fashion" className="h-full w-full object-contain transition group-hover:scale-105" />
              </div>
              <div className="mt-3 flex items-center justify-between gap-1">
                <h3 className="text-xs font-semibold text-gray-800 sm:text-sm">Fashion</h3>
                <span className="text-orange-500">→</span>
              </div>
            </div>

            {/* Home & Living */}
            <div className="group cursor-pointer rounded-xl border border-gray-200 p-3 transition hover:border-orange-400 hover:shadow-md">
              <div className="flex h-20 items-center justify-center sm:h-24">
                <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=300" alt="Home and Living" className="h-full w-full object-contain transition group-hover:scale-105" />
              </div>
              <div className="mt-3 flex items-center justify-between gap-1">
                <h3 className="text-xs font-semibold text-gray-800 sm:text-sm">Home & Living</h3>
                <span className="text-orange-500">→</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="bg-gray-50 px-4 py-8 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Trending Products
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Top picks loved by our customers
              </p>
            </div>

            <button className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-orange-500">
              View All Products <span className="text-orange-500">→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

            {/* Product 1 */}
            <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
              <div className="relative flex h-36 items-center justify-center bg-gray-50 p-3 sm:h-44">
                <span className="absolute left-2 top-2 rounded bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">-25%</span>
                <button aria-label="Add iPhone to wishlist" className="absolute right-2 top-2 text-lg text-gray-500 hover:text-orange-500">♡</button>
                <img src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400" alt="iPhone 15 Pro" className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <h3 className="truncate text-sm font-semibold text-gray-800">iPhone 15 Pro</h3>
                <p className="mt-1 text-xs text-gray-500"><span className="text-amber-500">★</span> 4.8 (120)</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-orange-600">₹89,999</span>
                  <span className="text-xs text-gray-400 line-through">₹1,10,000</span>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
              <div className="relative flex h-36 items-center justify-center bg-gray-50 p-3 sm:h-44">
                <span className="absolute left-2 top-2 rounded bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">-20%</span>
                <button aria-label="Add laptop to wishlist" className="absolute right-2 top-2 text-lg text-gray-500 hover:text-orange-500">♡</button>
                <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" alt="MacBook Air M2" className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <h3 className="truncate text-sm font-semibold text-gray-800">MacBook Air M2</h3>
                <p className="mt-1 text-xs text-gray-500"><span className="text-amber-500">★</span> 4.7 (98)</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-orange-600">₹79,990</span>
                  <span className="text-xs text-gray-400 line-through">₹99,000</span>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
              <div className="relative flex h-36 items-center justify-center bg-gray-50 p-3 sm:h-44">
                <span className="absolute left-2 top-2 rounded bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">-30%</span>
                <button aria-label="Add headphones to wishlist" className="absolute right-2 top-2 text-lg text-gray-500 hover:text-orange-500">♡</button>
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" alt="Sony Headphones" className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <h3 className="truncate text-sm font-semibold text-gray-800">Sony Headphones</h3>
                <p className="mt-1 text-xs text-gray-500"><span className="text-amber-500">★</span> 4.6 (76)</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-orange-600">₹6,999</span>
                  <span className="text-xs text-gray-400 line-through">₹9,999</span>
                </div>
              </div>
            </div>

            {/* Product 4 */}
            <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
              <div className="relative flex h-36 items-center justify-center bg-gray-50 p-3 sm:h-44">
                <span className="absolute left-2 top-2 rounded bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">-15%</span>
                <button aria-label="Add smartwatch to wishlist" className="absolute right-2 top-2 text-lg text-gray-500 hover:text-orange-500">♡</button>
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" alt="Fire-Boltt Smartwatch" className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <h3 className="truncate text-sm font-semibold text-gray-800">Fire-Boltt Smartwatch</h3>
                <p className="mt-1 text-xs text-gray-500"><span className="text-amber-500">★</span> 4.5 (64)</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-orange-600">₹3,999</span>
                  <span className="text-xs text-gray-400 line-through">₹4,699</span>
                </div>
              </div>
            </div>

            {/* Product 5 */}
            <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
              <div className="relative flex h-36 items-center justify-center bg-gray-50 p-3 sm:h-44">
                <span className="absolute left-2 top-2 rounded bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">-22%</span>
                <button aria-label="Add shoes to wishlist" className="absolute right-2 top-2 text-lg text-gray-500 hover:text-orange-500">♡</button>
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" alt="Nike Shoes" className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <h3 className="truncate text-sm font-semibold text-gray-800">Nike Shoes</h3>
                <p className="mt-1 text-xs text-gray-500"><span className="text-amber-500">★</span> 4.7 (88)</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-orange-600">₹4,499</span>
                  <span className="text-xs text-gray-400 line-through">₹5,799</span>
                </div>
              </div>
            </div>

            {/* Product 6 */}
            <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
              <div className="relative flex h-36 items-center justify-center bg-gray-50 p-3 sm:h-44">
                <span className="absolute left-2 top-2 rounded bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">-18%</span>
                <button aria-label="Add bag to wishlist" className="absolute right-2 top-2 text-lg text-gray-500 hover:text-orange-500">♡</button>
                <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" alt="Wildcraft Bag" className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <h3 className="truncate text-sm font-semibold text-gray-800">Wildcraft Bag</h3>
                <p className="mt-1 text-xs text-gray-500"><span className="text-amber-500">★</span> 4.4 (52)</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-orange-600">₹1,999</span>
                  <span className="text-xs text-gray-400 line-through">₹2,449</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default HomeSections;
