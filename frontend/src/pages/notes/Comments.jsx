import React, { useState, useEffect } from "react";
import { FaUser, FaEdit, FaTrash, FaClock, FaSpinner } from "react-icons/fa";
import * as commentsService from "../../services/commentsService";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const Comments = ({ noteId, onCommentCountChange }) => {
  const { user } = useAuth();
  const { success: showSuccess, error: showError } = useToast();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchComments();
  }, [noteId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await commentsService.getComments(noteId);
      if (response.success) {
        setComments(response.comments || []);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmitting(true);
    try {
      await commentsService.addComment(noteId, commentText.trim());
      setCommentText("");
      showSuccess("Comment added successfully!");
      fetchComments();
      if (onCommentCountChange) {
        onCommentCountChange();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      showError(error.response?.data?.error || "Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (comment) => {
    setEditingId(comment._id);
    setEditText(comment.body);
  };

  const handleUpdate = async (commentId) => {
    if (!editText.trim()) return;

    try {
      await commentsService.editComment(commentId, editText.trim());
      setEditingId(null);
      setEditText("");
      showSuccess("Comment updated successfully!");
      fetchComments();
    } catch (error) {
      console.error("Error updating comment:", error);
      showError(error.response?.data?.error || "Failed to update comment");
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      await commentsService.deleteComment(commentId);
      showSuccess("Comment deleted successfully!");
      fetchComments();
      if (onCommentCountChange) {
        onCommentCountChange();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      showError(error.response?.data?.error || "Failed to delete comment");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <FaSpinner className="animate-spin text-gray-400 text-xl" />
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="flex-1">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!commentText.trim() || submitting}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
              >
                {submitting ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-sm">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                {comment.author?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {comment.author?.name || "Unknown"}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FaClock className="text-xs" />
                      <span>{formatDate(comment.createdAt)}</span>
                      {comment.editedAt && (
                        <span className="text-gray-400">(edited)</span>
                      )}
                    </div>
                  </div>
                  {user?._id === comment.author?._id && (
                    <div className="flex gap-2">
                      {editingId === comment._id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(comment._id)}
                            className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditText("");
                            }}
                            className="text-gray-600 hover:text-gray-700 text-xs font-medium"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(comment)}
                            className="text-gray-600 hover:text-gray-700"
                            title="Edit"
                          >
                            <FaEdit className="text-xs" />
                          </button>
                          <button
                            onClick={() => handleDelete(comment._id)}
                            className="text-red-600 hover:text-red-700"
                            title="Delete"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                {editingId === comment._id ? (
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm mt-2"
                  />
                ) : (
                  <p className="text-gray-700 text-sm whitespace-pre-wrap break-words">
                    {comment.body}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;

