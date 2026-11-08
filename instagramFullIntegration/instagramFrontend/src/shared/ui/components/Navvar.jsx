import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import {
  Home,
  Search,
  Compass,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
  Menu,
} from "lucide-react";

const Navvar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Home",
      icon: Home,
      path: "/",
    },
    {
      name: "Search",
      icon: Search,
    },
    {
      name: "Explore",
      icon: Compass,
    },
    {
      name: "Reels",
      icon: Film,
      path:"/reels"
    },
    {
      name: "Messages",
      icon: MessageCircle,
    },
    {
      name: "Notifications",
      icon: Heart,
    },
    {
      name: "Create",
      icon: PlusSquare,
      path:"/post-form"
    },
    {
      name: "Profile",
      icon: User,
      path:"/profile"
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ================= DESKTOP NAVBAR ================= */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[250px] border-r border-gray-200 bg-white px-4 py-7 lg:block">

        {/* LOGO */}
        <div className="mb-10 px-4">

          <h1 className="font-serif text-[29px] font-bold tracking-tight">
            Instagram
          </h1>

        </div>


        {/* MENU */}
        <nav className="space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = item.path === location.pathname;

            return (
              <button
                key={item.name}
                onClick={() => item.path && navigate(item.path)}
                className={`group flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all duration-200
                  ${
                    active
                      ? "bg-gray-100 font-semibold"
                      : "font-normal hover:bg-gray-100"
                  }
                `}
              >

                <Icon
                  size={25}
                  strokeWidth={active ? 2.5 : 1.8}
                  className={`transition-transform duration-200 group-hover:scale-105 ${
                    active ? "text-black" : "text-gray-800"
                  }`}
                />

                <span className="text-[15px]">
                  {item.name}
                </span>

              </button>
            );
          })}

        </nav>


        {/* MORE */}
        <div className="absolute bottom-6 left-4 right-4">

          <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 transition hover:bg-gray-100">

            <Menu
              size={25}
              strokeWidth={1.8}
            />

            <span className="text-[15px]">
              More
            </span>

          </button>

        </div>

      </aside>


      {/* ================= MOBILE TOP NAVBAR ================= */}
      <header className="sticky top-0 z-40 flex h-[60px] items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">

        {/* LOGO */}
        <h1 className="font-serif text-[25px] font-bold">
          Instagram
        </h1>


        {/* RIGHT ICONS */}
        <div className="flex items-center gap-5">

          <button className="transition active:scale-90">
            <Heart
              size={25}
              strokeWidth={2}
            />
          </button>

          <button className="transition active:scale-90">
            <MessageCircle
              size={25}
              strokeWidth={2}
            />
          </button>

        </div>

      </header>


      {/* ================= CONTENT ================= */}
      <main className="lg:ml-[250px]">

        <Outlet />

      </main>


      {/* ================= MOBILE BOTTOM NAVBAR ================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-[58px] items-center justify-around border-t border-gray-200 bg-white lg:hidden">

        <button
          onClick={() => navigate("/")}
          className="flex h-10 w-10 items-center justify-center rounded-full active:bg-gray-100"
        >
          <Home
            size={25}
            strokeWidth={location.pathname === "/" ? 2.7 : 1.8}
          />
        </button>


        <button className="flex h-10 w-10 items-center justify-center rounded-full active:bg-gray-100">
          <Search
            size={25}
            strokeWidth={1.8}
          />
        </button>


        <button className="flex h-10 w-10 items-center justify-center rounded-full active:bg-gray-100">
          <PlusSquare
          onClick={()=>navigate("/post-form")}
            size={25}
            strokeWidth={1.8}
          />
        </button>


        <button className="flex h-10 w-10 items-center justify-center rounded-full active:bg-gray-100">
          <Film
            size={25}
            strokeWidth={1.8}
          />
        </button>


        <button className="flex h-10 w-10 items-center justify-center rounded-full active:bg-gray-100">
          <User
            size={25}
            strokeWidth={1.8}
          />
        </button>

      </nav>

    </div>
  );
};

export default Navvar;