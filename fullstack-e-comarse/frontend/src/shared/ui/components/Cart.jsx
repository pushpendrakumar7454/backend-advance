
import React, { useEffect, useState } from "react";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiHeart,
  FiLock,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTag,
  FiTrash2,
  FiTruck,
  FiShield,
} from "react-icons/fi";

import { useNavigate } from "react-router";
import apiInstance from "../../../config/apiInstance";

const Cart = () => {
  const navigate = useNavigate();

  // ==========================================
  // CART DATA
  // ==========================================

  const [cartItems, setCartItems] = useState([]);

  // ==========================================
  // IMAGE URL
  // ==========================================

  const getImageUrl = (images) => {
    if (!images) {
      return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=90";
    }

    if (Array.isArray(images)) {
      if (images.length === 0) {
        return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=90";
      }

      const firstImage = images[0];

      if (typeof firstImage === "string") {
        return firstImage;
      }

      if (typeof firstImage === "object" && firstImage !== null) {
        return (
          firstImage.url ||
          firstImage.filePath ||
          firstImage.path ||
          firstImage.src ||
          firstImage.imageUrl ||
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=90"
        );
      }
    }

    if (typeof images === "string") {
      return images;
    }

    return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=90";
  };

  // ==========================================
  // GET CART DATA
  // ==========================================

  const getData = async () => {
    try {
      const res = await apiInstance.get("/cart");
      const products = res.data?.data?.cart?.products || [];
      const cartData = products.map((item) => {
        /*
          Backend se product populated hona chahiye:
          product: {
            _id,
            title,
            images,
            price,
            oldPrice,
            category
          }
        */
        const product =
          item?.product && typeof item.product === "object"
            ? item.product
            : null;

        let price = 0;

        if (
          product?.price &&
          typeof product.price === "object" &&
          product.price !== null
        ) {
          price = Number(product.price.amount) || 0;
        } else {
          price = Number(product?.price) || 0;
        }

        let oldPrice = 0;

        if (
          product?.oldPrice &&
          typeof product.oldPrice === "object" &&
          product.oldPrice !== null
        ) {
          oldPrice = Number(product.oldPrice.amount) || 0;
        } else {
          oldPrice = Number(product?.oldPrice) || 0;
        }

        return {
          id: item?._id,

          productId:
            product?._id ||
            (typeof item?.product === "string" ? item.product : ""),

          title: product?.title || "Product",
          category: product?.category || "General",
          image: getImageUrl(product?.images),
          price: price,
          oldPrice: oldPrice,
          quantity: Number(item?.quantity) || 1,
          size: item?.size || null,
          color: item?.color || "Default",
        };
      });

      setCartItems(cartData);
    } catch (error) {
      console.log("ERROR RESPONSE:", error?.response?.data);
    }
  };

  useEffect(() => {
    getData();
  }, [])



  //update quntity function 


const updateQuantity=async(productId,quantity)=>{
  try {
    if(!productId) return
    if(quantity<1) return
    const res=await apiInstance.patch("/cart/quantity",{
      productId,quantity
    })
    console.log(res)
    await getData()
  } catch (error) {
    console.log(error)
  }
}

//increase qunatity of product
const increaseProductQuantity=(item)=>{
  updateQuantity(item.productId,item.quantity+1)
}

//discrese quantity of products

const discreasePeoductQuantity=(item)=>{
  if(item.quantity<=1)return
  updateQuantity(item.productId,item.quantity-1)
}


//delete product 

const removeItem = async (productId) => {
  try {
    if (!productId) return;

    const res = await apiInstance.delete("/cart/remove", {
      data: {
        productId: productId,
      },
    });

    console.log("REMOVE CART RESPONSE:", res.data);

    await getData();
  } catch (error) {
    console.log("REMOVE CART ERROR:", error);
    console.log("ERROR RESPONSE:", error?.response?.data);
  }
};

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [showPromo, setShowPromo] = useState(false);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "NEXORA10") {
      setPromoApplied(true);
    }
  };

  // ==========================================
  // PRICE CALCULATIONS
  // ==========================================

  let subtotal = 0;
  let originalTotal = 0;
  let totalItems = 0;

  for (let i = 0; i < cartItems.length; i++) {
    subtotal =
      subtotal +
      cartItems[i].price * cartItems[i].quantity;

    originalTotal =
      originalTotal +
      cartItems[i].oldPrice * cartItems[i].quantity;

    totalItems =
      totalItems + cartItems[i].quantity;
  }

  const productDiscount = Math.max(
    0,
    originalTotal - subtotal
  );

  const promoDiscount = promoApplied
    ? Math.round(subtotal * 0.1)
    : 0;

  const deliveryLimit = 3000;

  const remainingForFreeDelivery = Math.max(
    0,
    deliveryLimit - subtotal
  );

  const deliveryCharge =
    subtotal >= deliveryLimit ? 0 : 99;

  const total =
    subtotal - promoDiscount + deliveryCharge;

  const deliveryProgress = Math.min(
    100,
    Math.round((subtotal / deliveryLimit) * 100)
  );

  // ==========================================
  // FORMAT PRICE
  // ==========================================

  const formatPrice = (price) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f3] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[80vh] max-w-[1000px] items-center justify-center">
          <div className="relative w-full overflow-hidden rounded-[32px] border border-[#e7e7e4] bg-white px-6 py-14 text-center shadow-[0_25px_80px_rgba(16,24,40,0.07)] sm:px-12 sm:py-20">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-100/70 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-orange-50 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-[#111827] text-orange-400 shadow-xl sm:h-28 sm:w-28">
                <FiShoppingBag size={42} />
              </div>

              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[3px] text-orange-500">
                YOUR BAG
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-[-1px] text-[#111827] sm:text-4xl">
                Nothing here yet.
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#667085]">
                Your shopping bag is waiting for something special.
                Explore our latest collection and find your next
                favourite piece.
              </p>

              <button
                onClick={() => navigate("/")}
                className="group mx-auto mt-8 flex h-12 items-center justify-center gap-3 rounded-xl bg-[#111827] px-7 text-sm font-bold text-white transition duration-300 hover:bg-orange-500"
              >
                Explore Collection

                <FiArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f3] mt-3 p-3">

      {/* TOP DARK SECTION */}

      <div className="rounded-lg bg-[#101828]">
        <div className="mx-auto max-w-[1450px] px-4 pb-16 pt-6 sm:px-6 sm:pb-20 lg:px-8">

          {/* BACK */}

          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-xs font-medium text-white/60 transition hover:text-white"
          >
            <FiArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />

            Continue Shopping
          </button>

          {/* HEADING */}

          <div className="mt-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

                <p className="text-[9px] font-bold uppercase tracking-[3px] text-orange-400 sm:text-[10px]">
                  NEXORA / SHOPPING BAG
                </p>
              </div>

              <h1 className="mt-2 text-2xl font-semibold tracking-[-1px] text-white lg:text-4xl sm:text-4xl md:text-5xl">
                Your Bag
              </h1>

              <p className="mt-2 text-xs text-white/50 sm:text-sm">
                Everything you selected, all in one place.
              </p>
            </div>

            {/* ITEM COUNT */}

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white">
                <FiShoppingBag size={16} />
              </div>

              <div>
                <p className="text-[8px] font-bold uppercase tracking-[1px] text-white/40">
                  Items
                </p>

                <p className="mt-0.5 text-sm font-bold text-white">
                  {totalItems}{" "}
                  {totalItems === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="mx-auto -mt-9 max-w-[1450px] px-3 pb-10 sm:px-5 sm:pb-14 lg:px-8">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_410px] xl:gap-7">

          {/* LEFT */}

          <div className="min-w-0">

            {/* FREE DELIVERY PROGRESS */}

            <div className="mb-5 rounded-[22px] border border-[#e7e7e4] bg-white p-4 shadow-[0_10px_35px_rgba(16,24,40,0.05)] sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <FiTruck size={17} />
                  </div>

                  <div>
                    {remainingForFreeDelivery > 0 ? (
                      <>
                        <p className="text-xs font-bold text-[#101828] sm:text-sm">
                          You're{" "}
                          <span className="text-orange-500">
                            {formatPrice(remainingForFreeDelivery)}
                          </span>{" "}
                          away from free delivery
                        </p>

                        <p className="mt-1 text-[9px] text-[#98A2B3] sm:text-[10px]">
                          Add something you love and we'll deliver it for free.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="flex items-center gap-1.5 text-xs font-bold text-[#101828] sm:text-sm">
                          <FiCheck
                            size={14}
                            className="text-[#039855]"
                          />

                          You've unlocked free delivery
                        </p>

                        <p className="mt-1 text-[9px] text-[#98A2B3] sm:text-[10px]">
                          Nice choice. Your order qualifies for free shipping.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <span className="hidden shrink-0 text-[10px] font-bold text-[#667085] sm:block">
                  {deliveryProgress}%
                </span>
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#F2F4F7]">
                <div
                  className="h-full rounded-full bg-orange-500 transition-all duration-500"
                  style={{
                    width: `${deliveryProgress}%`,
                  }}
                />
              </div>
            </div>

            {/* CART PRODUCTS */}

            <div className="overflow-hidden rounded-[26px] border border-[#e7e7e4] bg-white shadow-[0_10px_40px_rgba(16,24,40,0.05)]">

              {/* HEADER */}

              <div className="flex items-center justify-between border-b border-[#eeeeec] px-4 py-4 sm:px-6 sm:py-5">
                <div>
                  <h2 className="text-sm font-extrabold text-[#101828] sm:text-base">
                    Selected Items
                  </h2>

                  <p className="mt-0.5 text-[9px] text-[#98A2B3] sm:text-[10px]">
                    Check your sizes, colours and quantities
                  </p>
                </div>

                <span className="rounded-full bg-[#F5F5F3] px-3 py-1.5 text-[8px] font-bold tracking-[1px] text-[#667085] sm:text-[9px]">
                  {cartItems.length} PRODUCTS
                </span>
              </div>

              {/* ITEMS */}

              <div className="divide-y divide-[#eeeeec]">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="group p-4 transition hover:bg-[#fcfcfb] sm:p-6"
                  >
                    <div className="flex gap-3 sm:gap-5">

                      {/* IMAGE */}

                      <div className="relative h-[135px] w-[105px] shrink-0 overflow-hidden rounded-2xl bg-[#f1f1ef] sm:h-[170px] sm:w-[140px] md:h-[185px] md:w-[155px]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=90";
                          }}
                        />

                        {item.oldPrice > item.price && (
                          <div className="absolute left-2.5 top-2.5 rounded-full bg-[#101828] px-2 py-1 text-[7px] font-bold tracking-wide text-white">
                            SALE
                          </div>
                        )}
                      </div>

                      {/* CONTENT */}

                      <div className="flex min-w-0 flex-1 flex-col">

                        {/* TOP */}

                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[8px] font-bold uppercase tracking-[1.5px] text-orange-500 sm:text-[9px]">
                              {item.category}
                            </p>

                            <h3 className="mt-1 line-clamp-2 max-w-[430px] text-sm font-bold leading-5 text-[#101828] sm:text-base sm:leading-6 md:text-lg">
                              {item.title}
                            </h3>
                          </div>

                          {/* REMOVE */}

                          <button
                            onClick={() => removeItem(item.productId)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#98A2B3] transition hover:bg-red-50 hover:text-red-500"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>

                        {/* OPTIONS */}

                        <div className="mt-2.5 flex flex-wrap gap-2">

                          {/* SIZE */}

                          {item.size && (
                            <span className="rounded-md bg-[#F7F7F5] px-2.5 py-1.5 text-[9px] font-semibold text-[#667085]">
                              Size{" "}
                              <span className="text-[#101828]">
                                {item.size}
                              </span>
                            </span>
                          )}

                          {/* COLOR */}

                          <span className="rounded-md bg-[#F7F7F5] px-2.5 py-1.5 text-[9px] font-semibold text-[#667085]">
                            Color{" "}
                            <span className="text-[#101828]">
                              {item.color}
                            </span>
                          </span>
                        </div>

                        {/* DESKTOP WISHLIST */}

                        <button className="mt-3 hidden w-fit items-center gap-1.5 text-[9px] font-bold text-[#98A2B3] transition hover:text-orange-500 sm:flex">
                          <FiHeart size={12} />
                          Move to wishlist
                        </button>

                        {/* BOTTOM */}

                        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-end sm:justify-between">

                          {/* QUANTITY */}

                          <div>
                            <p className="mb-1.5 text-[8px] font-bold uppercase tracking-[1px] text-[#98A2B3]">
                              Quantity
                            </p>

                            <div className="flex h-9 w-[108px] items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-1 sm:h-10 sm:w-[116px]">

                              <button
                                onClick={()=>discreasePeoductQuantity(item)}
                                disabled={item.quantity <= 1}
                                className="flex h-7 w-7 items-center justify-center rounded-md text-[#475467] transition hover:bg-[#F2F4F7] disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                <FiMinus size={11} />
                              </button>

                              <span className="text-xs font-bold text-[#101828]">
                                {item.quantity}
                              </span>

                              <button
                                onClick={()=>increaseProductQuantity(item)}
                                className="flex h-7 w-7 items-center justify-center rounded-md text-[#475467] transition hover:bg-[#F2F4F7]"
                              >
                                <FiPlus size={11} />
                              </button>
                            </div>
                          </div>

                          {/* PRICE */}

                          <div className="sm:text-right">
                            <div className="flex items-center gap-2 sm:justify-end">
                              <span className="text-base font-black text-[#101828] sm:text-lg">
                                {formatPrice(
                                  item.price * item.quantity
                                )}
                              </span>

                              {item.oldPrice > item.price && (
                                <span className="text-[10px] text-[#98A2B3] line-through">
                                  {formatPrice(
                                    item.oldPrice * item.quantity
                                  )}
                                </span>
                              )}
                            </div>

                            <p className="mt-0.5 text-[9px] text-[#98A2B3]">
                              {formatPrice(item.price)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* MOBILE WISHLIST */}

                    <button className="mt-4 flex items-center gap-1.5 border-t border-[#F2F4F7] pt-3 text-[9px] font-bold text-[#98A2B3] sm:hidden">
                      <FiHeart size={12} />
                      Move to wishlist
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY */}

          <div className="h-fit xl:sticky xl:top-6">
            <div className="overflow-hidden rounded-[28px] border border-[#e7e7e4] bg-white shadow-[0_18px_55px_rgba(16,24,40,0.08)]">

              {/* SUMMARY TOP */}

              <div className="relative overflow-hidden bg-[#101828] px-5 py-6 text-white sm:px-6">
                <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />

                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[2.5px] text-orange-400">
                      ORDER SUMMARY
                    </p>

                    <h2 className="mt-1 text-xl font-black sm:text-2xl">
                      Almost yours.
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    <FiShoppingBag size={18} />
                  </div>
                </div>
              </div>

              {/* SUMMARY BODY */}

              <div className="p-5 sm:p-6">

                {/* PRICE BREAKDOWN */}

                <div className="space-y-3.5">

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#667085]">
                      Bag total
                    </span>

                    <span className="text-xs font-bold text-[#344054]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#667085]">
                      Product savings
                    </span>

                    <span className="text-xs font-bold text-[#039855]">
                      - {formatPrice(productDiscount)}
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#667085]">
                        Promo discount
                      </span>

                      <span className="text-xs font-bold text-[#039855]">
                        - {formatPrice(promoDiscount)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#667085]">
                      Delivery
                    </span>

                    <span
                      className={`text-xs font-bold ${
                        deliveryCharge === 0
                          ? "text-[#039855]"
                          : "text-[#344054]"
                      }`}
                    >
                      {deliveryCharge === 0
                        ? "FREE"
                        : formatPrice(deliveryCharge)}
                    </span>
                  </div>
                </div>

                {/* DIVIDER */}

                <div className="my-5 h-px bg-[#EAECF0]" />

                {/* PROMO */}

                <button
                  onClick={() => setShowPromo(!showPromo)}
                  className="flex w-full items-center justify-between rounded-xl bg-[#F8F8F6] px-3.5 py-3 text-left transition hover:bg-[#F2F2EF]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-orange-500 shadow-sm">
                      <FiTag size={14} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-[#101828]">
                        Have a promo code?
                      </p>

                      <p className="mt-0.5 text-[8px] text-[#98A2B3]">
                        Unlock extra savings
                      </p>
                    </div>
                  </div>

                  <FiChevronDown
                    size={14}
                    className={`text-[#98A2B3] transition ${
                      showPromo ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* PROMO INPUT */}

                {showPromo && (
                  <div className="mt-2.5">
                    <div className="flex h-11 overflow-hidden rounded-xl border border-[#D0D5DD] bg-white">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) =>
                          setPromoCode(e.target.value)
                        }
                        placeholder="Enter promo code"
                        className="min-w-0 flex-1 px-3 text-xs font-medium text-[#101828] outline-none placeholder:text-[#98A2B3]"
                      />

                      <button
                        onClick={applyPromo}
                        className="px-4 text-[10px] font-bold text-orange-500 transition hover:bg-orange-50"
                      >
                        Apply
                      </button>
                    </div>

                    {promoApplied ? (
                      <div className="mt-2 flex items-center gap-1.5 text-[9px] font-bold text-[#039855]">
                        <FiCheck size={11} />
                        NEXORA10 applied — 10% saved
                      </div>
                    ) : (
                      <p className="mt-2 text-[9px] text-[#98A2B3]">
                        Try{" "}
                        <span className="font-bold text-orange-500">
                          NEXORA10
                        </span>
                      </p>
                    )}
                  </div>
                )}

                {/* TOTAL BOX */}

                <div className="mt-5 rounded-2xl bg-[#F8F8F6] p-4 sm:p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[1.5px] text-[#98A2B3]">
                        Total
                      </p>

                      <p className="mt-1 text-2xl font-black tracking-[-0.5px] text-[#101828] sm:text-[28px]">
                        {formatPrice(total)}
                      </p>
                    </div>

                    <span className="mb-1 rounded-full bg-[#ECFDF3] px-2.5 py-1 text-[8px] font-bold text-[#039855]">
                      {formatPrice(
                        productDiscount + promoDiscount
                      )}{" "}
                      saved
                    </span>
                  </div>

                  <p className="mt-2 text-[8px] text-[#98A2B3]">
                    Taxes included in the displayed price
                  </p>
                </div>

                {/* CHECKOUT BUTTON */}

                <button
                  onClick={() =>
                    console.log("Proceed to Checkout")
                  }
                  className="group mt-4 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_28px_rgba(249,115,22,0.28)] transition duration-300 hover:bg-orange-600 hover:shadow-[0_14px_32px_rgba(249,115,22,0.35)]"
                >
                  Secure Checkout

                  <FiArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                {/* SECURITY */}

                <div className="mt-4 flex items-center justify-center gap-1.5 text-[8px] font-medium text-[#98A2B3]">
                  <FiLock size={10} />
                  Secure & encrypted checkout
                </div>

                {/* PAYMENT */}

                <div className="mt-5 border-t border-[#EAECF0] pt-4">
                  <p className="text-center text-[8px] font-bold uppercase tracking-[1.5px] text-[#98A2B3]">
                    Trusted payment methods
                  </p>

                  <div className="mt-3 flex justify-center gap-2">
                    <span className="flex h-7 items-center rounded-md border border-[#EAECF0] bg-white px-2.5 text-[7px] font-black text-[#475467]">
                      VISA
                    </span>

                    <span className="flex h-7 items-center rounded-md border border-[#EAECF0] bg-white px-2.5 text-[7px] font-black text-[#475467]">
                      MASTER
                    </span>

                    <span className="flex h-7 items-center rounded-md border border-[#EAECF0] bg-white px-2.5 text-[7px] font-black text-[#475467]">
                      UPI
                    </span>

                    <span className="flex h-7 items-center rounded-md border border-[#EAECF0] bg-white px-2.5 text-[7px] font-black text-[#475467]">
                      COD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TRUST CARDS */}

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[#e7e7e4] bg-white p-3.5 shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ECFDF3] text-[#039855]">
                  <FiShield size={14} />
                </div>

                <p className="mt-2 text-[10px] font-bold text-[#101828]">
                  Secure Payment
                </p>

                <p className="mt-0.5 text-[8px] leading-4 text-[#98A2B3]">
                  Your payment is protected.
                </p>
              </div>

              <div className="rounded-2xl border border-[#e7e7e4] bg-white p-3.5 shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                  <FiTruck size={14} />
                </div>

                <p className="mt-2 text-[10px] font-bold text-[#101828]">
                  Fast Delivery
                </p>

                <p className="mt-0.5 text-[8px] leading-4 text-[#98A2B3]">
                  Quick & reliable shipping.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM TRUST STRIP */}

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-[#e7e7e4] bg-white px-4 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <FiTruck size={17} />
            </div>

            <div>
              <p className="text-xs font-bold text-[#101828]">
                Free Delivery
              </p>

              <p className="mt-0.5 text-[9px] text-[#98A2B3]">
                On orders above ₹3,000
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#e7e7e4] bg-white px-4 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#039855]">
              <FiShield size={17} />
            </div>

            <div>
              <p className="text-xs font-bold text-[#101828]">
                Protected Checkout
              </p>

              <p className="mt-0.5 text-[9px] text-[#98A2B3]">
                Safe & encrypted payments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#e7e7e4] bg-white px-4 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF8FF] text-[#1570EF]">
              <FiCheck size={17} />
            </div>

            <div>
              <p className="text-xs font-bold text-[#101828]">
                Easy Returns
              </p>

              <p className="mt-0.5 text-[9px] text-[#98A2B3]">
                Simple return experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

