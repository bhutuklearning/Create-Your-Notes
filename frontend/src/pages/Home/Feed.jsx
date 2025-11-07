import React from "react";
import { feedData } from "../../utils/feedData";
import { Link } from "react-router-dom";
import { FaRegHeart, FaRegComment, FaRegEye } from "react-icons/fa";

const Feed = () => {
  return (
    <div className="flex flex-col gap-6">
      {feedData.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 hover:shadow-md transition"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              <h3 className="font-semibold text-gray-800">{post.author}</h3>
              <span className="text-sm text-gray-500">{post.timeAgo}</span>
            </div>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
              {post.category}
            </span>
          </div>

          {/* Content */}
          <Link to={`/post/${post.id}`} className="block">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition">
              {post.title}
            </h2>
            <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="rounded-lg w-full h-48 object-cover"
              />
            )}
          </Link>

          {/* Stats */}
          <div className="flex items-center gap-5 mt-4 text-gray-500 text-sm">
            <span className="flex items-center gap-1">
              <FaRegHeart className="text-gray-500" /> {post.likes}
            </span>
            <span className="flex items-center gap-1">
              <FaRegComment className="text-gray-500" /> {post.comments}
            </span>
            <span className="flex items-center gap-1">
              <FaRegEye className="text-gray-500" /> {post.views}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
