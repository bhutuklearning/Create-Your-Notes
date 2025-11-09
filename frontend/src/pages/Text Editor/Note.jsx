import React from "react";
import { useParams, Link } from "react-router-dom";
import feedData from "../../utils/feedData.js";
import { FaArrowLeft, FaHeart, FaEye, FaRegComment } from "react-icons/fa";

const Note = () => {
  const { id } = useParams();
  const note = feedData.find((item) => item.id === parseInt(id));

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Note not found</h2>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 underline text-lg"
        >
          Back to Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Back Button */}
      <Link
        to="/"
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <FaArrowLeft /> Back to Feed
      </Link>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        {note.title}
      </h1>

      {/* Author Info */}
      <div className="flex items-center gap-3 mb-6">
        <img
          src={note.authorImage}
          alt={note.author}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-gray-900 font-semibold">{note.author}</p>
          <p className="text-gray-500 text-sm">
            {note.date} • {note.readTime}
          </p>
        </div>
      </div>

      {/* Cover Image */}
      <div className="w-full h-72 sm:h-[400px] mb-8">
        <img
          src={note.image}
          alt={note.title}
          className="w-full h-full object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Article Content */}
      <div
        className="prose prose-lg max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: note.content }}
      ></div>

      {/* Stats */}
      <div className="flex items-center gap-6 mt-10 text-gray-600 border-t border-gray-200 pt-6">
        <span className="flex items-center gap-2">
          <FaHeart className="text-red-500" /> {note.likes}
        </span>
        <span className="flex items-center gap-2">
          <FaRegComment /> {note.comments}
        </span>
        <span className="flex items-center gap-2">
          <FaEye /> {note.views}
        </span>
      </div>

      {/* Tags */}
      <div className="mt-8 flex flex-wrap gap-3">
        {note.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 cursor-pointer transition"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Note;
