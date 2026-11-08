import React, { useEffect, useMemo, useRef, useState } from "react";
import { X, Plus } from "lucide-react";

const StoryViewer = ({ stories, onClose, onAddStory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef(null);

  const story = stories[currentIndex];

  // URL ek baar create hoga
  const storyUrl = useMemo(() => {
    if (!story) return null;

    return URL.createObjectURL(story);
  }, [story]);

  // URL cleanup
  useEffect(() => {
    return () => {
      if (storyUrl) {
        URL.revokeObjectURL(storyUrl);
      }
    };
  }, [storyUrl]);

  // Video ko play karna
  useEffect(() => {
    if (!story) return;

    if (story.type.startsWith("video/")) {
      const video = videoRef.current;
      if (!video) return;
      video.load();
      video.play()
        .then(() => {
          console.log("VIDEO PLAYING");
        })
        .catch((error) => {
          console.log("VIDEO ERROR:", error);
        });
    }
  }, [currentIndex, story]);

  // Story progress
  useEffect(() => {
    if (!story) return;

    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          if (currentIndex < stories.length - 1) {
            setCurrentIndex((prev) => prev + 1);
          } else {
            onClose();
          }

          return 100;
        }

        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentIndex, story, stories.length, onClose]);

  if (!stories.length || !story) {
    return null;
  }

  const nextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const previousStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">

      {/* Progress */}
      <div className="absolute left-3 right-3 top-3 z-50 flex gap-1">
        {stories.map((_, index) => (
          <div
            key={index}
            className="h-1 flex-1 rounded-full bg-gray-600"
          >
            <div
              className="h-full rounded-full bg-white"
              style={{
                width:
                  index < currentIndex
                    ? "100%"
                    : index === currentIndex
                    ? `${progress}%`
                    : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-5 top-8 z-50 text-white"
      >
        <X size={30} />
      </button>

      {/* Story */}
      <div className="h-full w-full max-w-md">

        {story.type.startsWith("image/") ? (
          <img
            src={storyUrl}
            alt="Story"
            className="h-full w-full object-contain"
          />
        ) : (
          <video
            ref={videoRef}
            src={storyUrl}
            className="h-full w-full object-contain"
            muted
            playsInline
            autoPlay
            controls
          />
        )}

      </div>

      {/* Previous */}
      {currentIndex > 0 && (
        <button
          onClick={previousStory}
          className="absolute left-5 z-50 text-4xl text-white"
        >
          ❮
        </button>
      )}

      {/* Next */}
      {currentIndex < stories.length - 1 && (
        <button
          onClick={nextStory}
          className="absolute right-5 z-50 text-4xl text-white"
        >
          ❯
        </button>
      )}

      {/* Add Story */}
      <button
        onClick={onAddStory}
        className="absolute bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white"
      >
        <Plus size={28} />
      </button>

    </div>
  );
};

export default StoryViewer;