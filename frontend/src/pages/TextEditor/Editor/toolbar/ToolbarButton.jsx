import React from "react";

export default function ToolbarButton({
  onClick,
  disabled,
  active,
  icon,
  title,
  children,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`toolbar-item ${active ? "active" : ""}`}
      type="button"
    >
      {icon || children}
    </button>
  );
}
