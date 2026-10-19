
import React from "react";

const ShopByCategory = () => {
  return (
    <section className="bg-white px-4 py-8 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Shop by Category
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Explore our top categories and find what you love
            </p>
          </div>

          <button className="flex items-center gap-2 text-sm font-medium text-gray-800 transition hover:text-orange-500">
            View All
            <span className="text-lg text-orange-500">→</span>
          </button>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">

          {/* Mobiles */}
          <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition hover:border-orange-400 hover:shadow-md">
            <div className="flex h-20 items-center justify-center sm:h-24">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300"
                alt="Mobiles"
                className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
              <h3 className="text-xs font-semibold text-gray-800 sm:text-sm">
                Mobiles
              </h3>
              <span className="text-orange-500">→</span>
            </div>
          </div>

          {/* Laptops */}
          <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition hover:border-orange-400 hover:shadow-md">
            <div className="flex h-20 items-center justify-center sm:h-24">
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300"
                alt="Laptops"
                className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
              <h3 className="text-xs font-semibold text-gray-800 sm:text-sm">
                Laptops
              </h3>
              <span className="text-orange-500">→</span>
            </div>
          </div>

          {/* Headphones */}
          <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition hover:border-orange-400 hover:shadow-md">
            <div className="flex h-20 items-center justify-center sm:h-24">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"
                alt="Headphones"
                className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
              <h3 className="text-xs font-semibold text-gray-800 sm:text-sm">
                Headphones
              </h3>
              <span className="text-orange-500">→</span>
            </div>
          </div>

          {/* Smartwatches */}
          <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition hover:border-orange-400 hover:shadow-md">
            <div className="flex h-20 items-center justify-center sm:h-24">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300"
                alt="Smartwatches"
                className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
              <h3 className="text-xs font-semibold text-gray-800 sm:text-sm">
                Smartwatches
              </h3>
              <span className="text-orange-500">→</span>
            </div>
          </div>

          {/* Footwear */}
          <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition hover:border-orange-400 hover:shadow-md">
            <div className="flex h-20 items-center justify-center sm:h-24">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300"
                alt="Footwear"
                className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
              <h3 className="text-xs font-semibold text-gray-800 sm:text-sm">
                Footwear
              </h3>
              <span className="text-orange-500">→</span>
            </div>
          </div>

          {/* Bags */}
          <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition hover:border-orange-400 hover:shadow-md">
            <div className="flex h-20 items-center justify-center sm:h-24">
              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300"
                alt="Bags"
                className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
              <h3 className="text-xs font-semibold text-gray-800 sm:text-sm">
                Bags
              </h3>
              <span className="text-orange-500">→</span>
            </div>
          </div>

          {/* Fashion */}
          <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition hover:border-orange-400 hover:shadow-md">
            <div className="flex h-20 items-center justify-center sm:h-24">
              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300"
                alt="Fashion"
                className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
              <h3 className="text-xs font-semibold text-gray-800 sm:text-sm">
                Fashion
              </h3>
              <span className="text-orange-500">→</span>
            </div>
          </div>

          {/* Home & Living */}
          <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition hover:border-orange-400 hover:shadow-md">
            <div className="flex h-20 items-center justify-center sm:h-24">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=300"
                alt="Home and Living"
                className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
              <h3 className="text-xs font-semibold text-gray-800 sm:text-sm">
                Home & Living
              </h3>
              <span className="text-orange-500">→</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
