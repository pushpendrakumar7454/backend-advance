import React, { useEffect, useState } from "react";

import ProductHero from "../components/ProductHero";
import ProductCard from "../components/ProductCard";

import apiInstance from "../../../config/apiInstance";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    try {
      const res = await apiInstance.get("/products/find");

      console.log(res.data.data);
      setProducts(res.data.data)

      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc]">

      {/* ================= BACKGROUND ================= */}

      {/* Top Orange Glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-orange-400/10 blur-[120px]" />

      {/* Right Glow */}
      <div className="pointer-events-none absolute right-[-180px] top-[500px] h-[500px] w-[500px] rounded-full bg-orange-300/10 blur-[140px]" />

      {/* Bottom Dark Glow */}
      <div className="pointer-events-none absolute bottom-[-200px] left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-slate-900/5 blur-[120px]" />

      {/* Premium Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#101827 1px, transparent 1px), linear-gradient(90deg, #101827 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ================= PAGE CONTENT ================= */}

      <div className="relative z-10">

        {/* ================= HERO SECTION ================= */}

        <section className="px-3 py-4 sm:px-5 lg:px-8 lg:py-6">

          <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/80 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">

            <ProductHero />

          </div>

        </section>

        {/* ================= FEATURED PRODUCTS ================= */}

        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

          <div className="mx-auto max-w-7xl">

            {/* Section Heading */}

            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

              <div>

                <div className="mb-3 flex items-center gap-2">

                  <span className="h-1 w-8 rounded-full bg-orange-500"></span>

                  <p className="text-xs font-bold tracking-[0.22em] text-orange-500">
                    NEXORA COLLECTION
                  </p>

                </div>

                <h1 className="text-2xl font-black tracking-tight text-[#101827] sm:text-3xl lg:text-4xl">
                  Featured Products
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                  Discover premium products, exclusive deals and everyday
                  essentials selected specially for you.
                </p>

              </div>

              {/* View All */}

              <button className="group flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#101827] shadow-sm transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/20">

                View All Products

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </button>

            </div>

            {/* ================= PRODUCT CARDS ================= */}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {products?.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

            </div>

          </div>

        </section>

        {/* ================= BOTTOM CTA ================= */}

        <section className="px-4 pb-14 sm:px-6 lg:px-8">

          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#101827] px-6 py-12 text-center shadow-[0_25px_70px_rgba(15,23,42,0.18)] sm:px-10 lg:py-14">

            {/* CTA Glow */}

            <div className="pointer-events-none absolute left-1/2 top-0 h-52 w-72 -translate-x-1/2 rounded-full bg-orange-500/20 blur-[90px]" />

            <div className="relative z-10">

              <p className="text-xs font-bold tracking-[0.25em] text-orange-400">
                SHOP SMART • SHOP PREMIUM
              </p>

              <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                Upgrade Your Everyday Shopping
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Explore premium products, amazing prices and a shopping
                experience designed for you.
              </p>

              <button className="mt-7 rounded-xl bg-orange-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600 hover:shadow-orange-500/30">
                Explore Collection
              </button>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
};

export default HomePage;