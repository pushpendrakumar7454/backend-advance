import React from "react";

const stories = [
  {
    id: 1,
    username: "Your story",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    username: "alex",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    username: "john",
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 4,
    username: "sara",
    image: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 5,
    username: "emma",
    image: "https://i.pravatar.cc/150?img=16",
  },
  {
    id: 6,
    username: "mike",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 7,
    username: "robert",
    image: "https://i.pravatar.cc/150?img=13",
  },
];

const Story = () => {
  return (
    <div className="flex gap-4 overflow-x-auto border-b border-gray-200 px-2 py-5 scrollbar-hide">

      {stories.map((story) => (
        <div
          key={story.id}
          className="min-w-[68px] cursor-pointer text-center"
        >

          {/* Story Circle */}
          <div className="mx-auto h-[66px] w-[66px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">

            <div className="h-full w-full rounded-full bg-white p-[2px]">

              <img
                src={story.image}
                alt={story.username}
                className="h-full w-full rounded-full object-cover"
              />

            </div>

          </div>

          <p className="mt-1 w-[68px] truncate text-xs">
            {story.username}
          </p>

        </div>
      ))}

    </div>
  );
};

export default Story;