import React from "react";
import { FaRegHeart, FaRegComment, FaRegEye } from "react-icons/fa";
import  feedData  from "../../utils/feedData.js";

const Feed = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Tab Navigation */}
      <div className="flex gap-6 border-b border-gray-200">
        <button className="pb-3 px-1 border-b-2 border-gray-900 font-medium text-sm">
          For you
        </button>
        <button className="pb-3 px-1 text-gray-500 hover:text-gray-900 font-medium text-sm">
          Following
        </button>
      </div>

      {feedData.map((post) => (
        <article
          key={post.id}
          className="border-b border-gray-200 pb-6 last:border-none hover:bg-gray-50/50 transition rounded-lg p-4"
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 hover:text-gray-700 cursor-pointer mb-2 leading-snug">
                {post.title}
              </h2>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1 hover:text-gray-700 cursor-pointer">
                  <FaRegHeart /> {post.likes}
                </span>
                <span className="flex items-center gap-1 hover:text-gray-700 cursor-pointer">
                  <FaRegComment /> {post.comments}
                </span>
                <span className="flex items-center gap-1">
                  <FaRegEye /> {post.views}
                </span>
              </div>
            </div>

            {post.image && (
              <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-lg hover:opacity-90 transition"
                />
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};

export default Feed;
