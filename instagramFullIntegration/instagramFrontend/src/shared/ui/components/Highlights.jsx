import React from "react";
import { Plus } from "lucide-react";

const Highlights = () => {
  return (
    <div className="mb-7 flex gap-5 overflow-x-auto pb-2">
      {/* Highlight 1 */}
      <div className="flex shrink-0 flex-col items-center gap-2">
        <div className="h-16 w-16 rounded-full border border-gray-300 p-1 sm:h-20 sm:w-20">
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=200"
            alt="work"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <span className="text-xs">Work</span>
      </div>

      {/* Highlight 2 */}
      <div className="flex shrink-0 flex-col items-center gap-2">
        <div className="h-16 w-16 rounded-full border border-gray-300 p-1 sm:h-20 sm:w-20">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200"
            alt="travel"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <span className="text-xs">Travel</span>
      </div>

      {/* Highlight 3 */}
      <div className="flex shrink-0 flex-col items-center gap-2">
        <div className="h-16 w-16 rounded-full border border-gray-300 p-1 sm:h-20 sm:w-20">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200"
            alt="food"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <span className="text-xs">Food</span>
      </div>

      {/* New Highlight */}
      <div className="flex shrink-0 flex-col items-center gap-2">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-300 sm:h-20 sm:w-20">
          <Plus size={25} strokeWidth={1.5} />
        </div>

        <span className="text-xs">New</span>
      </div>
    </div>
  );
};

export default Highlights;