import React, { useState, useEffect } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaSpinner,
  FaExclamationTriangle,
  FaClock,
  FaUser,
  FaGlobe,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import * as notesService from "../../services/notesService";

const Feed = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likedNotes, setLikedNotes] = useState(new Set());
  const [activeTab, setActiveTab] = useState("forYou");

  useEffect(() => {
    fetchPublicNotes();
  }, []);

  const fetchPublicNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await notesService.getPublicNotes();
      if (response.success) {
        const publicNotes = (response.notes || []).filter(
          (note) => note.visibility === "public"
        );
        setNotes(publicNotes);
      }
    } catch (err) {
      setError("Failed to load notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (noteId, isLiked) => {
    try {
      if (isLiked) {
        await notesService.unlikeNote(noteId);
        setLikedNotes((prev) => {
          const newSet = new Set(prev);
          newSet.delete(noteId);
          return newSet;
        });
      } else {
        await notesService.likeNote(noteId);
        setLikedNotes((prev) => new Set(prev).add(noteId));
      }
      fetchPublicNotes();
    } catch (error) {
      console.error("Error liking note:", error);
    }
  };

  const extractDescription = (note) => {
    if (note.summary) return note.summary;
    try {
      const content =
        typeof note.contentJSON === "string"
          ? JSON.parse(note.contentJSON)
          : note.contentJSON;
      const textNodes = content?.root?.children
        ?.map((child) =>
          child.children?.map((c) => (c.type === "text" ? c.text : "")).join("")
        )
        .join(" ")
        .trim();
      return textNodes
        ? textNodes.substring(0, 320) + (textNodes.length > 320 ? "..." : "")
        : "";
    } catch {
      return "";
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <FaSpinner className="text-5xl text-blue-600 animate-spin" />
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading feed...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
          <FaExclamationTriangle className="text-red-600 text-2xl" />
        </div>
        <p className="text-gray-700 font-medium">{error}</p>
      </div>
    );

  if (notes.length === 0)
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <FaRegComment className="text-gray-400 text-2xl" />
        </div>
        <p className="text-gray-600 font-medium text-lg">
          No public notes found. Write your first story!
        </p>
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      {/* Header with Tabs */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-1 shadow-sm">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("forYou")}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              activeTab === "forYou"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            For You
          </button>
          <button
            onClick={() => setActiveTab("following")}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              activeTab === "following"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Following
          </button>
        </div>
      </div>

      {/* Feed Cards */}
      <div className="space-y-6">
        {notes.map((note) => {
          const isLiked = likedNotes.has(note._id) || note.isLiked;
          const description = extractDescription(note);

          return (
            <article
              key={note._id}
              className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6 sm:p-8">
                {/* Author Header */}
                <div className="flex items-center gap-3 mb-4">
                  {note.author?.avatar ? (
                    <img
                      src={note.author.avatar}
                      alt={note.author.name}
                      className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-gray-200">
                      {note.author?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {note.author?.name || "Unknown Author"}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FaClock className="text-gray-400" />
                      <span>{formatDate(note.createdAt || note.publishedAt)}</span>
                      {note.visibility === "public" ? (
                        <span className="inline-flex items-center gap-1 text-green-600">
                          <FaGlobe className="text-xs" />
                          Public
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-500">
                          <FaLock className="text-xs" />
                          Private
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex gap-6">
                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/notes/${note.slug}`}>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                        {note.title}
                      </h2>
                    </Link>

                    {description && (
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-base">
                        {description}
                      </p>
                    )}

                    {/* Engagement Bar */}
                    <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleLike(note._id, isLiked)}
                        className={`flex items-center gap-2 font-medium transition-all duration-200 ${
                          isLiked
                            ? "text-red-600 hover:text-red-700"
                            : "text-gray-600 hover:text-red-600"
                        }`}
                      >
                        {isLiked ? (
                          <FaHeart className="text-lg" />
                        ) : (
                          <FaRegHeart className="text-lg" />
                        )}
                        <span className="font-semibold">{note.likesCount || 0}</span>
                      </button>

                      <Link
                        to={`/notes/${note.slug}`}
                        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                      >
                        <FaRegComment className="text-lg" />
                        <span className="font-semibold">{note.commentsCount || 0}</span>
                      </Link>

                      <Link
                        to={`/notes/${note.slug}`}
                        className="ml-auto flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
                      >
                        <span>Read more</span>
                        <FaArrowRight className="text-sm transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Image Thumbnail */}
                  {note.image && (
                    <div className="hidden sm:block w-48 h-36 shrink-0 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-blue-300 transition-colors">
                      <img
                        src={note.image}
                        alt={note.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
