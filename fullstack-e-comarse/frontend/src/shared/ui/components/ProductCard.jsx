import React, { useState } from "react";
import {
  FiHeart,
  FiStar,
  FiArrowUpRight,
} from "react-icons/fi";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="group w-full min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl sm:max-w-[340px] sm:rounded-[24px]">

      {/* IMAGE SECTION */}
      <div className="relative h-[135px] overflow-hidden bg-[#f4f6f8] sm:h-[300px]">

        {/* Orange Glow */}
        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/10 blur-3xl transition-all duration-500 group-hover:bg-orange-400/20 sm:h-48 sm:w-48" />

        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#111827 1px, transparent 1px), linear-gradient(90deg, #111827 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Discount Badge */}
        <div className="absolute left-1.5 top-1.5 z-20 sm:left-4 sm:top-4">
          <span className="rounded-full bg-orange-500 px-1.5 py-1 text-[8px] font-bold tracking-wide text-white shadow-lg shadow-orange-500/20 sm:px-3 sm:py-1.5 sm:text-[10px]">
            {product.discount || "SPECIAL"}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => setLiked(!liked)}
          className={`absolute right-1.5 top-1.5 z-20 flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 sm:right-4 sm:top-4 sm:h-10 sm:w-10 ${
            liked
              ? "border-orange-200 bg-orange-500 text-white"
              : "border-white bg-white/80 text-slate-700 hover:border-orange-200 hover:text-orange-500"
          }`}
        >
          <FiHeart
            size={14}
            className={liked ? "fill-white sm:[&]:h-[18px] sm:[&]:w-[18px]" : "sm:h-[18px] sm:w-[18px]"}
          />
        </button>

        {/* Product Image */}
        <div
          onClick={() =>
            navigate(`/user-header/product-detail/${product._id}`)
          }
          className="absolute inset-0 flex cursor-pointer items-center justify-center"
        >
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="h-[100px] w-[110px] object-contain drop-shadow-[0_12px_12px_rgba(0,0,0,0.18)] transition-all duration-700 ease-out group-hover:scale-110 sm:h-[220px] sm:w-[270px] sm:drop-shadow-[0_25px_25px_rgba(0,0,0,0.18)] sm:group-hover:-rotate-2"
          />
        </div>

        {/* Premium Badge */}
        <div className="absolute bottom-1.5 left-1.5 rounded-full border border-white/70 bg-white/80 px-1.5 py-1 backdrop-blur-md sm:bottom-4 sm:left-4 sm:px-3 sm:py-1.5">
          <p className="text-[7px] font-bold tracking-wide text-slate-500 sm:text-[9px] sm:tracking-[0.15em]">
            PREMIUM
          </p>
        </div>

        {/* View Button */}
        <button
          onClick={() =>
            navigate(`/user-header/product-detail/${product._id}`)
          }
          className="absolute bottom-1.5 right-1.5 flex h-6 items-center gap-1 rounded-full bg-[#101827] px-2 text-[8px] font-semibold text-white shadow-lg transition-all duration-300 sm:bottom-4 sm:right-4 sm:h-9 sm:gap-1.5 sm:px-3 sm:text-[10px]"
        >
          View
          <FiArrowUpRight size={11} />
        </button>
      </div>

      {/* PRODUCT CONTENT */}
      <div className="p-2 sm:p-5">

        {/* Brand */}
        <p className="truncate text-[8px] font-bold tracking-wider text-orange-500 sm:text-[10px] sm:tracking-[0.22em]">
          {product.brand || "NEXORA"}
        </p>

        {/* Product Title + Rating */}
        <div className="mt-1 flex items-start justify-between gap-1 sm:gap-3">
          <h2 className="line-clamp-2 min-w-0 text-[11px] font-bold leading-tight text-slate-900 sm:line-clamp-1 sm:text-lg">
            {product.title}
          </h2>

          <div className="flex shrink-0 items-center gap-0.5 rounded-md bg-orange-50 px-1 py-0.5 sm:gap-1 sm:px-2 sm:py-1">
            <FiStar
              size={10}
              className="fill-orange-500 text-orange-500 sm:h-3 sm:w-3"
            />
            <span className="text-[8px] font-bold text-orange-600 sm:text-[10px]">
              {product.rating || "4.8"}
            </span>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-1.5 flex items-center gap-1 sm:mt-3 sm:gap-2">
          <div className="flex items-center gap-0">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                size={9}
                className="fill-orange-400 text-orange-400 sm:h-3 sm:w-3"
              />
            ))}
          </div>

          <span className="truncate text-[8px] text-slate-400 sm:text-[10px]">
            {product.reviews || "Reviews"}
          </span>
        </div>

        {/* Divider */}
        <div className="my-2 h-px bg-slate-100 sm:my-4" />

        {/* PRICE SECTION */}
        <div className="flex items-end justify-between gap-1">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <span className="text-sm font-black text-slate-900 sm:text-xl">
                ₹{product.price?.amount}
              </span>

              {product.oldPrice && (
                <span className="text-[9px] text-slate-400 line-through sm:text-xs">
                  ₹{product.oldPrice?.amount}
                </span>
              )}
            </div>

            <p className="mt-0.5 text-[7px] font-medium text-green-600 sm:mt-1 sm:text-[9px]">
              Inclusive of all taxes
            </p>
          </div>

          {/* Save More */}
          <div className="shrink-0 rounded-md bg-green-50 px-1 py-1 sm:rounded-lg sm:px-2">
            <span className="text-[7px] font-bold text-green-600 sm:text-[9px]">
              SAVE MORE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;