import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  Bookmark,
  MoreHorizontal,
  VolumeX,
  Volume2,
  Music2,
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
} from "lucide-react";

const Reels = () => {
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const audioRefs = useRef([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  // =========================
  // CHECK VIDEO OR IMAGE
  // =========================

  const isVideo = (url) => {
    if (!url) return false;

    return (
      url.includes(".mp4") ||
      url.includes(".webm") ||
      url.includes(".ogg") ||
      url.includes("video")
    );
  };

  // =========================
  // PLAY CURRENT REEL
  // =========================

  const playCurrentMedia = (index) => {
    const video = videoRefs.current[index];
    const audio = audioRefs.current[index];

    // Pause all videos
    videoRefs.current.forEach((item, i) => {
      if (item && i !== index) {
        item.pause();
      }
    });

    // Pause all audios
    audioRefs.current.forEach((item, i) => {
      if (item && i !== index) {
        item.pause();
      }
    });

    // Play current video
    if (video) {
      video.muted = muted;

      video.play().catch(() => {
        console.log("Video autoplay blocked");
      });
    }

    // Play current song
    if (audio) {
      audio.muted = muted;

      audio.play().catch(() => {
        console.log("Audio autoplay blocked");
      });
    }

    setPlaying(true);
  };

  // =========================
  // PLAY / PAUSE
  // =========================

  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    const audio = audioRefs.current[index];

    if (video) {
      if (video.paused) {
        video.play().catch(() => {});

        if (audio) {
          audio.play().catch(() => {});
        }

        setPlaying(true);
      } else {
        video.pause();

        if (audio) {
          audio.pause();
        }

        setPlaying(false);
      }
    } else if (audio) {
      if (audio.paused) {
        audio.play().catch(() => {});
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    }
  };

  // =========================
  // MUTE / UNMUTE
  // =========================

  const toggleMute = () => {
    const newMuted = !muted;

    setMuted(newMuted);

    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = newMuted;
      }
    });

    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.muted = newMuted;
      }
    });
  };

  // =========================
  // SCROLL TO REEL
  // =========================

  const scrollToReel = (index) => {
    if (!posts || index < 0 || index >= posts.length) {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.scrollTo({
      top: index * window.innerHeight,
      behavior: "smooth",
    });

    setCurrentIndex(index);

    playCurrentMedia(index);
  };

  // =========================
  // PREVIOUS
  // =========================

  const previousReel = () => {
    scrollToReel(currentIndex - 1);
  };

  // =========================
  // NEXT
  // =========================

  const nextReel = () => {
    scrollToReel(currentIndex + 1);
  };

  // =========================
  // HANDLE SCROLL
  // =========================

  const handleScroll = () => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const index = Math.round(
      container.scrollTop / window.innerHeight
    );

    if (index !== currentIndex) {
      setCurrentIndex(index);

      playCurrentMedia(index);
    }
  };

  // =========================
  // FIRST REEL
  // =========================

  useEffect(() => {
    if (!posts || posts.length === 0) {
      return;
    }

    const timer = setTimeout(() => {
      playCurrentMedia(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [posts]);

  // =========================
  // NO POSTS
  // =========================

  if (!posts || posts.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">
          No posts available
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">

      {/* =====================================
          REELS CONTAINER
      ===================================== */}

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
      >

        {posts.map((post, index) => {
          const mediaIsVideo = isVideo(post?.image);

          return (
            <div
              key={post?._id || post?.id || index}
              className="w-full h-screen snap-start shrink-0 flex justify-center items-center"
            >

              {/* =====================================
                  REEL + RIGHT ACTIONS
              ===================================== */}

              <div className="flex items-end justify-center gap-4">

                {/* =====================================
                    MEDIA
                ===================================== */}

                <div className="relative w-[340px] h-[610px] rounded-lg overflow-hidden bg-black shadow-sm">

                  {/* ================= VIDEO ================= */}

                  {mediaIsVideo ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      src={post?.image}
                      className="w-full h-full object-cover"
                      loop
                      muted={muted}
                      playsInline
                    />
                  ) : (

                    /* ================= IMAGE ================= */

                    <img
                      src={post?.image}
                      alt="Post"
                      className="w-full h-full object-cover"
                    />

                  )}

                  {/* =====================================
                      SONG AUDIO
                  ===================================== */}

                  {post?.song && (
                    <audio
                      ref={(el) => {
                        audioRefs.current[index] = el;
                      }}
                      src={post.song}
                      loop
                      muted={muted}
                    />
                  )}

                  {/* =====================================
                      PLAY / PAUSE
                  ===================================== */}

                  <div
                    onClick={() => togglePlay(index)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  >
                    <div
                      className={`w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-opacity ${
                        playing && currentIndex === index
                          ? "opacity-0 hover:opacity-100"
                          : "opacity-100"
                      }`}
                    >
                      {playing && currentIndex === index ? (
                        <Pause
                          size={30}
                          fill="white"
                          className="text-white"
                        />
                      ) : (
                        <Play
                          size={30}
                          fill="white"
                          className="text-white ml-1"
                        />
                      )}
                    </div>
                  </div>

                  {/* =====================================
                      MUTE BUTTON
                  ===================================== */}

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center z-10 hover:bg-black/75 transition"
                  >
                    {muted ? (
                      <VolumeX
                        size={18}
                        className="text-white"
                      />
                    ) : (
                      <Volume2
                        size={18}
                        className="text-white"
                      />
                    )}
                  </button>

                  {/* =====================================
                      USER INFO
                  ===================================== */}

                  <div className="absolute bottom-4 left-4 text-white max-w-[270px]">

                    {/* USER */}

                    <div className="flex items-center gap-2 mb-2">

                      <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden border border-white/30">

                        <img
                          src={post?.image}
                          className="w-full h-full object-cover"
                          alt="Profile"
                        />

                      </div>

                      <span className="font-semibold text-sm">
                        {user?.name || "User"}
                      </span>

                      <span className="text-blue-400 text-sm">
                        • Follow
                      </span>

                    </div>

                    {/* CAPTION */}

                    {post?.caption && (
                      <p className="text-sm mb-2">
                        {post.caption}
                      </p>
                    )}

                    {/* SONG */}

                    {post?.song && (
                      <div className="flex items-center gap-2 text-xs">
                        <Music2 size={14} />

                        <span>
                          Original audio
                        </span>
                      </div>
                    )}

                  </div>

                </div>

                {/* =====================================
                    RIGHT ACTIONS
                ===================================== */}

                <div className="w-11 flex flex-col items-center gap-4 pb-2">

                  {/* LIKE */}

                  <div className="flex flex-col items-center cursor-pointer">
                    <Heart
                      size={27}
                      strokeWidth={2}
                      className="hover:scale-110 transition-transform"
                    />

                    <span className="text-xs mt-1 text-gray-800">
                      {post?.likes?.length || 0}
                    </span>
                  </div>

                  {/* COMMENT */}

                  <div className="flex flex-col items-center cursor-pointer">
                    <MessageCircle
                      size={27}
                      strokeWidth={2}
                      className="hover:scale-110 transition-transform"
                    />

                    <span className="text-xs mt-1 text-gray-800">
                      {post?.comments?.length || 0}
                    </span>
                  </div>

                  {/* REPOST */}

                  <div className="flex flex-col items-center cursor-pointer">
                    <Repeat2
                      size={27}
                      strokeWidth={2}
                      className="hover:scale-110 transition-transform"
                    />

                    <span className="text-xs mt-1 text-gray-800">
                      {post?.reposts?.length || 0}
                    </span>
                  </div>

                  {/* SHARE */}

                  <Send
                    size={27}
                    strokeWidth={2}
                    className="cursor-pointer hover:scale-110 transition-transform"
                  />

                  {/* SAVE */}

                  <Bookmark
                    size={27}
                    strokeWidth={2}
                    className="cursor-pointer hover:scale-110 transition-transform"
                  />

                  {/* MORE */}

                  <MoreHorizontal
                    size={27}
                    strokeWidth={2}
                    className="cursor-pointer hover:scale-110 transition-transform"
                  />

                  {/* MUSIC */}

                  <div className="w-8 h-8 rounded-md overflow-hidden mt-1 border border-gray-300">
                    <img
                      src={post?.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* =====================================
          UP / DOWN NAVIGATION
      ===================================== */}

      <div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3">

        {/* UP */}

        <button
          onClick={previousReel}
          disabled={currentIndex === 0}
          className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-40 hover:shadow-lg transition"
        >
          <ChevronUp size={24} />
        </button>

        {/* DOWN */}

        <button
          onClick={nextReel}
          disabled={currentIndex === posts.length - 1}
          className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-40 hover:shadow-lg transition"
        >
          <ChevronDown size={24} />
        </button>

      </div>

      {/* =====================================
          MESSAGES
      ===================================== */}

      <button className="fixed right-8 bottom-5 w-52 h-12 rounded-full bg-white shadow-md flex items-center justify-center gap-3 font-semibold">
        <Send size={21} />
        Messages
      </button>

    </div>
  );
};

export default Reels;