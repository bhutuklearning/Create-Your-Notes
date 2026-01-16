import api from "../utils/axios";
// Create a new note
export const createNote = async (noteData) => {
  const response = await api.post("/notes/create-note", {
    title: noteData.title,
    summary: noteData.summary,
    contentJSON: noteData.contentJSON,
    visibility: noteData.visibility || "private",
  });
  return response.data;
};

// Get user's own notes (Library)
export const getMyNotes = async () => {
  const response = await api.get("/notes/my");
  return response.data;
};

// Get public notes (Feed)
export const getPublicNotes = async () => {
  const response = await api.get("/notes/public");
  return response.data;
};

// Get a single note by slug
export const getNoteBySlug = async (slug) => {
  const response = await api.get(`/notes/${slug}`);
  return response.data;
};

// Update a note
export const updateNote = async (noteId, noteData) => {
  const response = await api.put(`/notes/${noteId}`, {
    title: noteData.title,
    summary: noteData.summary,
    contentJSON: noteData.contentJSON,
    visibility: noteData.visibility,
  });
  return response.data;
};

// Delete a note
export const deleteNote = async (noteId) => {
  const response = await api.delete(`/notes/${noteId}`);
  return response.data;
};

// Like a note
export const likeNote = async (noteId) => {
  const response = await api.post(`/notes/${noteId}/like`);
  return response.data;
};

// Unlike a note
export const unlikeNote = async (noteId) => {
  const response = await api.post(`/notes/${noteId}/unlike`);
  return response.data;
};

// Search notes
export const searchNotes = async (query) => {
  const response = await api.get(`/notes/search?q=${encodeURIComponent(query)}`);
  return response.data;
};

