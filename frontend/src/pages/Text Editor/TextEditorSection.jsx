

import React from "react";
import LexicalEditor from "./Editor/LexicalEditor";

export default function TextEditorSection() {
  return (
    <main className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Top Bar */}
      <div className="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>First Notebook</span>
          <span>›</span>
          <input
            type="text"
            placeholder="Untitled"
            className="outline-none border-none bg-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors">
            Share
          </button>
        </div>
      </div>

      {/* Lexical Editor */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <LexicalEditor />
        </div>
      </div>
    </main>
  );
}
