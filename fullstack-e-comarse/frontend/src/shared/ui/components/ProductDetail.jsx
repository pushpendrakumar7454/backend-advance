
import React, { useEffect, useState } from "react";

import {
  FiHeart,
  FiShoppingBag,
  FiMinus,
  FiPlus,
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
} from "react-icons/fi";

import { useNavigate, useParams } from "react-router";
import apiInstance from "../../../config/apiInstance";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // =========================
  // ALL HOOKS
  // =========================
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("Blue");
  const [wishlist, setWishlist] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // GET SINGLE PRODUCT
  // =========================
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await apiInstance.get(`/products/findone/${id}`);

        const productData =
          res.data.data?.product || res.data.data;

        if (!productData) {
          throw new Error("Product data not found");
        }

        setProduct(productData);
        setActiveImage(0);

        // =========================
        // DEFAULT SIZE
        // =========================
        // Agar actual size values available hain
        // to first size automatically select hoga.
        if (Array.isArray(productData.sizes)) {
          const validSizes = productData.sizes
            .map((item) => {
              if (typeof item === "string") {
                return item;
              }

              if (
                typeof item === "object" &&
                item !== null
              ) {
                return (
                  item.size ||
                  item.name ||
                  item.label ||
                  item.value ||
                  ""
                );
              }

              return "";
            })
            .filter((item) => item);

          if (validSizes.length > 0) {
            setSelectedSize(validSizes[0]);
          } else {
            setSelectedSize("");
          }
        } else {
          setSelectedSize("");
        }
      } catch (error) {
        console.log("Product Error:", error);

        setError(
          error.response?.data?.message ||
            error.message ||
            "Unable to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getData();
    } else {
      setLoading(false);
      setError("Product ID is missing");
    }
  }, [id]);

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async () => {
    try {
      // Product ID check
      if (!id) {
        alert("Product ID not found");
        return;
      }

      // Quantity check
      if (quantity < 1) {
        alert("Quantity must be at least 1");
        return;
      }

      // =========================
      // CHECK ACTUAL SIZES
      // =========================
      const hasSizes =
        Array.isArray(product?.sizes) &&
        product.sizes.some((item) => {
          if (typeof item === "string") {
            return item.trim() !== "";
          }

          if (
            typeof item === "object" &&
            item !== null
          ) {
            return Boolean(
              item.size ||
                item.name ||
                item.label ||
                item.value
            );
          }

          return false;
        });

      // Agar actual size available hai
      // to selected size required hoga.
      if (hasSizes && !selectedSize) {
        alert("Please select a size");
        return;
      }

      // =========================
      // CART DATA
      // =========================
      const cartData = {
        productId: id,
        quantity: quantity,
      };

      // Size sirf tab bhejna hai
      // jab actual size available ho.
      if (hasSizes) {
        cartData.size = selectedSize;
      }

      console.log("SENDING CART DATA:", cartData);

      const res = await apiInstance.post(
        "/cart/add",
        cartData
      );

      console.log("ADD TO CART RESPONSE:", res.data);

      alert(
        res.data?.message ||
          "Product added to cart successfully"
      );
    } catch (error) {
      console.log("ADD TO CART ERROR:", error);
      console.log(
        "ERROR RESPONSE:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Product cart me add nahi hua"
      );
    }
  };

  // =========================
  // BUY NOW
  // =========================
  const handleBuyNow = () => {
    console.log("BUY NOW:", {
      productId: product?._id,
      quantity: quantity,
      selectedSize: selectedSize,
      selectedColor: selectedColor,
    });
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f7f5]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500"></div>

          <p className="mt-4 text-sm font-medium text-gray-500">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f7f5] px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-bold text-gray-900">
            Product not available
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {error || "Product could not be found."}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // IMAGES
  // =========================
  const images = Array.isArray(product.images)
    ? product.images.filter((image) => image)
    : [];

  const imageCount = images.length;

  // =========================
  // SIZES
  // =========================
  /*
    Backend se sizes different format me aa sakte hain.

    Example 1:
    sizes: ["S", "M", "L"]

    Example 2:
    sizes: [
      {
        size: "S",
        stock: 10,
        _id: "..."
      }
    ]

    Example 3:
    sizes: [
      {
        name: "S",
        stock: 10,
        _id: "..."
      }
    ]

    Agar backend se sirf:
    {
      stock: 10,
      _id: "..."
    }

    aa raha hai, to actual size available nahi hai.
    Isliye size section hide hoga.
  */

  const sizes = Array.isArray(product.sizes)
    ? product.sizes
        .map((item) => {
          if (typeof item === "string") {
            return {
              value: item,
              key: item,
            };
          }

          if (
            typeof item === "object" &&
            item !== null
          ) {
            const value =
              item.size ||
              item.name ||
              item.label ||
              item.value ||
              "";

            if (!value) {
              return null;
            }

            return {
              value: value,
              key: item._id || value,
            };
          }

          return null;
        })
        .filter((item) => item !== null)
    : [];

  const hasSizes = sizes.length > 0;

  // =========================
  // PRICE
  // =========================
  const price =
    typeof product.price === "object" &&
    product.price !== null
      ? Number(product.price.amount) || 0
      : Number(product.price) || 0;

  const currency =
    typeof product.price === "object" &&
    product.price !== null
      ? product.price.currency || "INR"
      : "INR";

  // =========================
  // OLD PRICE
  // =========================
  const oldPrice =
    typeof product.oldPrice === "object" &&
    product.oldPrice !== null
      ? Number(product.oldPrice.amount) || 0
      : Number(product.oldPrice) || 0;

  // =========================
  // FORMAT PRICE
  // =========================
  const formatPrice = (amount) => {
    if (currency === "INR") {
      return `₹${amount.toLocaleString("en-IN")}`;
    }

    return `${currency} ${amount.toLocaleString("en-IN")}`;
  };

  // =========================
  // DISCOUNT
  // =========================
  const discount =
    oldPrice > price && oldPrice > 0
      ? Math.round(
          ((oldPrice - price) / oldPrice) * 100
        )
      : 0;

  // =========================
  // NEXT IMAGE
  // =========================
  const nextImage = () => {
    if (imageCount <= 1) {
      return;
    }

    setActiveImage((current) => {
      if (current === imageCount - 1) {
        return 0;
      }

      return current + 1;
    });
  };

  // =========================
  // PREVIOUS IMAGE
  // =========================
  const previousImage = () => {
    if (imageCount <= 1) {
      return;
    }

    setActiveImage((current) => {
      if (current === 0) {
        return imageCount - 1;
      }

      return current - 1;
    });
  };

  // =========================
  // QUANTITY
  // =========================
  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) => {
      if (current <= 1) {
        return 1;
      }

      return current - 1;
    });
  };

  // =========================
  // RETURN UI
  // =========================
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f6f7f5]">
      <div className="mx-auto w-full max-w-[1400px] px-3 py-4 sm:px-5 sm:py-5 md:px-6 lg:px-8">

        {/* =========================
            BREADCRUMB
        ========================= */}
        <div className="mb-4 flex items-center gap-2 overflow-hidden text-xs sm:mb-5">
          <button
            onClick={() => navigate(-1)}
            className="flex shrink-0 items-center gap-1.5 font-semibold text-[#475467] transition hover:text-orange-500 sm:gap-2"
          >
            <FiArrowLeft size={14} />
            <span>Back</span>
          </button>

          <span className="text-[#98A2B3]">/</span>

          <span className="shrink-0 text-[#98A2B3]">
            Shop
          </span>

          <span className="text-[#98A2B3]">/</span>

          <span className="truncate font-medium text-[#101828]">
            Product Details
          </span>
        </div>

        {/* =========================
            MAIN PRODUCT CARD
        ========================= */}
        <div className="overflow-hidden rounded-2xl border border-[#EAECF0] bg-white shadow-[0_10px_40px_rgba(16,24,40,0.06)] sm:rounded-[24px] lg:rounded-[30px]">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* =========================
                IMAGE SECTION
            ========================= */}
            <div className="relative h-[420px] bg-[#eef0ed] sm:h-[540px] md:h-[600px] lg:h-[680px] xl:h-[720px]">

              {/* SPECIAL BADGE */}
              <div className="absolute left-3 top-3 z-30 rounded-full bg-orange-500 px-3.5 py-2 text-[9px] font-bold tracking-[1.2px] text-white shadow-lg sm:left-5 sm:top-5 sm:px-4 sm:py-2.5 sm:text-[10px] md:left-6 md:top-6">
                SPECIAL
              </div>

              {/* WISHLIST */}
              <button
                onClick={() =>
                  setWishlist((current) => !current)
                }
                aria-label="Toggle wishlist"
                className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[#EAECF0] bg-white shadow-md transition duration-200 hover:scale-105 sm:right-5 sm:top-5 sm:h-11 sm:w-11 md:right-6 md:top-6 md:h-12 md:w-12"
              >
                <FiHeart
                  size={18}
                  className={
                    wishlist
                      ? "fill-orange-500 text-orange-500"
                      : "text-[#344054]"
                  }
                />
              </button>

              {/* IMAGE */}
              <div className="relative h-full w-full overflow-hidden">
                {imageCount > 0 ? (
                  <img
                    key={images[activeImage]}
                    src={images[activeImage]}
                    alt={product.title || "Product"}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <p className="text-sm text-gray-400">
                      No Image Available
                    </p>
                  </div>
                )}

                {/* IMAGE OVERLAY */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

                {/* ARROWS */}
                {imageCount > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[#101828] shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-white sm:left-5 sm:h-11 sm:w-11 md:h-12 md:w-12"
                    >
                      <FiChevronLeft size={19} />
                    </button>

                    <button
                      onClick={nextImage}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[#101828] shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-white sm:right-5 sm:h-11 sm:w-11 md:h-12 md:w-12"
                    >
                      <FiChevronRight size={19} />
                    </button>
                  </>
                )}

                {/* PREMIUM */}
                <div className="absolute bottom-4 left-3 rounded-full bg-white px-3.5 py-2 text-[8px] font-bold tracking-[1.5px] text-[#667085] shadow-lg sm:bottom-5 sm:left-5 sm:px-4 sm:py-2.5 sm:text-[9px] md:bottom-6 md:left-6 md:px-5 md:text-[10px]">
                  PREMIUM
                </div>

                {/* DOTS */}
                {imageCount > 1 && (
                  <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/20 px-2.5 py-1.5 backdrop-blur-md sm:bottom-5 sm:gap-2 sm:px-3 sm:py-2 md:bottom-7">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setActiveImage(index)
                        }
                        aria-label={`Show image ${
                          index + 1
                        }`}
                        className={`rounded-full transition-all duration-300 ${
                          activeImage === index
                            ? "h-1.5 w-5 bg-white sm:h-2 sm:w-7"
                            : "h-1.5 w-1.5 bg-white/60 hover:bg-white sm:h-2 sm:w-2"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* IMAGE COUNTER */}
                {imageCount > 1 && (
                  <div className="absolute bottom-4 right-3 rounded-full bg-black/40 px-2.5 py-1.5 text-[9px] font-semibold text-white backdrop-blur-md sm:bottom-5 sm:right-5 sm:px-3 sm:py-2 sm:text-[10px] md:bottom-6 md:right-6">
                    {activeImage + 1} / {imageCount}
                  </div>
                )}
              </div>
            </div>

            {/* =========================
                PRODUCT DETAILS
            ========================= */}
            <div className="flex flex-col p-5 sm:p-7 md:p-8 lg:p-9 xl:p-11">

              {/* BRAND */}
              <p className="text-[10px] font-bold uppercase tracking-[2px] text-orange-500 sm:text-[11px] sm:tracking-[2.5px]">
                {product.brand || "NEXORA"}
              </p>

              {/* TITLE */}
              <h1 className="mt-2 max-w-xl text-[24px] font-semibold leading-[1.2] tracking-[-0.4px] text-[#101828] sm:text-[28px] md:text-[30px] lg:text-[31px]">
                {product.title || "Untitled Product"}
              </h1>

              {/* CATEGORY */}
              <p className="mt-2 text-[11px] font-medium text-[#98A2B3] sm:text-xs">
                {product.category || "General"}
              </p>

              {/* DESCRIPTION */}
              <p className="mt-4 max-w-xl text-[13px] leading-5 text-[#667085] sm:mt-5 sm:text-[14px] sm:leading-6">
                {product.description ||
                  "No description available."}
              </p>

              {/* PRICE */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6 sm:gap-3">
                <span className="text-[25px] font-extrabold text-[#101828] sm:text-[28px] md:text-[29px]">
                  {formatPrice(price)}
                </span>

                {oldPrice > price && (
                  <span className="text-[13px] text-[#98A2B3] line-through sm:text-[15px]">
                    {formatPrice(oldPrice)}
                  </span>
                )}

                {discount > 0 && (
                  <span className="rounded-full bg-[#ECFDF3] px-2.5 py-1 text-[9px] font-bold text-[#039855] sm:px-3 sm:text-[11px]">
                    {discount}% OFF
                  </span>
                )}
              </div>

              <p className="mt-1 text-[10px] font-medium text-[#039855] sm:text-[11px]">
                Inclusive of all taxes
              </p>

              <div className="my-5 h-px bg-[#EAECF0] sm:my-6" />

              {/* =========================
                  SIZE
              ========================= */}
              {hasSizes && (
                <div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-[13px] font-bold text-[#101828] sm:text-sm">
                      Select Size
                    </p>

                    <span className="shrink-0 text-[10px] font-semibold text-orange-500 sm:text-xs">
                      Size Guide
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size.key}
                        onClick={() =>
                          setSelectedSize(size.value)
                        }
                        className={`h-9 min-w-[42px] rounded-lg border px-3 text-[11px] font-bold transition-all duration-200 sm:h-10 sm:min-w-[47px] sm:px-4 sm:text-xs ${
                          selectedSize === size.value
                            ? "border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-100"
                            : "border-[#D0D5DD] bg-white text-[#344054] hover:border-orange-400"
                        }`}
                      >
                        {size.value}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* =========================
                  COLOR
              ========================= */}
              <div className="mt-5 sm:mt-6">
                <p className="mb-3 text-[13px] font-bold text-[#101828] sm:text-sm">
                  Select Color
                </p>

                <div className="flex flex-wrap gap-2">

                  {/* BLUE */}
                  <button
                    onClick={() =>
                      setSelectedColor("Blue")
                    }
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[10px] font-semibold transition sm:gap-2 sm:px-4 sm:py-2.5 sm:text-xs ${
                      selectedColor === "Blue"
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-[#D0D5DD] bg-white text-[#344054]"
                    }`}
                  >
                    <span className="h-3.5 w-3.5 rounded-full bg-[#263f5c] sm:h-4 sm:w-4" />

                    Blue

                    {selectedColor === "Blue" && (
                      <FiCheck size={12} />
                    )}
                  </button>

                  {/* BLACK */}
                  <button
                    onClick={() =>
                      setSelectedColor("Black")
                    }
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[10px] font-semibold transition sm:gap-2 sm:px-4 sm:py-2.5 sm:text-xs ${
                      selectedColor === "Black"
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-[#D0D5DD] bg-white text-[#344054]"
                    }`}
                  >
                    <span className="h-3.5 w-3.5 rounded-full bg-black sm:h-4 sm:w-4" />

                    Black

                    {selectedColor === "Black" && (
                      <FiCheck size={12} />
                    )}
                  </button>

                  {/* WHITE */}
                  <button
                    onClick={() =>
                      setSelectedColor("White")
                    }
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[10px] font-semibold transition sm:gap-2 sm:px-4 sm:py-2.5 sm:text-xs ${
                      selectedColor === "White"
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-[#D0D5DD] bg-white text-[#344054]"
                    }`}
                  >
                    <span className="h-3.5 w-3.5 rounded-full border border-[#D0D5DD] bg-white sm:h-4 sm:w-4" />

                    White

                    {selectedColor === "White" && (
                      <FiCheck size={12} />
                    )}
                  </button>
                </div>
              </div>

              {/* =========================
                  QUANTITY
              ========================= */}
              <div className="mt-5 sm:mt-6">
                <p className="mb-3 text-[13px] font-bold text-[#101828] sm:text-sm">
                  Quantity
                </p>

                <div className="flex h-10 w-[120px] items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-1.5 sm:h-11 sm:w-[130px] sm:px-2">
                  <button
                    onClick={decreaseQuantity}
                    aria-label="Decrease quantity"
                    className="flex h-7 w-7 items-center justify-center rounded-md text-[#475467] transition hover:bg-[#F2F4F7] sm:h-8 sm:w-8"
                  >
                    <FiMinus size={14} />
                  </button>

                  <span className="text-xs font-bold text-[#101828] sm:text-sm">
                    {quantity}
                  </span>

                  <button
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                    className="flex h-7 w-7 items-center justify-center rounded-md text-[#475467] transition hover:bg-[#F2F4F7] sm:h-8 sm:w-8"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>

              {/* =========================
                  ACTION BUTTONS
              ========================= */}
              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-orange-500 bg-white text-xs font-bold text-orange-500 transition duration-200 hover:bg-orange-50 sm:h-12 sm:text-sm"
                >
                  <FiShoppingBag size={17} />
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="h-11 rounded-xl bg-orange-500 text-xs font-bold text-white shadow-[0_8px_22px_rgba(255,107,0,0.20)] transition duration-200 hover:bg-orange-600 sm:h-12 sm:text-sm"
                >
                  Buy Now
                </button>
              </div>

              {/* =========================
                  SELECTED ITEM
              ========================= */}
              <div className="mt-5 rounded-xl border border-[#EAECF0] bg-[#FAFAF9] px-3.5 py-3 sm:mt-6 sm:px-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[8px] font-bold uppercase tracking-[1.3px] text-[#98A2B3] sm:text-[9px] sm:tracking-[1.5px]">
                      Selected
                    </p>

                    <p className="mt-1 truncate text-[11px] font-bold text-[#101828] sm:text-xs">
                      {selectedColor}

                      {hasSizes &&
                        ` / Size ${selectedSize}`}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-[8px] uppercase tracking-wide text-[#98A2B3] sm:text-[9px]">
                      Quantity
                    </p>

                    <p className="mt-1 text-[11px] font-bold text-[#101828] sm:text-xs">
                      {quantity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            PRODUCT INFORMATION
        ========================= */}
        <div className="mt-4 rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-sm sm:mt-5 sm:rounded-[25px] sm:p-7 md:p-8">
          <p className="text-[9px] font-bold uppercase tracking-[1.8px] text-orange-500 sm:text-[10px] sm:tracking-[2px]">
            Product Information
          </p>

          <h2 className="mt-1 text-lg font-extrabold text-[#101828] sm:text-xl">
            Product Details
          </h2>

          <p className="mt-3 max-w-4xl text-[12px] leading-5 text-[#667085] sm:text-sm sm:leading-6">
            {product.description ||
              "No description available."}
          </p>

          {/* INFO BOXES */}
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3 md:grid-cols-4">

            <div className="rounded-xl bg-[#F9FAFB] p-3 sm:p-4">
              <p className="text-[9px] uppercase tracking-wide text-[#98A2B3] sm:text-[10px]">
                Brand
              </p>

              <p className="mt-1 text-xs font-bold text-[#101828] sm:text-sm">
                {product.brand || "NEXORA"}
              </p>
            </div>

            <div className="rounded-xl bg-[#F9FAFB] p-3 sm:p-4">
              <p className="text-[9px] uppercase tracking-wide text-[#98A2B3] sm:text-[10px]">
                Category
              </p>

              <p className="mt-1 break-words text-xs font-bold text-[#101828] sm:text-sm">
                {product.category || "General"}
              </p>
            </div>

            <div className="rounded-xl bg-[#F9FAFB] p-3 sm:p-4">
              <p className="text-[9px] uppercase tracking-wide text-[#98A2B3] sm:text-[10px]">
                Material
              </p>

              <p className="mt-1 text-xs font-bold text-[#101828] sm:text-sm">
                Premium Fabric
              </p>
            </div>

            <div className="rounded-xl bg-[#F9FAFB] p-3 sm:p-4">
              <p className="text-[9px] uppercase tracking-wide text-[#98A2B3] sm:text-[10px]">
                Fit
              </p>

              <p className="mt-1 text-xs font-bold text-[#101828] sm:text-sm">
                Regular Fit
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

