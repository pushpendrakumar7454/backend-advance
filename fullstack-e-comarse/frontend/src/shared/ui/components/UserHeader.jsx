
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  FiShoppingBag,
  FiHeart,
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
  FiHeadphones,
  FiHome,
  FiGrid,
  FiPackage,
  FiInfo,
  FiArrowRight,
  FiChevronRight,
} from "react-icons/fi";

import { logOutUser } from "../../../features/auth/api/useApi";

import {
  addUser,
  setAccessToken,
} from "../../../features/auth/state/authSlice";

const UserHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.auth);

  const userName = users?.name || "User";

  const navLinkStyle = ({ isActive }) =>
    `relative flex items-center gap-2 text-[13px] font-semibold transition-all duration-300 group ${
      isActive
        ? "text-orange-500"
        : "text-slate-600 hover:text-orange-500"
    }`;

  const mobileLinkStyle = ({ isActive }) =>
    `flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "bg-orange-50 text-orange-600"
        : "text-slate-600 hover:bg-slate-50"
    }`;

  const handleLogout = async () => {
    try {
      await logOutUser();

      dispatch(addUser(null));
      dispatch(setAccessToken(null));

      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#101828] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="min-h-9 flex items-center justify-between gap-3">

            <p className="text-[10px] sm:text-xs tracking-wide text-slate-300">
              <span className="text-orange-400 font-bold">
                SPECIAL OFFER
              </span>

              <span className="mx-2 text-slate-600">|</span>

              Free shipping on orders above ₹999
            </p>

            <p className="hidden sm:block text-[11px] text-slate-400">
              Premium Shopping Experience
            </p>

          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="bg-white border-b border-slate-100 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-[76px] flex items-center justify-between gap-5">

            {/* LOGO SECTION */}
            <NavLink
              to="/"
              className="flex items-center gap-3 shrink-0 group"
            >

              <div className="relative w-11 h-11 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-slate-900/15  transition-all duration-300">

                <span className="text-2xl font-black text-white">
                  N
                </span>

                <span className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-orange-500 border-2 border-white group-hover:bg-[#101828] transition-all" />

              </div>

              <div>
                <h1 className="text-[19px] sm:text-xl font-black tracking-[0.16em] text-[#101828] leading-none">
                  NEXORA
                </h1>

                <p className="text-[9px] font-semibold tracking-[0.25em] uppercase text-slate-400 mt-1.5">
                  Premium Store
                </p>
              </div>

            </NavLink>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-8">

              <NavLink
                to="/user-header"
                end
                className={navLinkStyle}
              >
                <FiHome size={16} />
                Home

                <span className="absolute -bottom-[29px] left-0 w-full h-[2px] bg-orange-500 scale-x-0 group-[.active]:scale-x-100 transition-transform" />
              </NavLink>

              <NavLink
                to="/user-header/all-products"
                className={navLinkStyle}
              >
                <FiGrid size={16} />
                Shop
              </NavLink>

              <NavLink
                to="/user-header/order"
                className={navLinkStyle}
              >
                <FiPackage size={16} />
                My Orders
              </NavLink>

              <NavLink
                to="/user-header/about"
                className={navLinkStyle}
              >
                <FiInfo size={16} />
                About Us
              </NavLink>

            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-1 sm:gap-2">

              {/* WISHLIST */}
              {/* <button
                type="button"
                onClick={() => navigate("/wishlist")}
                aria-label="Wishlist"
                title="Wishlist"
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl text-slate-600 hover:text-orange-500 hover:bg-orange-50 transition-all duration-300 cursor-pointer active:scale-95"
              >
                <FiHeart size={20} />
              </button> */}

              {/* HELP */}
              <button
                type="button"
                onClick={() => navigate("/user-header/help-chat")}
                aria-label="Help and support"
                title="Help & Support"
                className="hidden md:flex w-10 h-10 sm:w-11 sm:h-11 items-center justify-center rounded-xl text-slate-600 hover:text-orange-500 hover:bg-orange-50 transition-all duration-300 cursor-pointer active:scale-95"
              >
                <FiHeadphones size={20} />
              </button>

              {/* CART */}
              <button
                type="button"
                onClick={() => navigate("/user-header/cart")}
                aria-label="Shopping cart"
                title="Shopping Cart"
                className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl text-slate-600 hover:text-orange-500 hover:bg-orange-50 transition-all duration-300 cursor-pointer active:scale-95"
              >
                <FiShoppingBag size={21} />
              </button>

              {/* DESKTOP PROFILE */}
              <div className="hidden sm:flex items-center gap-2 ml-2 pl-3 border-l border-slate-200">

                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  title="My Profile"
                  className="flex items-center gap-2.5 group cursor-pointer active:scale-95 transition-all"
                >

                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    <FiUser size={19} />
                  </div>

                  <div className="hidden xl:block text-left max-w-[100px]">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">
                      Welcome back
                    </p>

                    <p className="text-sm font-bold text-[#101828] capitalize truncate">
                      {userName}
                    </p>
                  </div>

                </button>

                {/* LOGOUT */}
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Logout"
                  aria-label="Logout"
                  className="hidden xl:flex w-9 h-9 items-center justify-center rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <FiLogOut size={18} />
                </button>

              </div>

              {/* MOBILE MENU BUTTON */}
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                className="lg:hidden ml-1 w-10 h-10 flex items-center justify-center rounded-xl bg-[#101828] text-white hover:bg-orange-500 transition-all duration-300 cursor-pointer active:scale-95"
              >
                {menuOpen ? (
                  <FiX size={21} />
                ) : (
                  <FiMenu size={21} />
                )}
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl shadow-slate-900/10">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">

            {/* MOBILE USER CARD */}
            <div className="relative overflow-hidden rounded-2xl bg-[#101828] p-4 mb-5">

              <div className="absolute -right-8 -top-10 w-32 h-32 rounded-full bg-orange-500/10" />

              <div className="absolute right-10 -bottom-14 w-28 h-28 rounded-full bg-orange-500/10" />

              <div className="relative flex items-center justify-between gap-3">

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-white">
                    <FiUser size={23} />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">
                      Welcome back
                    </p>

                    <h3 className="text-base font-bold text-white capitalize">
                      {userName}
                    </h3>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/profile");
                    closeMenu();
                  }}
                  className="flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-white transition cursor-pointer active:scale-95"
                >
                  Profile
                  <FiArrowRight size={14} />
                </button>

              </div>
            </div>

            {/* MOBILE NAVIGATION */}
            <div className="space-y-1.5">

              <NavLink
                to="/user-header"
                end
                onClick={closeMenu}
                className={mobileLinkStyle}
              >
                <span className="flex items-center gap-3">
                  <FiHome size={19} />
                  Home
                </span>

                <FiChevronRight size={17} />
              </NavLink>

              <NavLink
                to="/user-header/all-products"
                onClick={closeMenu}
                className={mobileLinkStyle}
              >
                <span className="flex items-center gap-3">
                  <FiGrid size={19} />
                  Shop Products
                </span>

                <FiChevronRight size={17} />
              </NavLink>

              <NavLink
                to="/user-header/order"
                onClick={closeMenu}
                className={mobileLinkStyle}
              >
                <span className="flex items-center gap-3">
                  <FiPackage size={19} />
                  My Orders
                </span>

                <FiChevronRight size={17} />
              </NavLink>

              <NavLink
                to="/user-header/about"
                onClick={closeMenu}
                className={mobileLinkStyle}
              >
                <span className="flex items-center gap-3">
                  <FiInfo size={19} />
                  About Us
                </span>

                <FiChevronRight size={17} />
              </NavLink>

            </div>

            {/* MOBILE QUICK ACTIONS */}
            {/* <div className="grid grid-cols-2 gap-3 mt-5">

              <button
                type="button"
                onClick={() => {
                  navigate("/wishlist");
                  closeMenu();
                }}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-orange-50 hover:text-orange-500 hover:border-orange-200 transition-all cursor-pointer active:scale-95"
              >
                <FiHeart size={18} />
                Wishlist
              </button>

              <button
                type="button"
                onClick={() => {
                  navigate("/user-header/help-chat");
                  closeMenu();
                }}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-orange-50 hover:text-orange-500 hover:border-orange-200 transition-all cursor-pointer active:scale-95"
              >
                <FiHeadphones size={18} />
                Help & Support
              </button>

            </div> */}

            {/* MOBILE LOGOUT */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-50 text-red-500 text-sm font-bold hover:bg-red-100 transition-all cursor-pointer active:scale-95"
            >
              <FiLogOut size={18} />
              Logout
            </button>

            {/* FOOTER */}
            <p className="text-center text-[10px] text-slate-400 mt-5 tracking-wider">
              NEXORA • PREMIUM SHOPPING EXPERIENCE
            </p>

          </div>
        </div>
      )}

    </header>
  );
};

export default UserHeader;
