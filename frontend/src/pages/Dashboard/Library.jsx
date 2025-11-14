import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaLock,
  FaGlobe,
  FaSpinner,
  FaPlus,
  FaExclamationTriangle,
  FaHeart,
  FaComment,
  FaClock,
  FaFileAlt,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import * as notesService from "../../services/notesService";
import { useToast } from "../../context/ToastContext";

const Library = () => {
  const { success: showSuccess, error: showError } = useToast();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVisibility, setFilterVisibility] = useState("all");

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

  // Filter notes based on search and visibility
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      extractDescription(note)?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVisibility =
      filterVisibility === "all" || note.visibility === filterVisibility;
    return matchesSearch && matchesVisibility;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <FaSpinner className="text-5xl text-blue-600 animate-spin" />
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading your notes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20 px-4">
        <div className="bg-white border-2 border-red-200 rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-3xl text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Unable to Load Notes
          </h2>
          <p className="text-gray-600 mb-6 text-sm">{error}</p>
          <button
            onClick={fetchMyNotes}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
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
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-10 max-w-md w-full text-center shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaFileAlt className="text-3xl text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            No Notes Yet
          </h2>
          <p className="text-gray-600 mb-8 text-sm leading-relaxed">
            You haven't created any notes yet. Start writing and share your
            thoughts with the world!
          </p>
          <Link
            to="/editor"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <FaFileAlt className="text-white text-lg" />
              </div>
              My Library
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {notes.length} {notes.length === 1 ? "note" : "notes"} in your collection
            </p>
          </div>
          <Link
            to="/editor"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <FaPlus />
            New Note
          </Link>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search your notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterVisibility}
              onChange={(e) => setFilterVisibility(e.target.value)}
              className="pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white appearance-none cursor-pointer"
            >
              <option value="all">All Notes</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        {searchQuery || filterVisibility !== "all" ? (
          <p className="text-sm text-gray-500 mt-4">
            Showing {filteredNotes.length} of {notes.length} notes
          </p>
        ) : null}
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border-2 border-gray-200">
          <p className="text-gray-500">No notes match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredNotes.map((note) => {
            const description = extractDescription(note);

            return (
              <article
                key={note._id}
                className="bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  {/* Header with Title and Visibility */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <Link
                      to={`/notes/${note.slug}`}
                      className="flex-1 min-w-0 group-hover:text-blue-600 transition-colors"
                    >
                      <h2 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2">
                        {note.title}
                      </h2>
                    </Link>
                    {note.visibility === "public" ? (
                      <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200 shrink-0">
                        <FaGlobe className="text-xs" />
                        Public
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 shrink-0">
                        <FaLock className="text-xs" />
                        Private
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {description}
                    </p>
                  )}

                  {/* Metadata and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        to={`/editor?edit=${note._id}`}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Edit note"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(note._id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
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
      )}
    </div>
  );
};

export default Library;
