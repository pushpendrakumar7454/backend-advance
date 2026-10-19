import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  FiSearch,
  FiShoppingBag,
  FiHeart,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";
import { logOutUser } from "../../../features/auth/api/useApi";
import {
  addUser,
  setAccessToken,
} from "../../../features/auth/state/authSlice";

const UserHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux se logged-in user
  const { users } = useSelector((state) => state.auth);

  const navLinkStyle = ({ isActive }) =>
    `relative text-sm font-semibold transition-all duration-300 ${
      isActive ? "text-orange-500" : "text-slate-600 hover:text-orange-500"
    }`;

  // User name
  const userName = users?.name || "User";


  // Logout
  const handleLogout = async () => {
    try {
      await logOutUser();
      dispatch(addUser(null));
      dispatch(setAccessToken(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* ================= TOP OFFER BAR ================= */}

      <div className="bg-[#101828] text-white text-center py-2 px-4">
        <p className="text-[11px] sm:text-xs tracking-wide">
          ✦ Free shipping on orders above ₹999
          <span className="hidden sm:inline">
            {" "}
            • Easy returns within 7 days
          </span>
        </p>
      </div>

      {/* ================= MAIN HEADER ================= */}

      <div className="bg-white/95 backdrop-blur-xl border-b border-[#eaecf0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[76px] flex items-center justify-between gap-5">
            {/* ================= LOGO ================= */}

            <NavLink to="/" className="flex items-center gap-3 shrink-0">
              <div className="w-11 h-11 rounded-xl bg-[#101828] flex items-center justify-center shadow-lg shadow-slate-900/10">
                <span className="text-xl font-black text-orange-400">N</span>
              </div>

              <div className="hidden sm:block">
                <h1 className="text-lg font-black tracking-[0.16em] text-[#101828] leading-none">
                  NEXORA
                </h1>

                <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 mt-1.5">
                  Premium Store
                </p>
              </div>
            </NavLink>

            {/* ================= DESKTOP NAV ================= */}

            <nav className="hidden lg:flex items-center gap-7">
              <NavLink to="/" className={navLinkStyle}>
                Home
              </NavLink>

              <NavLink to="/products" className={navLinkStyle}>
                Shop
              </NavLink>

              {/* CATEGORY */}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-orange-500 transition">
                  Categories
                  <FiChevronDown
                    className={`text-sm transition-transform ${
                      categoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {categoryOpen && (
                  <div className="absolute top-10 left-0 w-52 bg-white border border-[#eaecf0] rounded-2xl shadow-[0_20px_50px_rgba(16,24,40,0.12)] p-2">
                    <button
                      onClick={() => {
                        navigate("/products");
                        setCategoryOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-600 hover:bg-orange-50 hover:text-orange-500 transition">
                      All Products
                    </button>

                    <button
                      onClick={() => {
                        navigate("/products?category=men");
                        setCategoryOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-600 hover:bg-orange-50 hover:text-orange-500 transition">
                      Men's Collection
                    </button>

                    <button
                      onClick={() => {
                        navigate("/products?category=women");
                        setCategoryOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-600 hover:bg-orange-50 hover:text-orange-500 transition">
                      Women's Collection
                    </button>

                    <button
                      onClick={() => {
                        navigate("/products?category=electronics");
                        setCategoryOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-600 hover:bg-orange-50 hover:text-orange-500 transition">
                      Electronics
                    </button>
                  </div>
                )}
              </div>

              <NavLink to="/about" className={navLinkStyle}>
                About
              </NavLink>
            </nav>

            {/* ================= SEARCH ================= */}

            <div className="hidden md:flex flex-1 max-w-sm">
              <div className="relative w-full">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full h-11 pl-11 pr-4 rounded-xl bg-[#f8f9fa] border border-[#eaecf0] text-sm text-[#101828] placeholder:text-slate-400 outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition"
                />
              </div>
            </div>

            {/* ================= ACTIONS ================= */}

            <div className="flex items-center gap-1 sm:gap-2">
              {/* SEARCH MOBILE */}

              <button
                type="button"
                className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-orange-50 hover:text-orange-500 transition">
                <FiSearch size={19} />
              </button>

              {/* WISHLIST */}

              <button
                type="button"
                onClick={() => navigate("/wishlist")}
                className="hidden sm:flex relative w-10 h-10 rounded-xl items-center justify-center text-slate-600 hover:bg-orange-50 hover:text-orange-500 transition">
                <FiHeart size={19} />

                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] flex items-center justify-center font-bold">
                  0
                </span>
              </button>

              {/* CART */}

              <button
                type="button"
                onClick={() => navigate("/user-header/cart")}
                className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-orange-50 hover:text-orange-500 transition">
                <FiShoppingBag size={20} />

                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] flex items-center justify-center font-bold">
                  0
                </span>
              </button>

              {/* ================= PROFILE + NAME + LOGOUT ================= */}
              <div className="hidden sm:flex items-center gap-2 ml-1">
                <div className="hidden lg:block leading-tight">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                    Welcome
                  </p>
                  <p className="text-sm font-bold text-[#101828] max-w-[90px] truncate">
                    {userName}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  title="Logout"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition">
                  <FiLogOut size={18} />
                </button>
              </div>

              {/* MOBILE MENU */}

              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-slate-700 hover:bg-orange-50 hover:text-orange-500 transition">
                {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}

      {menuOpen && (
        <div className="lg:hidden bg-white border-b border-[#eaecf0] shadow-[0_15px_40px_rgba(16,24,40,0.08)]">
          <div className="max-w-7xl mx-auto px-4 py-5 space-y-2">
            {/* MOBILE SEARCH */}

            <div className="relative mb-4">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search products..."
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-[#f8f9fa] border border-[#eaecf0] text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition"
              />
            </div>

            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-semibold ${
                  isActive
                    ? "bg-orange-50 text-orange-500"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }>
              Home
            </NavLink>

            <NavLink
              to="/products"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-semibold ${
                  isActive
                    ? "bg-orange-50 text-orange-500"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }>
              Shop
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-semibold ${
                  isActive
                    ? "bg-orange-50 text-orange-500"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }>
              About
            </NavLink>

            {/* MOBILE USER NAME */}

            <div className="mt-3 p-4 rounded-2xl bg-slate-50 border border-[#eaecf0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#101828] flex items-center justify-center text-white">
                  <FiUser size={18} />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">
                    Welcome
                  </p>

                  <p className="text-sm font-bold text-[#101828]">{userName}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3">
              <button
                onClick={() => {
                  navigate("/wishlist");
                  setMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#eaecf0] text-sm font-semibold text-slate-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500 transition">
                <FiHeart />
                Wishlist
              </button>

              <button
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#101828] text-white text-sm font-semibold hover:bg-orange-500 transition">
                <FiUser />
                Profile
              </button>
            </div>

            {/* MOBILE LOGOUT */}

            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 mt-2 rounded-xl border border-red-100 bg-red-50 text-red-500 text-sm font-semibold hover:bg-red-100 transition">
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default UserHeader;
