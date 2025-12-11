import React from "react";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

export default function LexicalContentEditable({ className }) {
  return (
    <ContentEditable
      className={className || "editor-input"}
      aria-placeholder="Start typing your notes here..."
    />
  );
}
