
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

const InstagramLogo = () => {
  return (
    <div className="relative w-[76px] h-[76px] rounded-[22px] bg-gradient-to-tr from-[#ffd600] via-[#ff0069] to-[#7638fa] flex items-center justify-center">
      <div className="w-[58px] h-[58px] rounded-[17px] border-[5px] border-white relative">
        <div className="absolute w-[24px] h-[24px] rounded-full border-[5px] border-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute w-[8px] h-[8px] rounded-full bg-white right-[6px] top-[6px]" />
      </div>
    </div>
  );
};

const Register = () => {
  const { register, handleSubmit } = useAuth();

  const registerUserForm = (data) => {
  

    console.log(data)
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="min-h-screen flex">

        {/* ================= LEFT SIDE ================= */}
        <div className="hidden md:flex w-1/2 min-h-screen border-r border-gray-300">
          <div className="w-full flex flex-col pt-14">

            {/* Logo */}
            <div className="px-14">
              <InstagramLogo />
            </div>

            {/* Heading */}
            <div className="text-center mt-10 px-5">
              <h1 className="text-[38px] leading-[1.45] font-normal tracking-[-1px]">
                Share your everyday
              </h1>

              <h1 className="text-[38px] leading-[1.45] font-normal tracking-[-1px]">
                moments with{" "}
                <span className="bg-gradient-to-r from-[#ff7a00] via-[#ff0069] to-[#7638fa] text-transparent bg-clip-text">
                  friends
                </span>
                .
              </h1>
            </div>

            {/* Visual */}
            <div className="relative w-[350px] h-[280px] mx-auto mt-10">

              {/* Left Card */}
              <div className="absolute w-[135px] h-[210px] rounded-[16px] left-[45px] top-[30px] rotate-[-10deg] overflow-hidden shadow-lg bg-gradient-to-br from-orange-300 to-pink-500">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Photo</span>
                </div>
              </div>

              {/* Right Card */}
              <div className="absolute w-[135px] h-[210px] rounded-[16px] right-[45px] top-[30px] rotate-[10deg] overflow-hidden shadow-lg bg-gradient-to-br from-purple-400 to-blue-400">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Photo</span>
                </div>
              </div>

              {/* Center Card */}
              <div className="absolute w-[140px] h-[235px] rounded-[18px] left-1/2 -translate-x-1/2 top-[10px] overflow-hidden shadow-2xl bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Photo</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================= REGISTER SIDE ================= */}
        <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center">
          <div className="w-full max-w-[546px] px-6 sm:px-10 md:px-12 lg:px-14 py-10">

            {/* Heading */}
            <h2 className="text-[18px] font-semibold mb-2">
              Sign up for Instagram
            </h2>

            <p className="text-[14px] text-gray-500 mb-6">
              Sign up to see photos and videos from your friends.
            </p>

            {/* Register Form */}
            <form onSubmit={handleSubmit(registerUserForm)}>

              {/* Email */}
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="email"
                className="w-full h-[60px] px-4 border border-gray-300 rounded-[17px] text-[16px] outline-none placeholder:text-gray-500 focus:border-gray-500 mb-3"
              />

              {/* Full Name */}
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Full name"
                className="w-full h-[60px] px-4 border border-gray-300 rounded-[17px] text-[16px] outline-none placeholder:text-gray-500 focus:border-gray-500 mb-3"
              />

              {/* Username */}
              <input
                {...register("username", { required: "Username is required" })}
                type="text"
                placeholder="Username"
                className="w-full h-[60px] px-4 border border-gray-300 rounded-[17px] text-[16px] outline-none placeholder:text-gray-500 focus:border-gray-500 mb-3"
              />

              {/* Number */}
              <input
                {...register("number", {
                  required: "Number is required",
                  minLength: {
                    value: 10,
                    message: "Number must be 10 digits"
                  },
                  maxLength: {
                    value: 10,
                    message: "Number must be 10 digits"
                  }
                })}
                type="tel"
                placeholder="Phone number"
                className="w-full h-[60px] px-4 border border-gray-300 rounded-[17px] text-[16px] outline-none placeholder:text-gray-500 focus:border-gray-500 mb-3"
              />

              {/* Password */}
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Password"
                className="w-full h-[60px] px-4 border border-gray-300 rounded-[17px] text-[16px] outline-none placeholder:text-gray-500 focus:border-gray-500"
              />

              {/* Info */}
              <p className="text-[12px] text-gray-500 text-center mt-5 leading-5">
                People who use our service may have uploaded your contact information to Instagram.
              </p>

              <p className="text-[12px] text-gray-500 text-center mt-4 leading-5">
                By signing up, you agree to our{" "}
                <span className="text-[#00376b]">Terms</span>,{" "}
                <span className="text-[#00376b]">Privacy Policy</span>{" "}
                and{" "}
                <span className="text-[#00376b]">Cookies Policy</span>.
              </p>

              {/* Sign Up */}
              <button
                type="submit"
                className="w-full h-[44px] mt-6 rounded-[22px] bg-blue-500 hover:bg-blue-600 cursor-pointer active-scale-95 text-white text-[16px] font-semibold transition"
              >
                Sign up
              </button>

              {/* Facebook */}
              <button
                type="button"
                className="w-full h-[44px] mt-4 rounded-[22px] bg-[#f2f3f5] flex items-center justify-center gap-2 text-[15px]"
              >
                <FaFacebook className="text-[#1877f2] text-[16px]" />
                Sign up with Facebook
              </button>

            </form>

            {/* Login */}
            <div className="text-center mt-7 text-[14px]">
              <span>Have an account?</span>

              <button
                type="button"
                className="ml-1 text-[#0095f6] font-semibold"
              >
                Log in
              </button>
            </div>

            {/* Meta */}
            <div className="flex justify-center items-center gap-1 mt-8">
              <span className="text-[#0095f6] text-[22px] font-bold">
                ∞
              </span>

              <span className="text-[16px] text-gray-700">
                Meta
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
