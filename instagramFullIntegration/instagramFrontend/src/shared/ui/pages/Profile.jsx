import React from "react";
import UserProfile from "../components/UserProfile";
import Highlights from "../components/Highlights";
import Posts from "../components/Posts";



const Profile = () => {
  return (
    <div className="min-h-screen w-full bg-white text-black">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">

        <UserProfile/>
       <Highlights/>
      <Posts/>

      </div>
    </div>
  );
};

export default Profile;