
import React from "react";
import {
  FiShoppingBag,
  FiArrowUpRight,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiMail,
  FiMapPin,
  FiPhone,
  FiArrowRight,
  FiCheck 
} from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white text-gray-600">
      {/* NEWSLETTER */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-orange-100 bg-[#fffaf5] px-5 py-7 sm:px-8 sm:py-8 lg:px-10">
          <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full border-[20px] border-orange-100/60" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <p className="text-[10px] font-bold uppercase tracking-[2px] text-orange-500">
                Stay in the loop
              </p>

              <h2 className="mt-2 text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                Get the latest updates
              </h2>

              <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:text-sm">
                Discover new arrivals, exclusive offers and
                shopping inspiration.
              </p>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                alert("Newsletter subscription feature abhi connect nahi hai.");
              }}
              className="relative flex w-full max-w-md items-center rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm focus-within:border-orange-400"
            >
              <FiMail
                size={17}
                className="ml-2 shrink-0 text-gray-400"
              />

              <input
                type="email"
                required
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-xs text-gray-800 outline-none placeholder:text-gray-400 sm:text-sm"
              />

              <button
                type="submit"
                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-600 sm:px-4"
              >
                Subscribe
                <FiArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-4 pb-7 sm:px-6 sm:pb-8 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-gray-100 pb-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">

          {/* BRAND */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <a
              href="/"
              className="inline-flex items-center gap-2.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm shadow-orange-200">
                <FiShoppingBag size={18} />
              </span>

              <span className="text-lg font-extrabold tracking-tight text-gray-900">
                NEXORA<span className="text-orange-500">.</span>
              </span>
            </a>

            <p className="mt-4 max-w-xs text-xs leading-6 text-gray-500 sm:text-sm">
              Thoughtfully selected products for your everyday
              lifestyle. Discover your next favourite, all in
              one place.
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
              >
                <FiInstagram size={16} />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
              >
                <FiFacebook size={16} />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
              >
                <FiTwitter size={16} />
              </a>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 sm:text-sm">
              Shop
            </h3>

            <ul className="mt-4 space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href="/"
                  className="transition hover:text-orange-500"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/user-header/productcategory/shoes"
                  className="transition hover:text-orange-500"
                >
                  Shoes
                </a>
              </li>
              <li>
                <a
                  href="/user-header/productcategory/clothing"
                  className="transition hover:text-orange-500"
                >
                  Clothing
                </a>
              </li>
              <li>
                <a
                  href="/user-header/productcategory/accessories"
                  className="transition hover:text-orange-500"
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 sm:text-sm">
              Customer Care
            </h3>

            <ul className="mt-4 space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href="/contact"
                  className="transition hover:text-orange-500"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="transition hover:text-orange-500"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="/returns"
                  className="transition hover:text-orange-500"
                >
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="transition hover:text-orange-500"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs font-bold text-gray-900 sm:text-sm">
              Get in Touch
            </h3>

            <div className="mt-4 space-y-3.5 text-xs leading-5 sm:text-sm">
              <div className="flex items-start gap-2.5">
                <FiMail
                  size={15}
                  className="mt-0.5 shrink-0 text-orange-500"
                />
                <a
                  href="mailto:support@nexora.com"
                  className="break-all transition hover:text-orange-500"
                >
                  support@nexora.com
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <FiPhone
                  size={15}
                  className="mt-0.5 shrink-0 text-orange-500"
                />
                <a
                  href="tel:+911234567890"
                  className="transition hover:text-orange-500"
                >
                  +91 12345 67890
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <FiMapPin
                  size={15}
                  className="mt-0.5 shrink-0 text-orange-500"
                />
                <p>
                  India
                  <span className="block text-gray-400">
                    Online shopping, made simple
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="grid grid-cols-1 gap-3 border-b border-gray-100 py-5 sm:grid-cols-3 sm:gap-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <FiShoppingBag size={16} />
            </span>
            <div>
              <p className="text-xs font-bold text-gray-800">
                Quality First
              </p>
              <p className="mt-0.5 text-[11px] text-gray-500">
                Carefully selected products
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <FiCheck size={16} />
            </span>
            <div>
              <p className="text-xs font-bold text-gray-800">
                Secure Shopping
              </p>
              <p className="mt-0.5 text-[11px] text-gray-500">
                A simple shopping experience
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <FiArrowUpRight size={16} />
            </span>
            <div>
              <p className="text-xs font-bold text-gray-800">
                Made for You
              </p>
              <p className="mt-0.5 text-[11px] text-gray-500">
                Find something you love
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] leading-5 text-gray-500">
            © {currentYear}{" "}
            <span className="font-bold text-gray-800">NEXORA</span>.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
            <a
              href="/privacy-policy"
              className="transition hover:text-orange-500"
            >
              Privacy Policy
            </a>

            <a
              href="/terms"
              className="transition hover:text-orange-500"
            >
              Terms & Conditions
            </a>

            <a
              href="/shipping"
              className="transition hover:text-orange-500"
            >
              Shipping Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
