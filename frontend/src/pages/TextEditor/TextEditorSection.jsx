import React, { useState } from "react";
import LexicalEditor from "./Editor/LexicalEditor";
import { FileText, MoreHorizontal, Save } from "lucide-react";

export default function TextEditorSection() {
  const [savedContent, setSavedContent] = useState(null);

  const handleSave = (content) => {
    // Auto-save on every change (debounce this in production)
    setSavedContent(content);
    console.log("Content saved:", content);

    // TODO: Send to backend
    // fetch('/api/save-note', {
    //   method: 'POST',
    //   body: JSON.stringify({ content }),
    // });
  };

  return (
    <main className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Top Bar */}
      <div className="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <FileText size={16} />
          <span>›</span>
          <span>First Notebook</span>
          <span>›</span>
          <input
            type="text"
            placeholder="Untitled"
            className="outline-none border-none bg-transparent font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => console.log("Manually saved:", savedContent)}
            className="px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Save size={16} />
            Save
          </button>
          <button className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors">
            Share
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Lexical Editor */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <LexicalEditor onSave={handleSave} />
        </div>
      </div>
    </main>
  );
}
