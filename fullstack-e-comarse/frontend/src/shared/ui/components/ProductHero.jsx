import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";

const products = [
  {
    id: 1,
    brand: "APPLE",
    title: "iPhone 16 Pro",
    description:
      "Powerful performance, premium titanium design and an advanced camera experience.",
    price: "₹1,19,999",
    oldPrice: "₹1,29,999",
    discount: "8% OFF",
    rating: "4.9",
    reviews: "342",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=90",
  },

  {
    id: 2,
    brand: "NIKE",
    title: "Air Max Sneakers",
    description:
      "Modern everyday sneakers designed with lightweight comfort and a stylish finish.",
    price: "₹2,499",
    oldPrice: "₹3,999",
    discount: "38% OFF",
    rating: "4.8",
    reviews: "126",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=90",
  },

  {
    id: 3,
    brand: "SAMSUNG",
    title: "Galaxy Watch Ultra",
    description:
      "Premium smartwatch with fitness tracking, smart features and a bold design.",
    price: "₹39,999",
    oldPrice: "₹49,999",
    discount: "20% OFF",
    rating: "4.7",
    reviews: "184",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=90",
  },

  {
    id: 4,
    brand: "SONY",
    title: "Wireless Headphones",
    description:
      "Immersive sound, comfortable fit and a premium wireless listening experience.",
    price: "₹8,499",
    oldPrice: "₹11,999",
    discount: "29% OFF",
    rating: "4.8",
    reviews: "276",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=90",
  },

  {
    id: 5,
    brand: "APPLE",
    title: "MacBook Air",
    description:
      "Thin, powerful and beautifully designed for work, creativity and everyday use.",
    price: "₹89,999",
    oldPrice: "₹99,999",
    discount: "10% OFF",
    rating: "4.9",
    reviews: "215",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=90",
  },

  {
    id: 6,
    brand: "NEXORA",
    title: "Premium Leather Bag",
    description:
      "A clean premium design made for everyday travel, work and casual style.",
    price: "₹2,999",
    oldPrice: "₹4,499",
    discount: "33% OFF",
    rating: "4.7",
    reviews: "91",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=90",
  },
];

const ProductHero = () => {
  const [current, setCurrent] = useState(0);

  const product = products[current];

  const nextSlide = () => {
    setCurrent((prev) => {
      if (prev === products.length - 1) {
        return 0;
      }

      return prev + 1;
    });
  };

  const previousSlide = () => {
    setCurrent((prev) => {
      if (prev === 0) {
        return products.length - 1;
      }

      return prev - 1;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => {
        if (prev === products.length - 1) {
          return 0;
        }

        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full px-2 py-3 sm:px-4 lg:px-5">
      <div
        className="
          relative mx-auto
          w-full max-w-[1500px]
          overflow-hidden
          rounded-[26px]
          bg-[#101827]
          shadow-2xl

          h-[700px]

          sm:h-[600px]

          lg:h-[520px]
        "
      >
        {/* ================= BACKGROUND ================= */}

        <div className="absolute inset-0 bg-[#101827]" />

        {/* GRID */}

        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        {/* ORANGE GLOW */}

        <div
          className="
            absolute
            right-[10%]
            top-[20%]
            h-52
            w-52
            rounded-full
            bg-orange-500/20
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-100px]
            left-[35%]
            h-72
            w-72
            rounded-full
            bg-orange-500/10
            blur-3xl
          "
        />

        {/* ================= BRAND ================= */}

        <div
          className="
            absolute
            left-5
            top-5
            z-50

            sm:left-8
            sm:top-7

            lg:left-10
            lg:top-8
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-orange-500
                bg-[#111b2d]
                shadow-lg
                shadow-orange-500/10

                sm:h-11
                sm:w-11
              "
            >
              <span className="text-lg font-bold text-orange-500 sm:text-xl">
                N
              </span>
            </div>

            <div>
              <h2
                className="
                  text-base
                  font-black
                  tracking-[0.17em]
                  text-white

                  sm:text-lg
                "
              >
                NEXORA
              </h2>

              <p className="mt-0.5 text-[7px] tracking-[0.32em] text-blue-200/60 sm:text-[8px]">
                PREMIUM STORE
              </p>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* DESKTOP / TABLET CONTENT */}
        {/* ================================================= */}

        <div
          className="
            absolute
            left-0
            top-0
            z-30
            flex
            h-full
            w-full
            items-start

            pt-[105px]
            px-5

            sm:px-8
            sm:pt-[115px]

            lg:w-[52%]
            lg:px-0
            lg:pl-16
            lg:pt-0
            lg:items-center
          "
        >
          <div
            className="
              w-full
              max-w-[470px]

              sm:max-w-[480px]

              lg:max-w-[470px]
            "
          >
            {/* BADGE */}

            <div
              className="
                mb-3
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/5
                px-3
                py-1.5
                backdrop-blur-md

                sm:mb-4
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_#ff7a00]" />

              <span className="text-[9px] font-medium tracking-wide text-white/70 sm:text-[10px]">
                FEATURED COLLECTION
              </span>
            </div>

            {/* BRAND */}

            <p
              className="
                text-[10px]
                font-semibold
                tracking-[0.25em]
                text-orange-400

                sm:text-xs
              "
            >
              {product.brand}
            </p>

            {/* TITLE */}

            <h1
              className="
                mt-2
                max-w-[430px]
                text-[30px]
                font-bold
                leading-[1.1]
                tracking-tight
                text-white

                sm:mt-3
                sm:text-4xl

                lg:text-[43px]
              "
            >
              {product.title}
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-3
                max-w-[400px]
                text-xs
                leading-5
                text-blue-100/60

                sm:mt-4
                sm:text-sm
                sm:leading-6
              "
            >
              {product.description}
            </p>

            {/* RATING */}

            <div className="mt-4 flex items-center gap-3 sm:mt-5">
              <div className="flex items-center gap-1 rounded-md bg-white px-2.5 py-1.5">
                <FiStar
                  size={13}
                  className="fill-orange-500 text-orange-500"
                />

                <span className="text-xs font-bold text-[#101827]">
                  {product.rating}
                </span>
              </div>

              <span className="text-[10px] text-white/40 sm:text-xs">
                {product.reviews} reviews
              </span>
            </div>

            {/* PRICE */}

            <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-5 sm:gap-3">
              <span className="text-2xl font-bold text-white sm:text-3xl">
                {product.price}
              </span>

              <span className="text-xs text-white/30 line-through sm:text-sm">
                {product.oldPrice}
              </span>

              <span className="rounded-md bg-orange-500/15 px-2 py-1 text-[9px] font-bold text-orange-400 sm:text-[10px]">
                {product.discount}
              </span>
            </div>

            {/* BUTTONS */}

            <div className="mt-5 flex items-center gap-3 sm:mt-6">
              <button
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-orange-500
                  px-4
                  py-2.5
                  text-xs
                  font-bold
                  text-white
                  shadow-lg
                  shadow-orange-500/20
                  transition
                  duration-300
                  hover:bg-orange-600

                  sm:px-5
                  sm:py-3
                  sm:text-sm
                "
              >
                <FiShoppingBag size={16} />

                Shop Now

                <FiArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </button>

              <button
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  text-white
                  backdrop-blur-md
                  transition
                  hover:border-orange-500/50
                  hover:bg-orange-500/10

                  sm:h-11
                  sm:w-11
                "
              >
                <FiHeart size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* PRODUCT IMAGE AREA */}
        {/* ================================================= */}

        <div
          className="
            absolute
            z-20

            bottom-[55px]
            left-1/2
            flex
            h-[245px]
            w-[94%]
            -translate-x-1/2
            items-center
            justify-center

            sm:bottom-[45px]
            sm:h-[300px]
            sm:w-[50%]

            lg:right-[3%]
            lg:bottom-auto
            lg:left-auto
            lg:top-1/2
            lg:h-[390px]
            lg:w-[45%]
            lg:-translate-y-1/2
            lg:translate-x-0
          "
        >
          {/* GLOW */}

          <div
            className="
              absolute
              h-[190px]
              w-[190px]
              rounded-full
              bg-orange-500/10
              blur-[65px]

              sm:h-[240px]
              sm:w-[240px]

              lg:h-[310px]
              lg:w-[310px]
            "
          />

          {/* GLASS PANEL */}

          <div
            className="
              absolute
              h-[215px]
              w-[290px]
              rounded-[30px]
              border
              border-white/10
              bg-white/[0.035]
              shadow-2xl

              sm:h-[275px]
              sm:w-[350px]

              lg:h-[350px]
              lg:w-[390px]
              lg:rounded-[40px]
            "
          />

          {/* INNER CIRCLE */}

          <div
            className="
              absolute
              h-[175px]
              w-[175px]
              rounded-full
              border
              border-white/[0.08]
              bg-gradient-to-br
              from-white/[0.07]
              to-transparent

              sm:h-[220px]
              sm:w-[220px]

              lg:h-[285px]
              lg:w-[285px]
            "
          />

          {/* ORANGE RING */}

          <div
            className="
              absolute
              h-[145px]
              w-[145px]
              rounded-full
              border
              border-orange-500/20

              sm:h-[190px]
              sm:w-[190px]

              lg:h-[250px]
              lg:w-[250px]
            "
          />

          {/* IMAGE */}

          <div
            className="
              relative
              z-20
              flex
              h-[220px]
              w-[280px]
              items-center
              justify-center

              sm:h-[270px]
              sm:w-[340px]

              lg:h-[340px]
              lg:w-[410px]
            "
          >
            <img
              key={product.id}
              src={product.image}
              alt={product.title}
              className="
                h-[165px]
                w-[220px]
                object-contain
                drop-shadow-[0_25px_30px_rgba(0,0,0,0.6)]
                transition-all
                duration-700
                ease-out

                sm:h-[220px]
                sm:w-[290px]

                lg:h-[270px]
                lg:w-[350px]
              "
            />
          </div>

          {/* SALE BADGE */}

          <div
            className="
              absolute
              right-2
              top-2
              z-40
              flex
              h-12
              w-12
              rotate-6
              items-center
              justify-center
              rounded-full
              border
              border-orange-400/30
              bg-orange-500
              text-center
              shadow-xl
              shadow-orange-500/20

              sm:right-4
              sm:top-4
              sm:h-14
              sm:w-14
            "
          >
            <div>
              <p className="text-[7px] font-medium text-white/80 sm:text-[8px]">
                SAVE
              </p>

              <p className="text-[10px] font-black text-white sm:text-xs">
                {product.discount}
              </p>
            </div>
          </div>

          {/* PRODUCT LABEL */}

          <div
            className="
              absolute
              bottom-0
              left-1/2
              z-40
              -translate-x-1/2
              rounded-full
              border
              border-white/10
              bg-[#101827]/90
              px-3
              py-1.5
              backdrop-blur-md

              sm:px-4
              sm:py-2
            "
          >
            <p className="whitespace-nowrap text-[7px] font-medium tracking-[0.15em] text-white/60 sm:text-[9px]">
              PREMIUM COLLECTION
            </p>
          </div>
        </div>

        {/* ================================================= */}
        {/* STARTING PRICE */}
        {/* ================================================= */}

        <div
          className="
            absolute
            right-6
            top-7
            z-50
            hidden
            rounded-2xl
            border
            border-white/10
            bg-white/[0.05]
            px-4
            py-3
            backdrop-blur-md

            lg:block
          "
        >
          <p className="text-[9px] tracking-[0.2em] text-white/35">
            STARTING FROM
          </p>

          <p className="mt-1 text-lg font-bold text-white">
            {product.price}
          </p>
        </div>

        {/* ================================================= */}
        {/* SLIDER DOTS */}
        {/* ================================================= */}

        <div
          className="
            absolute
            bottom-5
            left-5
            z-50
            flex
            items-center
            gap-1.5

            sm:bottom-6
            sm:left-8
            sm:gap-2

            lg:bottom-7
            lg:left-16
          "
        >
          {products.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrent(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-8 bg-orange-500"
                  : "w-2 bg-white/25"
              }`}
            />
          ))}
        </div>

        {/* ================================================= */}
        {/* ARROWS */}
        {/* ================================================= */}

        <div
          className="
            absolute
            bottom-4
            right-20
            z-50
            flex
            gap-2

            sm:right-28
            sm:bottom-5

            lg:right-32
          "
        >
          <button
            onClick={previousSlide}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              text-white
              backdrop-blur-md
              transition
              hover:border-orange-500
              hover:bg-orange-500

              sm:h-10
              sm:w-10
            "
          >
            <FiChevronLeft size={18} />
          </button>

          <button
            onClick={nextSlide}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              text-white
              backdrop-blur-md
              transition
              hover:border-orange-500
              hover:bg-orange-500

              sm:h-10
              sm:w-10
            "
          >
            <FiChevronRight size={18} />
          </button>
        </div>

        {/* ================================================= */}
        {/* SLIDE NUMBER */}
        {/* ================================================= */}

        <div
          className="
            absolute
            bottom-5
            right-5
            z-50
            text-[10px]
            text-white/30

            sm:bottom-7
            sm:right-8
            sm:text-xs

            lg:right-10
          "
        >
          <span className="text-orange-500">
            0{current + 1}
          </span>

          <span className="mx-1">/</span>

          0{products.length}
        </div>
      </div>
    </section>
  );
};

export default ProductHero;