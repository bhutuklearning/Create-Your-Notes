import React from "react";

// Simple image component used inside Lexical ImageNode decorator
export default function ImageComponent({
  src,
  altText,
  width,
  height,
  nodeKey,
}) {
  return (
    <div className="lexical-image-wrapper my-4" data-node-key={nodeKey}>
      <img
        src={src}
        alt={altText || "image"}
        style={{
          maxWidth: "100%",
          height: height === "auto" ? "auto" : height,
        }}
        className="rounded shadow-sm"
        onClick={() => window.open(src, "_blank")}
      />
      {altText && <div className="text-xs text-gray-500 mt-1">{altText}</div>}
    </div>
  );
}
