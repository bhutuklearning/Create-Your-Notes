import React from "react";

export default function Placeholder({ children, className }) {
  return (
    <div className={className || "editor-placeholder"}>
      {children || "Start typing your notes here..."}
    </div>
  );
}
