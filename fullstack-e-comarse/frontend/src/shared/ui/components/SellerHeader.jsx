import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiPlusCircle,
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
  FiBell,
} from "react-icons/fi";
import { logOutUser } from "../../../features/auth/api/useApi";
import {
  addUser,
  setAccessToken,
} from "../../../features/auth/state/authSlice";

const SellerHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);

  const userName = users?.name || "Seller";

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "bg-orange-50 text-orange-500"
        : "text-slate-600 hover:bg-slate-50 hover:text-orange-500"
    }`;

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
      {/* ================= TOP BAR ================= */}

      <div className="bg-[#101828] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 flex items-center justify-between">
            <p className="text-[11px] sm:text-xs tracking-wide">
              NEXORA Seller Center
            </p>

            <p className="hidden sm:block text-[11px] text-slate-300">
              Manage your store professionally
            </p>
          </div>
        </div>
      </div>

      {/* ================= MAIN HEADER ================= */}

      <div className="bg-white/95 backdrop-blur-xl border-b border-[#eaecf0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[76px] flex items-center justify-between gap-5">
            {/* ================= LOGO ================= */}

            <NavLink to="/seller" className="flex items-center gap-3 shrink-0">
              <div className="w-11 h-11 rounded-xl bg-[#101828] flex items-center justify-center shadow-lg shadow-slate-900/10">
                <span className="text-xl font-black text-orange-400">N</span>
              </div>

              <div className="hidden sm:block">
                <h1 className="text-lg font-black tracking-[0.16em] text-[#101828] leading-none">
                  NEXORA
                </h1>

                <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 mt-1.5">
                  Seller Center
                </p>
              </div>
            </NavLink>

            {/* ================= DESKTOP NAV ================= */}

            <nav className="hidden lg:flex items-center gap-1">
              <NavLink to="/seller" className={navLinkStyle}>
                <FiGrid size={17} />
                Dashboard
              </NavLink>

              <NavLink to="/seller/products" className={navLinkStyle}>
                <FiPackage size={17} />
                Products
              </NavLink>

              <NavLink to="/seller/orders" className={navLinkStyle}>
                <FiShoppingBag size={17} />
                Orders
              </NavLink>

              <NavLink to="/seller/add-product" className={navLinkStyle}>
                <FiPlusCircle size={17} />
                Add Product
              </NavLink>
            </nav>

            {/* ================= RIGHT ACTIONS ================= */}

            <div className="flex items-center gap-2">
              {/* NOTIFICATION */}

              <button
                type="button"
                className="hidden sm:flex relative w-10 h-10 rounded-xl items-center justify-center text-slate-600 hover:bg-orange-50 hover:text-orange-500 transition">
                <FiBell size={19} />

                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] flex items-center justify-center font-bold">
                  0
                </span>
              </button>

              {/* PROFILE */}

              <button
                type="button"
                onClick={() => navigate("/seller/profile")}
                className="hidden sm:flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-slate-50 transition">
                <div className="w-9 h-9 rounded-xl bg-[#101828] flex items-center justify-center text-white">
                  <FiUser size={17} />
                </div>

                <div className="hidden xl:block text-left leading-tight">
                  <p className="text-[9px] uppercase tracking-wider text-slate-400">
                    Seller
                  </p>

                  <p className="text-sm font-bold text-[#101828] max-w-[100px] truncate">
                    {userName}
                  </p>
                </div>
              </button>

              {/* LOGOUT */}

              <button
                type="button"
                onClick={handleLogout}
                title="Logout"
                className="hidden sm:flex w-10 h-10 rounded-xl items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition">
                <FiLogOut size={18} />
              </button>

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
            {/* SELLER INFO */}

            <div className="p-4 mb-3 rounded-2xl bg-[#101828]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-400 flex items-center justify-center text-[#101828]">
                  <FiUser size={18} />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">
                    Seller Account
                  </p>

                  <p className="text-sm font-bold text-white">{userName}</p>
                </div>
              </div>
            </div>

            {/* DASHBOARD */}

            <NavLink
              to="/seller"
              onClick={() => setMenuOpen(false)}
              className={navLinkStyle}>
              <FiGrid size={18} />
              Dashboard
            </NavLink>

            {/* PRODUCTS */}

            <NavLink
              to="/seller/products"
              onClick={() => setMenuOpen(false)}
              className={navLinkStyle}>
              <FiPackage size={18} />
              Products
            </NavLink>

            {/* ORDERS */}

            <NavLink
              to="/seller/orders"
              onClick={() => setMenuOpen(false)}
              className={navLinkStyle}>
              <FiShoppingBag size={18} />
              Orders
            </NavLink>

            {/* ADD PRODUCT */}

            <NavLink
              to="/seller/add-product"
              onClick={() => setMenuOpen(false)}
              className={navLinkStyle}>
              <FiPlusCircle size={18} />
              Add Product
            </NavLink>

            {/* PROFILE */}

            <button
              onClick={() => {
                navigate("/seller/profile");
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-orange-500 transition">
              <FiUser size={18} />
              Profile
            </button>

            {/* LOGOUT */}

            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition">
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default SellerHeader;
