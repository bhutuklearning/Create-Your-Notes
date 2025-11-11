import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LexicalEditor from "./Editor/LexicalEditor";
import { FileText, MoreHorizontal, Save, Globe, Lock } from "lucide-react";
import * as notesService from "../../services/notesService";
import { useToast } from "../../context/ToastContext";

export default function TextEditorSection() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { success: showSuccess, error: showError } = useToast();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [contentJSON, setContentJSON] = useState(null);
  const [saving, setSaving] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [error, setError] = useState("");

  const editNoteId = searchParams.get("edit");

  useEffect(() => {
    if (editNoteId) {
      loadNote(editNoteId);
    }
  }, [editNoteId]);

  const loadNote = async (id) => {
    try {
      // Get note from library (we need slug, but we have ID)
      // For now, we'll fetch from my notes and find by ID
      const response = await notesService.getMyNotes();
      if (response.success) {
        const note = response.notes.find((n) => n._id === id);
        if (note) {
          setNoteId(note._id);
          setTitle(note.title || "");
          setSummary(note.summary || "");
          setVisibility(note.visibility || "private");
          setContentJSON(note.contentJSON);
        }
      }
    } catch (error) {
      console.error("Error loading note:", error);
      setError("Failed to load note");
    }
  };

  const handleSave = (content) => {
    try {
      const json = JSON.parse(content);
      setContentJSON(json);
    } catch (error) {
      console.error("Error parsing content:", error);
    }
  };

  const handleSaveNote = async () => {
    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    if (!contentJSON) {
      setError("Please add some content to your note");
      return;
    }

    setSaving(true);
    setError("");

    try {
      if (noteId) {
        // Update existing note
        await notesService.updateNote(noteId, {
          title,
          summary,
          contentJSON,
          visibility,
        });
        showSuccess("Note updated successfully!");
      } else {
        // Create new note
        const response = await notesService.createNote({
          title,
          summary,
          contentJSON,
          visibility,
        });
        if (response.success) {
          showSuccess("Note saved successfully!");
          navigate("/dashboard/library");
        }
      }
    } catch (error) {
      console.error("Error saving note:", error);
      setError(
        error.response?.data?.error ||
          error.message ||
          "Failed to save note. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Top Bar */}
      <div className="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-600 flex-1">
          <FileText size={16} />
          <span>›</span>
          <span>My Notes</span>
          <span>›</span>
          <input
            type="text"
            placeholder="Untitled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="outline-none border-none bg-transparent font-medium flex-1 min-w-0"
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Visibility Toggle */}
          <button
            onClick={() =>
              setVisibility(visibility === "public" ? "private" : "public")
            }
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-2 ${
              visibility === "public"
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title={visibility === "public" ? "Public" : "Private"}
          >
            {visibility === "public" ? (
              <Globe size={16} />
            ) : (
              <Lock size={16} />
            )}
            {visibility === "public" ? "Public" : "Private"}
          </button>
          <button
            onClick={handleSaveNote}
            disabled={saving}
            className="px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            {saving ? "Saving..." : noteId ? "Update" : "Save"}
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-6 py-2 bg-red-50 border-b border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Summary Input */}
      <div className="border-b border-gray-200 px-6 py-2">
        <input
          type="text"
          placeholder="Add a summary (optional)"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full outline-none border-none bg-transparent text-sm text-gray-600 placeholder-gray-400"
          maxLength={280}
        />
      </div>

      {/* Lexical Editor */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <LexicalEditor
            onSave={handleSave}
            initialContent={contentJSON}
          />
        </div>
      </div>
    </main>
  );
}
