import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const InstagramLogo = () => {
  return (
    <div
      className="
        relative
        w-[76px]
        h-[76px]
        rounded-[22px]
        bg-gradient-to-tr
        from-[#ffd600]
        via-[#ff0069]
        to-[#7638fa]
        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          w-[58px]
          h-[58px]
          rounded-[17px]
          border-[5px]
          border-white
          relative
        "
      >
        <div
          className="
            absolute
            w-[24px]
            h-[24px]
            rounded-full
            border-[5px]
            border-white
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
          "
        />

        <div
          className="
            absolute
            w-[8px]
            h-[8px]
            rounded-full
            bg-white
            right-[6px]
            top-[6px]
          "
        />
      </div>
    </div>
  );
};

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = localStorage.getItem("authenticatedUser");

      if (user) {
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <InstagramLogo />

      <p className="mt-6 text-[15px] text-gray-500">
        from Meta
      </p>
    </div>
  );
};

export default Splash;