
import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiBluetooth,
  FiBatteryCharging,
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiShoppingBag,
  FiActivity,
  FiCloud,
} from "react-icons/fi";

const heroSlides = [
  {
    id: 1,
    badge: "PREMIUM AUDIO EXPERIENCE",
    brand: "Sony",
    title: "Wireless",
    accent: "Headphones",
    description:
      "Immerse yourself in pure sound. Designed for comfort, crafted for everyday life.",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1400&q=90",
    script: "Feel the\nDifference",
    featureOne: "Crystal Clear",
    featureOneSub: "Sound Quality",
    featureTwo: "Long Battery Life",
    featureTwoSub: "Up to 30 Hours",
    price: "₹6,999",
    oldPrice: "₹9,999",
  },
  {
    id: 2,
    badge: "NEXT LEVEL LISTENING",
    brand: "Studio",
    title: "Pure Sound",
    accent: "Everywhere",
    description:
      "Lose yourself in every beat with rich detail, soft cushions and all-day comfort.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=90",
    script: "Listen to\nYour World",
    featureOne: "Studio Sound",
    featureOneSub: "Rich & Balanced",
    featureTwo: "All-Day Comfort",
    featureTwoSub: "Soft Cushions",
    price: "₹5,499",
    oldPrice: "₹7,999",
  },
  {
    id: 3,
    badge: "DESIGNED FOR EVERYDAY",
    brand: "NEXORA",
    title: "Wireless",
    accent: "Freedom",
    description:
      "A clean premium design, effortless wireless connection and sound that moves with you.",
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1400&q=90",
    script: "Move with\nthe Music",
    featureOne: "Wireless Freedom",
    featureOneSub: "Easy Connection",
    featureTwo: "Premium Comfort",
    featureTwoSub: "Made for You",
    price: "₹4,999",
    oldPrice: "₹6,999",
  },
  {
    id: 4,
    badge: "LIMITED EDITION",
    brand: "Signature",
    title: "Immersive",
    accent: "Audio",
    description:
      "Bring your playlists to life with a thoughtfully designed everyday audio essential.",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1400&q=90",
    script: "Hear Every\nDetail",
    featureOne: "Clear Details",
    featureOneSub: "Balanced Audio",
    featureTwo: "Long Listening",
    featureTwoSub: "Built for Comfort",
    price: "₹7,499",
    oldPrice: "₹10,999",
  },
  {
    id: 5,
    badge: "CUSTOMER FAVOURITE",
    brand: "NEXORA SELECT",
    title: "Sound",
    accent: "Reimagined",
    description:
      "Your everyday soundtrack, upgraded with a modern silhouette and a comfortable fit.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=90",
    script: "Better Sound,\nBetter Days",
    featureOne: "Premium Audio",
    featureOneSub: "Made for Music",
    featureTwo: "Everyday Fit",
    featureTwoSub: "Light & Comfortable",
    price: "₹5,999",
    oldPrice: "₹8,499",
  },
];

const ProductHero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);

  const product = heroSlides[activeSlide];

  const goNext = () => {
    setActiveSlide((current) =>
      current === heroSlides.length - 1 ? 0 : current + 1
    );
    setIsFavourite(false);
  };

  const goPrevious = () => {
    setActiveSlide((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1
    );
    setIsFavourite(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlide((current) =>
        current === heroSlides.length - 1 ? 0 : current + 1
      );
      setIsFavourite(false);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="w-full overflow-hidden bg-white font-sans text-slate-900">
      <style>{`
        @keyframes nexoraProductFloat {
          0%, 100% {
            transform: translateY(0) rotate(-4deg);
          }
          50% {
            transform: translateY(-10px) rotate(-2deg);
          }
        }

        @keyframes nexoraContentEnter {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes nexoraOrbRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes nexoraGlowPulse {
          0%, 100% {
            opacity: .45;
            transform: scale(1);
          }
          50% {
            opacity: .8;
            transform: scale(1.06);
          }
        }

        @keyframes nexoraScriptFloat {
          0%, 100% {
            transform: rotate(-7deg) translateY(0);
          }
          50% {
            transform: rotate(-4deg) translateY(-4px);
          }
        }

        .nexora-product-float {
          animation: nexoraProductFloat 5s ease-in-out infinite;
        }

        .nexora-content-enter {
          animation: nexoraContentEnter .5s ease both;
        }

        .nexora-orb-rotate {
          animation: nexoraOrbRotate 32s linear infinite;
        }

        .nexora-glow-pulse {
          animation: nexoraGlowPulse 5s ease-in-out infinite;
        }

        .nexora-script-float {
          animation: nexoraScriptFloat 4s ease-in-out infinite;
        }

        .nexora-hero-image {
          transition: transform .5s ease;
        }

        .nexora-hero-image:hover {
          transform: scale(1.04) rotate(-2deg);
        }

        @media (prefers-reduced-motion: reduce) {
          .nexora-product-float,
          .nexora-content-enter,
          .nexora-orb-rotate,
          .nexora-glow-pulse,
          .nexora-script-float {
            animation: none !important;
          }

          .nexora-hero-image {
            transition: none;
          }
        }
      `}</style>

      {/* Hero Banner - Header Removed */}

      <div className="relative isolate min-h-[680px] overflow-hidden bg-gradient-to-r from-white via-[#fffefd] to-[#fff7ef] sm:min-h-[650px] lg:min-h-[570px] xl:min-h-[620px]">
        {/* Background Decorations */}

        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-10 top-0 h-[350px] w-[350px] rounded-full bg-orange-100/70 blur-[80px] sm:right-[8%] sm:h-[480px] sm:w-[480px]" />

          <div className="absolute right-[18%] top-[8%] h-[300px] w-[300px] rounded-full border-[35px] border-orange-100/40 sm:h-[400px] sm:w-[400px]" />

          <div className="absolute bottom-[3%] right-[18%] h-[180px] w-[300px] rounded-full bg-amber-100/60 blur-[60px]" />

          <div className="absolute bottom-0 left-[20%] h-40 w-72 rounded-full bg-orange-50 blur-[70px]" />
        </div>

        <div className="relative mx-auto flex min-h-[680px] max-w-[1440px] flex-col px-5 pb-24 pt-10 sm:min-h-[650px] sm:px-8 sm:pt-12 lg:min-h-[570px] lg:flex-row lg:items-center lg:px-12 lg:pb-16 lg:pt-8 xl:min-h-[620px] xl:px-16">
          {/* Left Content */}

          <div
            key={product.id}
            className="nexora-content-enter relative z-20 w-full lg:w-[47%] lg:pr-4 xl:w-[49%]"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50/90 px-3 py-1.5 text-[9px] font-semibold tracking-wide text-orange-600 shadow-sm sm:text-[10px]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100">
                <FiActivity size={12} />
              </span>

              {product.badge}
            </div>

            <h1 className="mt-5 text-[36px] font-extrabold leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-[44px] lg:text-[46px] xl:text-[56px]">
              <span className="block">{product.brand}</span>

              <span className="mt-1 block text-[28px] leading-tight tracking-[-0.035em] sm:text-[34px] lg:text-[35px] xl:text-[42px]">
                {product.title}{" "}
                <span className="text-orange-500">
                  {product.accent}
                </span>
              </span>
            </h1>

            <p className="mt-4 max-w-[390px] text-[12px] leading-6 text-slate-500 sm:text-[13px] sm:leading-6 lg:text-sm">
              {product.description}
            </p>

            {/* Features */}

            <div className="mt-6 grid max-w-[390px] grid-cols-4 gap-2 sm:gap-4">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500 ring-1 ring-orange-100 sm:h-12 sm:w-12">
                  <FiActivity size={19} />
                </div>
                <span className="mt-2 text-[9px] font-semibold leading-4 text-slate-700 sm:text-[10px]">
                  Hi-Res
                  <br />
                  Audio
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500 ring-1 ring-orange-100 sm:h-12 sm:w-12">
                  <FiBatteryCharging size={19} />
                </div>
                <span className="mt-2 text-[9px] font-semibold leading-4 text-slate-700 sm:text-[10px]">
                  Up to 30H
                  <br />
                  Battery
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500 ring-1 ring-orange-100 sm:h-12 sm:w-12">
                  <FiCloud size={19} />
                </div>
                <span className="mt-2 text-[9px] font-semibold leading-4 text-slate-700 sm:text-[10px]">
                  All-Day
                  <br />
                  Comfort
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500 ring-1 ring-orange-100 sm:h-12 sm:w-12">
                  <FiBluetooth size={19} />
                </div>
                <span className="mt-2 text-[9px] font-semibold leading-4 text-slate-700 sm:text-[10px]">
                  Bluetooth
                  <br />
                  5.3
                </span>
              </div>
            </div>

            {/* Buttons */}

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => {
                  document.getElementById("shop")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="group inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-[12px] font-bold text-white shadow-md shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 sm:px-6 sm:text-[13px]"
              >
                <FiShoppingBag size={16} />
                Shop Now
                <FiArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={() => setIsFavourite(!isFavourite)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-3 text-[12px] font-semibold transition sm:text-[13px] ${
                  isFavourite
                    ? "border-orange-200 bg-orange-50 text-orange-500"
                    : "border-slate-200 bg-white text-slate-700 hover:border-orange-200 hover:text-orange-500"
                }`}
              >
                <FiHeart
                  size={16}
                  className={isFavourite ? "fill-orange-200" : ""}
                />
                {isFavourite ? "Saved" : "Add to Wishlist"}
              </button>
            </div>

            {/* Customer Reviews */}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex -space-x-2">
                <img
                  className="h-7 w-7 rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                  alt="Customer"
                />

                <img
                  className="h-7 w-7 rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Customer"
                />

                <img
                  className="h-7 w-7 rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80"
                  alt="Customer"
                />

                <img
                  className="h-7 w-7 rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
                  alt="Customer"
                />
              </div>

              <div>
                <p className="text-[11px] font-semibold text-slate-900">
                  +10K Happy Customers
                </p>

                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-xs tracking-wider text-orange-500">
                    ★★★★★
                  </span>
                  <span className="text-[10px] text-slate-500">
                    4.8 (2.6K reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Image */}

          <div className="relative mt-5 flex h-[330px] w-full items-center justify-center sm:h-[370px] lg:absolute lg:inset-y-0 lg:right-[2%] lg:mt-0 lg:h-full lg:w-[55%] xl:right-[3%] xl:w-[54%]">
            <div className="nexora-glow-pulse absolute left-[18%] top-[12%] h-52 w-52 rounded-full bg-orange-200/60 blur-[65px] sm:h-72 sm:w-72 lg:h-80 lg:w-80" />

            <div className="absolute left-[17%] top-[8%] h-[240px] w-[240px] rounded-full bg-gradient-to-br from-orange-100/80 via-amber-50/70 to-white/20 sm:h-[330px] sm:w-[330px] lg:h-[400px] lg:w-[400px]" />

            <div className="nexora-orb-rotate absolute left-[18%] top-[13%] h-[230px] w-[230px] rounded-full border border-dashed border-orange-200/80 sm:h-[320px] sm:w-[320px] lg:h-[380px] lg:w-[380px]" />

            {/* Orbit */}

            <div className="absolute left-[6%] top-[39%] h-[100px] w-[270px] rotate-[-20deg] rounded-[50%] border-[4px] border-orange-500/90 sm:left-[9%] sm:h-[125px] sm:w-[370px] lg:h-[145px] lg:w-[440px]" />

            {/* Glowing Orbs */}

            <div className="absolute left-[16%] top-[27%] z-20 h-9 w-9 rounded-full bg-gradient-to-br from-yellow-200 via-orange-300 to-orange-500 shadow-lg shadow-orange-300/40 sm:h-12 sm:w-12" />

            <div className="absolute bottom-[19%] right-[15%] z-20 h-9 w-9 rounded-full bg-gradient-to-br from-yellow-100 via-orange-300 to-orange-500 shadow-lg shadow-orange-300/40 sm:h-12 sm:w-12" />

            {/* Main Product */}

            <div className="nexora-product-float relative z-20 flex h-[300px] w-full items-center justify-center sm:h-[360px] lg:h-[470px]">
              <img
                key={product.id}
                src={product.image}
                alt={`${product.brand} ${product.title} ${product.accent}`}
                className="nexora-hero-image h-[260px] w-[290px] object-contain drop-shadow-[0_25px_24px_rgba(65,42,25,0.20)] sm:h-[340px] sm:w-[380px] lg:h-[440px] lg:w-[500px]"
              />
            </div>

            {/* Product Script */}

            <div className="nexora-script-float absolute right-[3%] top-[3%] z-30 hidden sm:block lg:right-[2%] lg:top-[12%]">
              <p className="whitespace-pre-line font-serif text-[30px] font-bold italic leading-[.95] text-orange-500 sm:text-[34px] lg:text-[42px]">
                {product.script}
              </p>

              <div className="ml-2 mt-2 h-1 w-24 rotate-[-10deg] rounded-full bg-orange-500 sm:w-32" />
            </div>

            {/* Sound Card */}

            <div className="absolute right-0 top-[35%] z-30 flex w-[175px] items-center gap-2.5 rounded-xl border border-white/80 bg-white/90 p-3 shadow-[0_12px_35px_rgba(15,23,42,0.09)] backdrop-blur-lg sm:w-[205px] sm:p-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                <FiActivity size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold text-slate-900 sm:text-[11px]">
                  {product.featureOne}
                </p>
                <p className="mt-1 text-[9px] text-slate-500 sm:text-[10px]">
                  {product.featureOneSub}
                </p>
              </div>

              <FiArrowRight size={14} className="shrink-0 text-orange-500" />
            </div>

            {/* Battery Card */}

            <div className="absolute bottom-[10%] right-0 z-30 flex w-[175px] items-center gap-2.5 rounded-xl border border-white/80 bg-white/90 p-3 shadow-[0_12px_35px_rgba(15,23,42,0.09)] backdrop-blur-lg sm:bottom-[12%] sm:w-[205px] sm:p-3.5 lg:bottom-[20%]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                <FiBatteryCharging size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold text-slate-900 sm:text-[11px]">
                  {product.featureTwo}
                </p>
                <p className="mt-1 text-[9px] text-slate-500 sm:text-[10px]">
                  {product.featureTwoSub}
                </p>
              </div>

              <FiArrowRight size={14} className="shrink-0 text-orange-500" />
            </div>

            {/* Price Tag */}

            <div className="absolute bottom-[1%] left-[12%] z-30 hidden rounded-xl border border-white bg-white/90 px-3.5 py-2 shadow-lg backdrop-blur-md sm:block lg:bottom-[9%] lg:left-[8%]">
              <p className="text-[8px] font-semibold uppercase tracking-widest text-slate-400">
                Special Price
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="text-base font-extrabold text-slate-900">
                  {product.price}
                </span>
                <span className="text-[10px] text-slate-400 line-through">
                  {product.oldPrice}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Previous Slide */}

        <button
          type="button"
          onClick={goPrevious}
          aria-label="Previous product"
          className="absolute bottom-10 left-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-800 shadow-sm transition hover:border-orange-300 hover:text-orange-500 sm:bottom-8 sm:left-8 sm:h-10 sm:w-10 lg:bottom-7 lg:left-10"
        >
          <FiChevronLeft size={19} />
        </button>

        {/* Next Slide */}

        <button
          type="button"
          onClick={goNext}
          aria-label="Next product"
          className="absolute bottom-10 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-800 shadow-sm transition hover:border-orange-300 hover:text-orange-500 sm:bottom-8 sm:right-8 sm:h-10 sm:w-10 lg:bottom-7 lg:right-10"
        >
          <FiChevronRight size={19} />
        </button>

        {/* Slider Dots */}

        <div className="absolute bottom-[22px] left-1/2 z-40 flex -translate-x-1/2 items-center gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Show product ${index + 1}`}
              onClick={() => {
                setActiveSlide(index);
                setIsFavourite(false);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "w-6 bg-orange-500"
                  : "w-2.5 bg-slate-300 hover:bg-orange-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
