
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
  FiArrowUpRight,
  FiStar,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import apiInstance from "../../../config/apiInstance";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("Blue");
  const [wishlist, setWishlist] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [error, setError] = useState("");

  // ==================================
  // CURRENT PRODUCT API
  // ==================================
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await apiInstance.get(
          `/products/findone/${id}`
        );

        const productData =
          res.data.data?.product || res.data.data;

        if (!productData) {
          throw new Error("Product data not found");
        }

        setProduct(productData);
        setActiveImage(0);
        setQuantity(1);

        const productSizes = Array.isArray(productData.sizes)
          ? productData.sizes
          : [];

        const validSizes = productSizes
          .map((item) => {
            if (typeof item === "string") {
              return item;
            }

            if (item && typeof item === "object") {
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
          .filter(Boolean);

        setSelectedSize(
          validSizes.length > 0 ? validSizes[0] : ""
        );
      } catch (error) {
        console.log("Product Error:", error);

        setError(
          error.response?.data?.message ||
            error.message ||
            "Unable to load product"
        );

        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getProduct();
    } else {
      setLoading(false);
      setError("Product ID is missing");
    }
  }, [id]);

  // ==================================
  // ALL PRODUCTS API
  // ==================================
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setRelatedLoading(true);

        const res = await apiInstance.get("/products/find");

        const productList =
          res.data.data?.products || res.data.data;

        setProducts(
          Array.isArray(productList) ? productList : []
        );
      } catch (error) {
        console.log("Related Products Error:", error);
        setProducts([]);
      } finally {
        setRelatedLoading(false);
      }
    };

    getAllProducts();
  }, []);

  // ==================================
  // HELPERS
  // ==================================
  const getProductImages = (item) => {
    if (Array.isArray(item?.images)) {
      return item.images.filter(
        (image) => typeof image === "string" && image.trim()
      );
    }

    if (typeof item?.images === "string" && item.images.trim()) {
      return [item.images];
    }

    if (typeof item?.image === "string" && item.image.trim()) {
      return [item.image];
    }

    return [];
  };

  const getPrice = (item) => {
    if (typeof item?.price === "object" && item.price !== null) {
      return Number(item.price.amount) || 0;
    }

    return Number(item?.price) || 0;
  };

  const getCurrency = (item) => {
    if (typeof item?.price === "object" && item.price !== null) {
      return item.price.currency || "INR";
    }

    return "INR";
  };

  const formatPrice = (amount, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // ==================================
  // RELATED PRODUCTS
  // ==================================
  const relatedProducts = product
    ? products
        .filter((item) => {
          return (
            item.category === product.category &&
            String(item._id) !== String(product._id)
          );
        })
        .slice(0, 8)
    : [];

  // ==================================
  // ADD TO CART
  // ==================================
  const handleAddToCart = async () => {
    try {
      if (!product?._id) {
        alert("Product ID not found");
        return;
      }

      if (quantity < 1) {
        alert("Quantity must be at least 1");
        return;
      }

      const sizes = Array.isArray(product.sizes)
        ? product.sizes
        : [];

      const hasSizes = sizes.some((item) => {
        if (typeof item === "string") {
          return item.trim() !== "";
        }

        if (item && typeof item === "object") {
          return Boolean(
            item.size ||
              item.name ||
              item.label ||
              item.value
          );
        }

        return false;
      });

      if (hasSizes && !selectedSize) {
        alert("Please select a size");
        return;
      }

      const cartData = {
        productId: product._id,
        quantity,
        color: selectedColor,
      };

      if (hasSizes) {
        cartData.size = selectedSize;
      }

      const res = await apiInstance.post("/cart/add", cartData);

      alert(
        res.data?.message || "Product added to cart successfully"
      );
    } catch (error) {
      console.log("ADD TO CART ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Product cart me add nahi hua"
      );
    }
  };

const handleBuyNow = async () => {
  try {
    if (!product?._id) {
      alert("Product not found");
      return;
    }

    if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
      alert("Razorpay Key ID is missing");
      return;
    }

    // Step 1: Backend se order create karo
    const orderResponse = await apiInstance.post(
      `/product/${product._id}/order`
    );

    const order = orderResponse.data.order;

    // Step 2: Razorpay payment options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "NEXORA",
      description: product.title,
      order_id: order.id,

      // Step 3: Payment ke baad verification
      handler: async function (response) {
        try {
          const verifyResponse = await apiInstance.post(
            "/product/verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          if (verifyResponse.data.status === true) {
            alert("Payment successful!");
          } else {
            alert("Payment verification failed");
          }
        } catch (error) {
          console.error("Payment verification error:", error);

          alert(
            error.response?.data?.message ||
              "Payment verification failed"
          );
        }
      },
    };

    // Step 4: Razorpay checkout open karo
    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function (response) {
      alert(
        response.error?.description || "Payment failed"
      );
    });

    razorpay.open();
  } catch (error) {
    console.error("Buy Now error:", error);

    alert(
      error.response?.data?.message ||
        "Unable to start payment"
    );
  }
};

  // ==================================
  // LOADING
  // ==================================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f4]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />
          <p className="mt-4 text-sm font-medium text-gray-500">
            Preparing your product...
          </p>
        </div>
      </div>
    );
  }

  // ==================================
  // ERROR
  // ==================================
  if (error || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f4] px-4">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-xl font-bold text-gray-900">
            Product not available
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {error || "Product could not be found."}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ==================================
  // PRODUCT DATA
  // ==================================
  const images = getProductImages(product);
  const imageCount = images.length;

  const sizes = Array.isArray(product.sizes)
    ? product.sizes
        .map((item) => {
          if (typeof item === "string") {
            return { value: item, key: item };
          }

          if (item && typeof item === "object") {
            const value =
              item.size ||
              item.name ||
              item.label ||
              item.value ||
              "";

            return value
              ? { value, key: item._id || value }
              : null;
          }

          return null;
        })
        .filter(Boolean)
    : [];

  const price = getPrice(product);
  const currency = getCurrency(product);
  const oldPrice = Number(
    typeof product.oldPrice === "object"
      ? product.oldPrice?.amount
      : product.oldPrice
  ) || 0;

  const discount =
    oldPrice > price && oldPrice > 0
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  const nextImage = () => {
    setActiveImage((current) =>
      current >= imageCount - 1 ? 0 : current + 1
    );
  };

  const previousImage = () => {
    setActiveImage((current) =>
      current <= 0 ? imageCount - 1 : current - 1
    );
  };

  // ==================================
  // RELATED PRODUCT CARD
  // ==================================
  const renderRelatedProduct = (item) => {
    const itemImages = getProductImages(item);
    const itemPrice = getPrice(item);
    const itemCurrency = getCurrency(item);

    return (
      <button
        type="button"
        key={item._id}
        onClick={() =>
          navigate(`/user-header/product/${item._id}`)
        }
        className="group min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white text-left transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100/50"
      >
        <div className="relative flex h-40 items-center justify-center overflow-hidden bg-[#f5f5f2] p-3 sm:h-52 md:h-56">
          {itemImages.length > 0 ? (
            <img
              src={itemImages[0]}
              alt={item.title || "Related product"}
              loading="lazy"
              className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="text-sm text-gray-400">
              No image available
            </div>
          )}

          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-gray-600 shadow-sm sm:left-3 sm:top-3">
            {item.category || "Collection"}
          </span>

          <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-800 shadow-sm transition group-hover:bg-orange-500 group-hover:text-white sm:bottom-3 sm:right-3">
            <FiArrowUpRight size={16} />
          </span>
        </div>

        <div className="p-3 sm:p-4">
          <p className="truncate text-[9px] font-bold uppercase tracking-[1.5px] text-orange-500 sm:text-[10px]">
            {item.brand || "NEXORA"}
          </p>

          <h3 className="mt-1.5 line-clamp-2 min-h-10 text-xs font-bold leading-5 text-gray-900 sm:text-sm">
            {item.title || "Untitled Product"}
          </h3>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-extrabold text-gray-900 sm:text-base">
              {formatPrice(itemPrice, itemCurrency)}
            </span>

            <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-500">
              <FiStar size={12} className="fill-amber-400" />
              New
            </span>
          </div>
        </div>
      </button>
    );
  };

  // ==================================
  // MAIN UI
  // ==================================
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f7f4]">
      <div className="mx-auto max-w-[1440px] px-3 py-5 sm:px-5 md:px-8 lg:px-10">

        {/* BREADCRUMB */}
        <div className="mb-5 flex items-center gap-2 text-xs text-gray-500">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 font-semibold transition hover:text-orange-500"
          >
            <FiArrowLeft size={15} />
            Back
          </button>
          <span>/</span>
          <span>Shop</span>
          <span>/</span>
          <span className="truncate font-semibold text-gray-900">
            {product.title}
          </span>
        </div>

        {/* MAIN PRODUCT */}
        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* IMAGE GALLERY */}
            <div className="p-3 sm:p-5 lg:p-7">
              <div className="relative flex h-[360px] items-center justify-center overflow-hidden rounded-2xl bg-[#f4f4f0] sm:h-[500px] md:h-[580px] lg:h-[620px]">
                <span className="absolute left-4 top-4 z-10 rounded-full bg-orange-500 px-4 py-2 text-[9px] font-bold uppercase tracking-[1.5px] text-white shadow-lg">
                  Featured
                </span>

                <button
                  onClick={() => setWishlist(!wishlist)}
                  aria-label="Toggle wishlist"
                  className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
                >
                  <FiHeart
                    size={19}
                    className={
                      wishlist
                        ? "fill-orange-500 text-orange-500"
                        : "text-gray-700"
                    }
                  />
                </button>

                {imageCount > 0 ? (
                  <img
                    key={images[activeImage]}
                    src={images[activeImage]}
                    alt={product.title || "Product"}
                    className="h-full w-full object-contain p-5 transition duration-500 sm:p-8"
                  />
                ) : (
                  <div className="text-sm text-gray-400">
                    No image available
                  </div>
                )}

                {imageCount > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-md transition hover:bg-orange-500 hover:text-white"
                    >
                      <FiChevronLeft size={20} />
                    </button>

                    <button
                      onClick={nextImage}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-md transition hover:bg-orange-500 hover:text-white"
                    >
                      <FiChevronRight size={20} />
                    </button>

                    <span className="absolute bottom-4 right-4 rounded-full bg-gray-900/75 px-3 py-1.5 text-[10px] font-semibold text-white">
                      {activeImage + 1} / {imageCount}
                    </span>
                  </>
                )}
              </div>

              {/* IMAGE THUMBNAILS */}
              {imageCount > 1 && (
                <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      onClick={() => setActiveImage(index)}
                      className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-[#f4f4f0] p-1 transition sm:h-24 sm:w-24 ${
                        activeImage === index
                          ? "border-orange-500"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PRODUCT DETAILS */}
            <div className="flex flex-col p-5 sm:p-8 lg:p-10 xl:p-12">
              <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-orange-500 sm:text-xs">
                {product.brand || "NEXORA COLLECTION"}
              </p>

              <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                {product.title || "Untitled Product"}
              </h1>

              <p className="mt-2 text-xs font-medium capitalize text-gray-400 sm:text-sm">
                {product.category || "General"}
              </p>

              <p className="mt-5 text-sm leading-7 text-gray-500">
                {product.description || "No description available."}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-2xl font-bold tracking-tight text-orange-600">
                  {formatPrice(price, currency)}
                </span>

                {oldPrice > price && (
                  <span className="text-base text-gray-400 line-through">
                    {formatPrice(oldPrice, currency)}
                  </span>
                )}

                {discount > 0 && (
                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                    {discount}% OFF
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs text-green-600">
                Inclusive of all taxes
              </p>

              <div className="my-7 h-px bg-gray-100" />

              {/* SIZE */}
              {sizes.length > 0 && (
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-900">
                      Select Size
                    </p>
                    <span className="text-xs font-medium text-gray-400">
                      Choose your fit
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size.key}
                        onClick={() => setSelectedSize(size.value)}
                        className={`min-w-12 rounded-xl border px-4 py-3 text-xs font-bold transition ${
                          selectedSize === size.value
                            ? "border-orange-500 bg-orange-500 text-white"
                            : "border-gray-200 bg-white text-gray-700 hover:border-orange-400"
                        }`}
                      >
                        {size.value}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* COLOR */}
              <div className="mt-6">
                <p className="mb-3 text-sm font-bold text-gray-900">
                  Select Color
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Blue", color: "#263f5c" },
                    { name: "Black", color: "#111111" },
                    { name: "White", color: "#ffffff" },
                  ].map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                        selectedColor === color.name
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-gray-200 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      <span
                        className="h-4 w-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: color.color }}
                      />
                      {color.name}
                      {selectedColor === color.name && (
                        <FiCheck size={13} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY */}
              <div className="mt-6">
                <p className="mb-3 text-sm font-bold text-gray-900">
                  Quantity
                </p>

                <div className="flex h-12 w-36 items-center justify-between rounded-xl border border-gray-200 px-2">
                  <button
                    onClick={() =>
                      setQuantity((current) => Math.max(1, current - 1))
                    }
                    aria-label="Decrease quantity"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
                  >
                    <FiMinus size={15} />
                  </button>

                  <span className="text-sm font-bold text-gray-900">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity((current) => current + 1)
                    }
                    aria-label="Increase quantity"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
                  >
                    <FiPlus size={15} />
                  </button>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={handleAddToCart}
                  className="flex h-13 min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-orange-500 bg-white px-4 py-3 text-sm font-bold text-orange-600 transition hover:bg-orange-50"
                >
                  <FiShoppingBag size={18} />
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex min-h-12 items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600"
                >
                  Buy Now
                </button>
              </div>

              <div className="mt-5 rounded-xl bg-[#f8f8f5] p-4">
                <p className="text-[9px] font-bold uppercase tracking-[2px] text-gray-400">
                  Your Selection
                </p>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-bold text-gray-800">
                    {selectedColor}
                    {sizes.length > 0 && ` / Size ${selectedSize}`}
                  </p>

                  <p className="text-xs font-bold text-gray-800">
                    Qty: {quantity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT INFORMATION */}
        <section className="mt-5 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-orange-500">
            Product Information
          </p>

          <h2 className="mt-2 text-xl font-extrabold text-gray-900 sm:text-2xl">
            Product Details
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-gray-500">
            {product.description || "No description available."}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              {
                label: "Brand",
                value: product.brand || "NEXORA",
              },
              {
                label: "Category",
                value: product.category || "General",
              },
              {
                label: "Material",
                value: product.material || "Premium Quality",
              },
              {
                label: "Availability",
                value: product.stock > 0 ? "In Stock" : "Check Availability",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-[#f8f8f5] p-4"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  {item.label}
                </p>

                <p className="mt-2 break-words text-sm font-bold capitalize text-gray-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================
            RELATED PRODUCTS
        ================================== */}
        <section className="mt-6 pb-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-orange-500">
                Discover More
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-orange-800 sm:text-3xl">
                You May Also Like
              </h2>

              <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                Explore more products from the same category.
              </p>
            </div>

            {relatedProducts.length > 0 && (
              <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600">
                {relatedProducts.length} Products
              </span>
            )}
          </div>

          {relatedLoading ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
              Loading related products...
            </div>
          ) : relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {relatedProducts.map((item) =>
                renderRelatedProduct(item)
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-10 text-center">
              <p className="text-sm font-bold text-gray-800">
                No related products found
              </p>

              <p className="mt-2 text-xs text-gray-500">
                There are no other products in this category right now.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
