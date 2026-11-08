import React from "react";

const suggestions = [
  {
    id: 1,
    username: "rohit_dev",
    image: "https://i.pravatar.cc/150?img=40",
  },
  {
    id: 2,
    username: "rahul_tech",
    image: "https://i.pravatar.cc/150?img=41",
  },
  {
    id: 3,
    username: "ankit_web",
    image: "https://i.pravatar.cc/150?img=42",
  },
  {
    id: 4,
    username: "aman_code",
    image: "https://i.pravatar.cc/150?img=43",
  },
];

const FollowSuggestion = () => {
  return (
    <aside className="hidden w-[300px] shrink-0 xl:block">

      {/* ================= CURRENT USER ================= */}

      <div className="mb-7 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/150?img=12"
            className="h-11 w-11 rounded-full object-cover"
          />

          <div>

            <p className="text-sm font-semibold">
              your_username
            </p>

            <p className="text-sm text-gray-500">
              Your Name
            </p>

          </div>

        </div>

        <button className="text-xs font-semibold text-blue-500">
          Switch
        </button>

      </div>


      {/* ================= TITLE ================= */}

      <div className="mb-5 flex items-center justify-between">

        <p className="text-sm font-semibold text-gray-500">
          Suggested for you
        </p>

        <button className="text-xs font-semibold">
          See All
        </button>

      </div>


      {/* ================= USERS ================= */}

      <div className="space-y-4">

        {suggestions.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between"
          >

            <div className="flex items-center gap-3">

              <img
                src={user.image}
                alt={user.username}
                className="h-9 w-9 rounded-full object-cover"
              />

              <div>

                <p className="text-sm font-semibold">
                  {user.username}
                </p>

                <p className="text-xs text-gray-500">
                  Suggested for you
                </p>

              </div>

            </div>

            <button className="text-xs font-semibold text-blue-500">
              Follow
            </button>

          </div>
        ))}

      </div>

    </aside>
  );
};

export default FollowSuggestion;