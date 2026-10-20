
import React, { useEffect, useState } from "react";
import apiInstance from "../../../config/apiInstance";
import { useNavigate } from "react-router";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    try {
      const res = await apiInstance.get("/products/find");

      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
 
  const navigate=useNavigate()
  useEffect(() => {
    getData();
  }, []);

  // Sabse mehange 8 products
  const topProducts = [...products]
    .sort((a, b) => b.price.amount - a.price.amount)
    .slice(0, 6);

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
              Discover our top-priced products.
            </p>
          </div>

          <button className="hidden items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:border-orange-500 hover:text-orange-600 sm:flex">
            Explore All <span className="text-orange-500">→</span>
          </button>
        </div>

        {/* Product Grid */}
        {topProducts.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            No products available.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {topProducts.map((item) => (
              <div
              onClick={()=>navigate(`/user-header/product-detail/${item._id}`)}
                key={item._id}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Product Image */}
                <div className="relative m-2 overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-gray-100">

                  <span className="absolute left-3 top-3 z-10 rounded-md bg-orange-500 px-2.5 py-1 text-[10px] font-bold text-white">
                    Trending
                  </span>

                  <button
                    aria-label={`Add ${item.title} to wishlist`}
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg text-gray-700 shadow-sm transition hover:bg-orange-500 hover:text-white"
                  >
                    ♡
                  </button>

                  <div className="flex h-40 items-center justify-center p-4 sm:h-52">
                    <img
                      src={
                        Array.isArray(item.images)
                          ? item.images[0]
                          : item.images
                      }
                      alt={item.title}
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold capitalize  text-gray-700">
                    {item.category}
                  </span>
                </div>

                {/* Product Details */}
                <div className="px-3 pb-4 pt-2 sm:px-4">
                  <p className="text-[10px] font-small uppercase tracking-wider text-gray-400">
                    {item.category}
                  </p>

                  <h3 className="mt-1 truncate text-sm font-semibold text-orange-600 sm:text-base">
                    {item.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold text-orange-600">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: item.price.currency || "INR",
                        maximumFractionDigits: 0,
                      }).format(item.price.amount)}
                    </span>
                  </div>

                  <button className="mt-4 cursor-pointer active:scale-95 w-full rounded-lg bg-gray-900 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-500 sm:text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}

        {/* Mobile View All */}
        <button className="mt-6 w-full rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-800 transition hover:border-orange-500 hover:text-orange-600 sm:hidden">
          Explore All Products →
        </button>

      </div>
    </section>
  );
};

export default TrendingProducts;