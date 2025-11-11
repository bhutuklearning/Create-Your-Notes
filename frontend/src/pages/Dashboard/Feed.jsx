import React, { useState, useEffect } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaSpinner,
  FaExclamationTriangle,
  FaClock,
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
    });

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <FaSpinner className="animate-spin text-3xl text-gray-500" />
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-gray-600">
        <FaExclamationTriangle className="mx-auto text-red-500 text-2xl mb-3" />
        {error}
      </div>
    );

  if (notes.length === 0)
    return (
      <div className="text-center py-20 text-gray-500">
        No public notes found. Write your first story!
      </div>
    );

  return (
    <div className="flex flex-col gap-8">
      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 pb-2 text-sm font-medium">
        <button
          onClick={() => setActiveTab("forYou")}
          className={`pb-2 ${
            activeTab === "forYou"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
        >
          For You
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`pb-2 ${
            activeTab === "following"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
        >
          Following
        </button>
      </div>

      {/* Feed */}
      {notes.map((note) => {
        const isLiked = likedNotes.has(note._id) || note.isLiked;
        const description = extractDescription(note);

        return (
          <article
            key={note._id}
            className="flex justify-between gap-4 border-b border-gray-200 pb-6 hover:bg-gray-50 transition"
          >
            {/* Left Section - Text */}
            <div className="flex-1">
              {/* Author Info */}
              <div className="flex items-center gap-2 mb-2">
                {note.author?.avatar ? (
                  <img
                    src={note.author.avatar}
                    alt={note.author.name}
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {note.author?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
                <p className="text-xs text-gray-600">
                  {note.author?.name || "Unknown"} •{" "}
                  {formatDate(note.createdAt || note.publishedAt)}
                </p>
              </div>

              {/* Title */}
              <Link to={`/notes/${note.slug}`}>
                <h2 className="font-bold text-lg text-gray-900 hover:text-black leading-tight">
                  {note.title}
                </h2>
              </Link>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {description}
              </p>

              {/* Engagement */}
              <div className="flex gap-4 text-gray-500 text-sm mt-3">
                <button
                  onClick={() => handleLike(note._id, isLiked)}
                  className="flex items-center gap-1 hover:text-rose-600"
                >
                  {isLiked ? (
                    <FaHeart className="text-rose-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                  {note.likesCount || 0}
                </button>
                <Link
                  to={`/notes/${note.slug}`}
                  className="flex items-center gap-1 hover:text-indigo-600"
                >
                  <FaRegComment /> {note.commentsCount || 0}
                </Link>
              </div>
            </div>

            {/* Right Section - Image */}
            {note.image && (
              <div className="w-28 h-24 shrink-0">
                <img
                  src={note.image}
                  alt={note.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
};

export default Feed;
