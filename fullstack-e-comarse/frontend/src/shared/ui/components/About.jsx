
import React from "react";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiHeart,
  FiShoppingBag,
  FiShield,
  FiTruck,
  FiCheckCircle,
  FiStar,
  FiTarget,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { useNavigate } from "react-router";

export default function About() {
  const navigate = useNavigate();

  const values = [
    {
      icon: <FiHeart size={20} />,
      title: "Customer First",
      description:
        "Every decision starts with you. We focus on making your shopping experience simple and enjoyable.",
    },
    {
      icon: <FiStar size={20} />,
      title: "Quality Matters",
      description:
        "We believe everyday products should offer a balance of style, quality and value.",
    },
    {
      icon: <FiShield size={20} />,
      title: "Shop With Confidence",
      description:
        "We aim to make every step of your shopping journey clear, convenient and reliable.",
    },
    {
      icon: <FiZap size={20} />,
      title: "Always Evolving",
      description:
        "We keep exploring fresh ideas, new styles and better ways to serve our customers.",
    },
  ];

  const features = [
    {
      icon: <FiShoppingBag size={19} />,
      title: "Curated Collections",
      text: "Products picked with everyday needs in mind.",
    },
    {
      icon: <FiTruck size={19} />,
      title: "Convenient Shopping",
      text: "Browse your favourites from wherever you are.",
    },
    {
      icon: <FiCheckCircle size={19} />,
      title: "Simple Experience",
      text: "A clean, easy-to-use shopping experience.",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-white text-gray-800">
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:grid-cols-2 lg:gap-14 lg:px-8">
          {/* LEFT CONTENT */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3.5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              <span className="text-[10px] font-bold uppercase tracking-[2px] text-orange-600">
                Get to know us
              </span>
            </div>

            <h1 className="mt-5 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Shopping that feels
              <span className="block text-orange-500">
                a little more personal.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
              Welcome to NEXORA, a place to discover products
              that fit your lifestyle. We bring together style,
              convenience and a thoughtful shopping experience
              to make finding your next favourite easier.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-600 sm:text-sm"
              >
                Explore Collection
                <FiArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-xs font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-600 sm:text-sm"
              >
                Contact Us
                <FiArrowUpRight size={15} />
              </button>
            </div>

            {/* SMALL HIGHLIGHTS */}
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-gray-100 pt-5">
              <div className="flex items-center gap-2">
                <FiCheckCircle
                  size={16}
                  className="text-orange-500"
                />
                <span className="text-xs font-medium text-gray-600">
                  Thoughtful selection
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FiCheckCircle
                  size={16}
                  className="text-orange-500"
                />
                <span className="text-xs font-medium text-gray-600">
                  Customer-focused
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -right-3 -top-4 h-24 w-24 rounded-full border border-orange-200 sm:-right-5 sm:-top-5 sm:h-32 sm:w-32" />

            <div className="absolute -bottom-4 -left-3 h-24 w-24 rounded-full bg-orange-100/70 sm:-bottom-5 sm:-left-5 sm:h-32 sm:w-32" />

            <div className="relative overflow-hidden rounded-[28px] border border-gray-100 bg-[#f7f5f0] p-5 sm:rounded-[32px] sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[2px] text-orange-500">
                    The NEXORA approach
                  </p>
                  <p className="mt-1 text-sm font-bold text-gray-900">
                    Made for everyday life
                  </p>
                </div>

                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                  <FiShoppingBag size={19} />
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="flex min-h-44 flex-col justify-between rounded-2xl bg-[#f0dfcd] p-4 sm:min-h-52 sm:p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-orange-600">
                    <FiHeart size={17} />
                  </span>

                  <div>
                    <p className="text-lg font-extrabold text-gray-900 sm:text-xl">
                      Your Style
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-gray-600">
                      Find what feels right for you.
                    </p>
                  </div>
                </div>

                <div className="flex min-h-44 flex-col justify-between rounded-2xl bg-white p-4 shadow-sm sm:min-h-52 sm:p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                    <FiStar size={17} />
                  </div>

                  <div>
                    <p className="text-lg font-extrabold text-gray-900 sm:text-xl">
                      Better Finds
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-gray-500">
                      Thoughtful picks for every day.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white bg-white/80 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
                  <FiTarget size={19} />
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-900">
                    Our goal is simple
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-gray-500">
                    Make discovering great products easier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="border-y border-gray-100 bg-[#fffaf5]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 py-7 sm:px-6 md:grid-cols-3 md:gap-7 lg:px-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-100 bg-white text-orange-500">
                {feature.icon}
              </span>

              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-orange-500">
              Our Story
            </p>

            <h2 className="mt-3 max-w-lg text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              More than products.
              <span className="block text-orange-500">
                A better way to shop.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-500">
              At NEXORA, we believe online shopping should feel
              straightforward, inspiring and convenient. Finding
              something useful or discovering a style you love
              should not have to be complicated.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-500">
              That is why we are building a shopping destination
              where you can explore different categories, compare
              your options and choose products that suit your
              needs. Our focus is on creating a better experience
              with every visit.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-orange-600 transition hover:gap-3 sm:text-sm"
            >
              Discover our collection
              <FiArrowRight size={16} />
            </button>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-[#f8f7f3] p-5 sm:p-7">
            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                <FiUsers size={21} />
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-gray-900 sm:text-xl">
                Built around your needs
              </h3>

              <p className="mt-3 text-xs leading-6 text-gray-500 sm:text-sm sm:leading-7">
                From browsing to choosing your favourite items,
                we want every interaction to be easy to understand
                and enjoyable to use.
              </p>

              <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
                {[
                  "Easy product discovery",
                  "Clear product information",
                  "A smooth browsing experience",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5"
                  >
                    <FiCheckCircle
                      size={16}
                      className="shrink-0 text-orange-500"
                    />
                    <span className="text-xs font-medium text-gray-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="bg-[#f8f8f5]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-orange-500">
              What We Believe
            </p>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              The values behind our brand
            </h2>

            <p className="mt-3 text-xs leading-6 text-gray-500 sm:text-sm">
              The principles that guide the experience we want
              to create for every shopper.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
            {values.map((value, index) => (
              <article
                key={value.title}
                className="group rounded-2xl border border-gray-200/80 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/40 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                    {value.icon}
                  </span>

                  <span className="text-[10px] font-bold tracking-widest text-gray-300">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-sm font-bold text-gray-900">
                  {value.title}
                </h3>

                <p className="mt-2 text-xs leading-6 text-gray-500">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-orange-500 px-5 py-9 sm:px-9 sm:py-11 lg:px-12">
          <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full border-[30px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-20 right-36 h-40 w-40 rounded-full bg-white/10" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-[10px] font-bold uppercase tracking-[2px] text-orange-100">
                Your next favourite awaits
              </p>

              <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                Ready to discover something new?
              </h2>

              <p className="mt-3 text-xs leading-6 text-orange-50 sm:text-sm">
                Explore our collection and find products that
                fit your everyday style.
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-orange-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-50 sm:text-sm"
            >
              Start Exploring
              <FiArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
