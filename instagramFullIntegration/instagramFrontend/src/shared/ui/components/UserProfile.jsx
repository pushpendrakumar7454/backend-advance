import React from "react";
import { Settings, Plus, Menu } from "lucide-react";
import { useSelector } from "react-redux";

const UserProfile = () => {

    const {user}=useSelector((state)=>state.auth)
    const {posts}=useSelector((state)=>state.post)


    function userPosts(){
    return posts.length;
    }

  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 md:border-none">
        <h1 className="text-xl font-semibold"></h1>

        <div className="flex items-center gap-5">
          <Plus size={25} />
          <Settings size={24} />
          <Menu size={25} className="md:hidden" />
        </div>
      </div>

      {/* Profile */}
      <div className="flex gap-7 py-6 sm:gap-12 md:py-8">
        {/* Profile Image */}
        <div className="shrink-0">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200 sm:h-32 sm:w-32 md:h-36 md:w-36">
            <img
              src="https://i.pravatar.cc/300?img=12"
              alt="profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <h2 className="text-xl capitalize">{user.username}</h2>

            <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold">
              Edit profile
            </button>
          </div>

          {/* Stats */}
          <div className="mb-5 flex gap-7 text-sm sm:gap-10 sm:text-base">
            <div>
              <span className="font-semibold">{ userPosts()}</span> posts
            </div>

            <div>
              <span className="font-semibold">1.2K</span> followers
            </div>

            <div>
              <span className="font-semibold">356</span> following
            </div>
          </div>

          {/* Bio */}
          <div className="hidden sm:block">
            <p className="font-semibold capitalize">{user.name}</p>
            <p className="text-sm">Web Developer 💻</p>
            <p className="text-sm">React • JavaScript • Node.js</p>
            <p className="text-sm">Building something awesome 🚀</p>
          </div>
        </div>
      </div>

      {/* Mobile Bio */}
      <div className="mb-5 sm:hidden">
        <p className="font-semibold">Your Name</p>
        <p className="text-sm">Web Developer 💻</p>
        <p className="text-sm">React • JavaScript • Node.js</p>
        <p className="text-sm">Building something awesome 🚀</p>
      </div>
    </div>
  );
};

export default UserProfile;