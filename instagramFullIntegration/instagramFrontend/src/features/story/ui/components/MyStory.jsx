import React, { useRef, useState } from "react";
import { Plus } from "lucide-react";
import StoryViewer from "./StoryViewer";

const MyStory = () => {
  const [stories, setStories] = useState([]);
  const [showViewer, setShowViewer] = useState(false);

  const fileInputRef = useRef(null);

  // File select
  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setStories((prev) => [...prev, file]);
    }

    e.target.value = "";
  };

  // File picker open
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Story open
  const openStory = () => {
    if (stories.length > 0) {
      setShowViewer(true);
    }
  };

  // Story close
  const closeStory = () => {
    setShowViewer(false);
  };

  return (
    <div className="mt-4 w-full">

      {/* Story */}
      <div className="relative w-fit">

        {/* Story Circle */}
        <div
          onClick={stories.length > 0 ? openStory : handleClick}
          className="relative h-15 w-15 cursor-pointer rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[3px]"
        >
          <div className="h-full w-full overflow-hidden rounded-full border-2 border-white bg-gray-100">

            {stories.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center">
                <Plus size={20} />
              </div>
            ) : stories[0].type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(stories[0])}
                alt="story"
                className="h-full w-full object-cover"
              />
            ) : (
              <video
                src={URL.createObjectURL(stories[0])}
                className="h-full w-full object-cover"
                muted
                playsInline
              />
            )}

          </div>
        </div>

        {/* PLUS BUTTON */}
        <button
          onClick={handleClick}
          className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-white"
        >
          <Plus size={15} />
        </button>

        {/* Hidden Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {/* Name */}
      <p className="mt-2 w-20 truncate text-center text-xs text-gray-700">
        Your Story
      </p>

      {/* Story Viewer */}
      {showViewer && (
        <StoryViewer
          stories={stories}
          onClose={closeStory}
          onAddStory={handleClick}
        />
      )}
    </div>
  );
};

export default MyStory;
