import api from "../utils/axios";

/**
 * Comments Service
 * Handles all comment-related API calls
 */

// Add a comment to a note
export const addComment = async (noteId, body) => {
  const response = await api.post(`/comments/${noteId}`, { body });
  return response.data;
};

// Get comments for a note
export const getComments = async (noteId, page = 1, limit = 10) => {
  const response = await api.get(`/comments/${noteId}?page=${page}&limit=${limit}`);
  return response.data;
};

// Edit a comment
export const editComment = async (commentId, body) => {
  const response = await api.put(`/comments/edit/${commentId}`, { body });
  return response.data;
};

// Delete a comment
export const deleteComment = async (commentId) => {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data;
};

