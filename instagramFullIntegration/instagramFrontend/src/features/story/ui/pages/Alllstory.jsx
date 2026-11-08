import React, { useState } from "react";
import MyStory from "../components/MyStory";
import OtherStory from "../components/OtherStory";
import StoryViewer from "../components/StoryViewer";

const Alllstory = () => {
  const [otherStories, setOtherStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <>
      <div className="flex items-center gap-4 px-4 py-2 w-full overflow-hidden">

        <div className="shrink-0">
          <MyStory />
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <OtherStory
            stories={otherStories}
            onStoryClick={(story) => setSelectedStory(story)}
          />
        </div>

      </div>

      {/* Story Viewer */}
      {selectedStory && (
        <StoryViewer
          stories={selectedStory.stories}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </>
  );
};

export default Alllstory;