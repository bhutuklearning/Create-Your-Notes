import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {FaEdit,FaTrash,FaLock,FaGlobe,FaSpinner,FaPlus,FaExclamationTriangle,FaHeart,FaComment,FaClock,FaFileAlt} from "react-icons/fa";
import * as notesService from "../../services/notesService";
import { useToast } from "../../context/ToastContext";

const Library = () => {
  const { success: showSuccess, error: showError } = useToast();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyNotes();
  }, []);

  const fetchMyNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await notesService.getMyNotes();
      if (response.success) {
        setNotes(response.notes || []);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      if (error.response?.status === 429) {
        setError(
          "Too many requests. Please wait a moment and refresh the page."
        );
      } else {
        setError("Failed to load your notes. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await notesService.deleteNote(noteId);
      setNotes(notes.filter((note) => note._id !== noteId));
      showSuccess("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      showError("Failed to delete note. Please try again.");
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
        ? textNodes.substring(0, 120) + (textNodes.length > 120 ? "..." : "")
        : "";
    } catch {
      return "";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <FaSpinner className="text-4xl text-gray-400 animate-spin" />
          <p className="text-gray-500">Loading your notes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20 px-4">
        <div className="bg-white border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaExclamationTriangle className="text-xl text-red-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Unable to Load Notes
          </h2>
          <p className="text-gray-600 mb-4 text-sm">{error}</p>
          <button
            onClick={fetchMyNotes}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 px-4">
        <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaFileAlt className="text-2xl text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No Notes Yet
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            You haven't created any notes yet. Start writing and share your
            thoughts!
          </p>
          <Link
            to="/editor"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md transition-colors"
          >
            <FaPlus />
            Create Your First Note
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <div className="text-gray-600" />
            My Library
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {notes.length} {notes.length === 1 ? "note" : "notes"} in your collection
          </p>
        </div>
        <Link
          to="/editor"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
        >
          <FaPlus />
          New Note
        </Link>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map((note) => {
          const description = extractDescription(note);
          
          return (
            <article
              key={note._id}
              className="bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  {/* Content Section */}
                  <div className="flex-1 min-w-0">
                    {/* Title and Visibility */}
                    <div className="flex items-start gap-3 mb-2">
                      <Link
                        to={`/notes/${note.slug}`}
                        className="flex-1 min-w-0"
                      >
                        <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                          {note.title}
                        </h2>
                      </Link>
                      {note.visibility === "public" ? (
                        <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded border border-green-200 shrink-0">
                          <FaGlobe className="text-xs" />
                          Public
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded border border-gray-200 shrink-0">
                          <FaLock className="text-xs" />
                          Private
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    {description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                        {description}
                      </p>
                    )}

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1.5">
                        <FaClock className="text-gray-400" />
                        {new Date(note.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {note.visibility === "public" && (
                        <>
                          <span className="inline-flex items-center gap-1.5">
                            <FaHeart className="text-red-500" />
                            {note.likesCount || 0}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <FaComment className="text-blue-500" />
                            {note.commentsCount || 0}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 shrink-0">
                    <Link
                      to={`/editor?edit=${note._id}`}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit note"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete note"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Library;
