import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Volume2, VolumeX } from "lucide-react";

const UserCard = ({ post }) => {
  const { user } = useSelector((state) => state.auth);

  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // ================= CHECK VIDEO =================
  const isVideo =
    post?.mediaType === "video" ||
    post?.image?.startsWith("data:video/") ||
    post?.image?.startsWith("blob:");

  // ================= SONG PLAY =================
  useEffect(() => {
    if (!post?.song || !audioRef.current) return;

    const audio = audioRef.current;

    audio.muted = true;
    audio.loop = true;

    audio
      .play()
      .catch((error) => {
        console.log("Autoplay blocked by browser:", error);
      });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [post?.song]);

  // ================= VOLUME =================
  const handleVolume = () => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);

      audio.play().catch(() => {});
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <article className="w-full bg-white">

      {/* ================= POST HEADER ================= */}
      <div className="mx-auto flex h-[60px] w-full max-w-[470px] items-center justify-between px-3">

        {/* USER */}
        <div className="flex min-w-0 items-center gap-2.5">

          <img
            src={
              user?.profileImage ||
              user?.profilePic ||
              user?.image ||
              "https://i.pravatar.cc/150?img=12"
            }
            alt="Profile"
            className="h-9 w-9 shrink-0 rounded-full object-cover"
          />

          <div className="flex min-w-0 items-center gap-1.5">

            <span className="truncate text-[14px] font-semibold text-black">
              {user?.name || user?.username || "User"}
            </span>

            <span className="text-[13px] text-gray-400">
              ·
            </span>

            <span className="text-[13px] text-gray-500">
              4h
            </span>

          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          <button
            type="button"
            className="rounded-lg bg-[#f2f2f2] px-4 py-2 text-[14px] font-semibold text-black transition hover:bg-[#e7e7e7] active:scale-95"
          >
            Follow
          </button>

          <button
            type="button"
            aria-label="More options"
            className="flex h-9 w-7 items-center justify-center text-black"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current"
            >
              <circle cx="5" cy="12" r="1.6" />
              <circle cx="12" cy="12" r="1.6" />
              <circle cx="19" cy="12" r="1.6" />
            </svg>
          </button>

        </div>
      </div>

      {/* ================= POST MEDIA ================= */}
      <div className="relative mx-auto w-full max-w-[470px] overflow-hidden">

        {isVideo ? (
          <video
            src={post?.image}
            controls
            playsInline
            preload="metadata"
            className="block aspect-square w-full object-cover"
          />
        ) : (
          <img
            src={post?.image}
            alt="Post"
            className="block aspect-square w-full object-cover"
          />
        )}

        {/* ================= SONG ================= */}
        {post?.song && (
          <audio
            ref={audioRef}
            src={post.song}
            autoPlay
            muted
            loop
            playsInline
          />
        )}

        {/* ================= VOLUME BUTTON ================= */}
        {post?.song && (
          <button
            type="button"
            onClick={handleVolume}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition active:scale-90"
          >
            {isMuted ? (
              <VolumeX
                className="h-4 w-4"
                strokeWidth={2.5}
              />
            ) : (
              <Volume2
                className="h-4 w-4"
                strokeWidth={2.5}
              />
            )}
          </button>
        )}

      </div>

      {/* ================= POST BOTTOM ================= */}
      <div className="mx-auto w-full max-w-[470px] px-3 py-3">

        {/* ================= ACTIONS ================= */}
        <div className="flex items-center gap-4">

          {/* LIKE */}
          <button
            type="button"
            aria-label="Like"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3Z" />
            </svg>
          </button>

          {/* COMMENT */}
          <button
            type="button"
            aria-label="Comment"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M21 11.5a8.4 8.4 0 0 1-9 8.3 9.4 9.4 0 0 1-3.5-.7L4 21l1.2-3.7a8 8 0 0 1-1.2-4.3A8.4 8.4 0 0 1 13 4.8a8.4 8.4 0 0 1 8 6.7Z" />
            </svg>
          </button>

          {/* SHARE */}
          <button
            type="button"
            aria-label="Share"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </button>

        </div>

        {/* ================= CAPTION ================= */}
        {post?.caption && (
          <p className="mt-2 text-[14px] text-black">

            <span className="font-semibold">
              {user?.name || user?.username || "User"}
            </span>{" "}

            {post.caption}

          </p>
        )}

      </div>

    </article>
  );
};

export default UserCard;