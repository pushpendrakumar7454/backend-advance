
import React from "react";
import { useState } from "react";
import apiInstance from "../../../config/apiInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const ShopByCategory = () => {
   
 const [products, setProducts] = useState([]);

  const getData = async () => {
    try {
      const res = await apiInstance.get("/products/find");

      console.log(res.data.data);
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

const navigate=useNavigate()


  let shoesProduct=products.filter((item)=>{
    return item.category==="shoes"

  })


  return (
    <section className="bg-white px-4 py-8 text-gray-800 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-orange-500">
              Explore Collection
            </p>

            <h2 className="text-xl font-bold sm:text-2xl">
              Shop by{" "}
              <span className="text-orange-500">Category</span>
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Find your everyday essentials.
            </p>
          </div>

          <button className="hidden items-center gap-1 text-sm font-semibold text-orange-500 transition hover:text-orange-600 sm:flex">
            View All <span>→</span>
          </button>
        </div>

        {/* Small Category Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">

          {/* Mobiles */}
          <div 
           onClick={() => navigate("/user-header/category/mobiles")}
          className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md">
            <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-gray-50 sm:h-32">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
                alt="Mobiles"
                className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
              <div>
                <h3 className="text-sm font-semibold">Mobiles</h3>
                <p className="mt-1 text-[11px] text-gray-500">
                  Latest smartphones
                </p>
              </div>
              <span className="text-lg text-orange-500 transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>

          {/* Laptops */}
          <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md">
            <div 
            className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-gray-50 sm:h-32">
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
                alt="Laptops"
                className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
              <div>
                <h3 className="text-sm font-semibold">Laptops</h3>
                <p className="mt-1 text-[11px] text-gray-500">
                  Work and gaming
                </p>
              </div>
              <span className="text-lg text-orange-500 transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>

          {/* Headphones */}
          <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md">
            <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-gray-50 sm:h-32">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
                alt="Headphones"
                className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
              <div>
                <h3 className="text-sm font-semibold">Headphones</h3>
                <p className="mt-1 text-[11px] text-gray-500">
                  Enjoy every beat
                </p>
              </div>
              <span className="text-lg text-orange-500 transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>

          {/* Watches */}
          <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md">
            <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-gray-50 sm:h-32">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
                alt="Watches"
                className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
              <div>
                <h3 className="text-sm font-semibold">Watches</h3>
                <p className="mt-1 text-[11px] text-gray-500">
                  Style your wrist
                </p>
              </div>
              <span className="text-lg text-orange-500 transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>

          {/* Footwear */}
          <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md">
            <div 
             onClick={() => navigate("/user-header/category/shoes")}
            className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-gray-50 sm:h-32">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
                alt="Footwear"
                className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
              <div>
                <h3 className="text-sm font-semibold">Footwear</h3>
                <p className="mt-1 text-[11px] text-gray-500">
                  Everyday comfort
                </p>
              </div>
              <span className="text-lg text-orange-500 transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>

          {/* Bags */}
          <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md">
            <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-gray-50 sm:h-32">
              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
                alt="Bags"
                className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
              <div>
                <h3 className="text-sm font-semibold">Bags</h3>
                <p className="mt-1 text-[11px] text-gray-500">
                  Carry essentials
                </p>
              </div>
              <span className="text-lg text-orange-500 transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>

          {/* Fashion */}
          <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md">
            <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-gray-50 sm:h-32">
              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
                alt="Fashion"
                className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
              <div>
                <h3 className="text-sm font-semibold">Fashion</h3>
                <p className="mt-1 text-[11px] text-gray-500">
                  Everyday style
                </p>
              </div>
              <span className="text-lg text-orange-500 transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>

          {/* Home & Living */}
          <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md">
            <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-gray-50 sm:h-32">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500"
                alt="Home and Living"
                className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
              <div>
                <h3 className="text-sm font-semibold">Home & Living</h3>
                <p className="mt-1 text-[11px] text-gray-500">
                  Upgrade your space
                </p>
              </div>
              <span className="text-lg text-orange-500 transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>

        </div>

        {/* Mobile View All */}
        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-orange-400 hover:text-orange-500 sm:hidden">
          View All Categories <span>→</span>
        </button>

      </div>
    </section>
  );
};

export default ShopByCategory;
