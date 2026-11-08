
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { addUser } from "../../state/authUser";

const InstagramLogo = () => {
  return (
    <div className="relative w-[76px] h-[76px] rounded-[22px] bg-gradient-to-tr from-[#ffd600] via-[#ff0069] to-[#7638fa] flex items-center justify-center">
      
      {/* Outer white border */}
      <div className="w-[58px] h-[58px] rounded-[17px] border-[5px] border-white relative">
        
        {/* Camera Lens */}
        <div className="absolute w-[24px] h-[24px] rounded-full border-[5px] border-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/* Camera Dot */}
        <div className="absolute w-[8px] h-[8px] rounded-full bg-white right-[6px] top-[6px]" />
      </div>
    </div>
  );
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const loginUserForm = (data) => {
   
      console.log(data)
    
  };

  return (
    <div className="min-h-screen w-full bg-white">

      <div className="min-h-screen flex">

        {/* ================= LEFT SIDE ================= */}
        <div className="hidden md:flex w-1/2 min-h-screen border-r border-gray-300">

          <div className="w-full flex flex-col pt-14">

            {/* Instagram Loonsole.log("Login response:", response.data);

      // Redux me user save
      dispatch(addUser(response.data.user));

      // Refresh ke baad bhi user available rahe
      localStorage.setItem(
        "user",
        JSON.stringify(respgo */}
            <div className="px-14">
              <InstagramLogo />
            </div>

            {/* Heading */}
            <div className="text-center mt-7">

              <h1 className="text-[38px] leading-[1.45] font-normal tracking-[-1px]">
                See everyday moments from
              </h1>

              <h1 className="text-[38px] leading-[1.45] font-normal tracking-[-1px]">
                your{" "}
                <span className="bg-gradient-to-r from-[#ff7a00] via-[#ff0069] to-[#7638fa] text-transparent bg-clip-text">
                  close friends
                </span>
                .
              </h1>

            </div>

            {/* Instagram Images */}
            <div className="relative w-[350px] h-[270px] mx-auto mt-8">

              {/* Back Card */}
              <div className="absolute w-[135px] h-[210px] rounded-[16px] overflow-hidden left-[55px] top-[25px] rotate-[-12deg] shadow-lg bg-gradient-to-br from-orange-300 to-pink-500">

                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">
                    Photo
                  </span>
                </div>

              </div>

              {/* Right Card */}
              <div className="absolute w-[135px] h-[210px] rounded-[16px] overflow-hidden right-[55px] top-[25px] rotate-[12deg] shadow-lg bg-gradient-to-br from-green-300 to-blue-400">

                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">
                    Photo
                  </span>
                </div>

              </div>

              {/* Center Card */}
              <div className="absolute w-[135px] h-[230px] rounded-[17px] overflow-hidden left-1/2 -translate-x-1/2 top-[10px] shadow-2xl bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500">

                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">
                    Photo
                  </span>
                </div>

              </div>

              {/* Heart */}
              <div className="absolute left-[25px] bottom-[45px] text-[45px] text-pink-500 rotate-[-10deg]">
                ♥
              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center">

          <div className="w-full max-w-[546px] px-6 sm:px-10 md:px-12 lg:px-14">

            {/* Heading */}
            <h2 className="text-[18px] font-semibold mb-6">
              Log into Instagram
            </h2>

            <form onSubmit={handleSubmit(loginUserForm)}>

              {/* Email */}
              <input
                {...register("email", {
                  required: "Email is required"
                })}
                type="email"
                placeholder="email"
                className="w-full h-[60px] px-4 border border-gray-300 rounded-[17px] text-[16px] outline-none placeholder:text-gray-500 focus:border-gray-500 mb-3"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.email.message}
                </p>
              )}

              {/* Password */}
              <input
                {...register("password", {
                  required: "Password is required"
                })}
                type="password"
                placeholder="Password"
                className="w-full h-[60px] px-4 border border-gray-300 rounded-[17px] text-[16px] outline-none placeholder:text-gray-500"
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}

              {/* Login */}
              <button
                type="submit"
                className="w-full h-[44px] mt-6 rounded-[22px] bg-[#9cc3f4] hover:bg-[#80b4ef] text-white text-[16px] font-semibold transition"
              >
                Log in
              </button>

              {/* Forgot */}
              <button
                type="button"
                className="block mx-auto mt-6 text-[15px] text-black"
              >
                Forgot password?
              </button>

              {/* Facebook */}
              <button
                type="button"
                className="w-full h-[44px] mt-[64px] rounded-[22px] bg-[#f2f3f5] flex items-center justify-center gap-2 text-[15px]"
              >
                <FaFacebook className="text-[#1877f2] text-[16px]" />
                Log in with Facebook
              </button>

              {/* Create Account */}
              <button
                onClick={() => navigate("/register")}
                type="button"
                className="w-full active:scale-95 cursor-pointer h-[44px] mt-3 rounded-[22px] border border-[#0095f6] text-[#0095f6] text-[15px]"
              >
                Create new account
              </button>

            </form>

            {/* Meta */}
            <div className="flex justify-center items-center gap-1 mt-6">

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

export default Login;
