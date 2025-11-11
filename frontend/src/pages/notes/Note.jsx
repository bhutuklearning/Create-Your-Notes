import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaEye,
  FaLock,
  FaSpinner,
  FaClock,
} from "react-icons/fa";
import * as notesService from "../../services/notesService";
import { useAuth } from "../../context/AuthContext";
import LexicalViewer from "../TextEditor/Editor/LexicalViewer";
import Comments from "./Comments";

const Note = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
    fetchNote();
  }, [slug, isAuthenticated]);

  const fetchNote = async () => {
    try {
      setLoading(true);
      const response = await notesService.getNoteBySlug(slug);
      if (response.success) {
        setNote(response.note);
        setIsLiked(response.note.isLiked || false);
      }
    } catch (error) {
      console.error("Error fetching note:", error);
      setError("Failed to load note. It may be private or not exist.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!note) return;
    try {
      if (isLiked) {
        await notesService.unlikeNote(note._id);
        setIsLiked(false);
      } else {
        await notesService.likeNote(note._id);
        setIsLiked(true);
      }
      fetchNote(); // Refresh to get updated like count
    } catch (error) {
      console.error("Error liking note:", error);
    }
  };

  const handleCommentCountChange = () => {
    fetchNote(); // Refresh to get updated comment count
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="text-5xl text-blue-600 animate-spin" />
          <p className="text-lg font-medium text-gray-600">Loading note...</p>
        </div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="w-full h-full min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaLock className="text-2xl text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {error || "Note not found"}
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            This note might be private or no longer available.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            <FaArrowLeft /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium mb-8 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Dashboard</span>
        </Link>

        {/* Main Content Card */}
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="px-6 sm:px-10 pt-8 sm:pt-12 pb-6 border-b border-gray-200 bg-white">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {note.title}
            </h1>

            {/* Summary */}
            {note.summary && (
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {note.summary}
              </p>
            )}

            {/* Author Info & Metadata */}
            <div className="flex flex-wrap items-center gap-4">
              {note.author && (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    {note.author.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">
                      {note.author.name || "Unknown"}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <FaClock className="text-xs" />
                      {note.publishedAt ? (
                        <span>Published {formatDate(note.publishedAt)}</span>
                      ) : (
                        <span>Created {formatDate(note.createdAt)}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {!note.author && (note.publishedAt || note.createdAt) && (
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <FaClock className="text-xs" />
                  {note.publishedAt ? (
                    <span>Published {formatDate(note.publishedAt)}</span>
                  ) : (
                    <span>Created {formatDate(note.createdAt)}</span>
                  )}
                </div>
              )}

              {/* Visibility Badge */}
              {note.visibility === "public" && (
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded border border-green-200">
                  <FaEye className="text-xs" />
                  Public
                </span>
              )}
              {note.visibility === "private" && (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded border border-gray-200">
                  <FaLock className="text-xs" />
                  Private
                </span>
              )}
            </div>

            {/* Updated timestamp */}
            {note.updatedAt && note.updatedAt !== note.createdAt && (
              <div className="mt-3 text-xs text-gray-500">
                Last updated {formatDate(note.updatedAt)}
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="px-6 sm:px-10 py-8 sm:py-12">
            {note.contentJSON ? (
              <div className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-blue-600 prose-pre:bg-gray-900">
                <LexicalViewer content={note.contentJSON} />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 italic text-lg">
                  No content available
                </p>
              </div>
            )}
          </div>

          {/* Engagement Stats Footer */}
          <div className="px-6 sm:px-10 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center gap-6">
              <button
                onClick={handleLike}
                className={`inline-flex items-center gap-2 font-medium text-base transition-colors ${
                  isLiked
                    ? "text-red-600 hover:text-red-700"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                {isLiked ? (
                  <FaHeart className="text-xl" />
                ) : (
                  <FaRegHeart className="text-xl" />
                )}
                <span className="font-semibold">{note.likesCount || 0}</span>
              </button>

              <div className="flex items-center gap-2 text-gray-600 text-base font-medium">
                <FaRegComment className="text-xl" />
                <span className="font-semibold">{note.commentsCount || 0}</span>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          {note.visibility === "public" && (
            <div className="px-6 sm:px-10 py-6 border-t border-gray-200">
              <Comments
                noteId={note._id}
                onCommentCountChange={handleCommentCountChange}
              />
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default Note;
