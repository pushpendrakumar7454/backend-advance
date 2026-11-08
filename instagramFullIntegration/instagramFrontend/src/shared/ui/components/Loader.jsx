import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete,
    });

    tl.to(logoRef.current, {
      scale: 1.1,
      duration: 1.5,
      ease: "power2.out",
    })
      .to(logoRef.current, {
        scale: 1,
        duration: 1,
        ease: "power2.inOut",
      })
      .to(loaderRef.current, {
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
    >
      <div ref={logoRef}>
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
      </div>
    </div>
  );
};

export default Loader;