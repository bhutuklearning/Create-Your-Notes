import React, { useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Quote,
  Image, // ← NEW: Import Image icon
} from "lucide-react";
import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { INSERT_IMAGE_COMMAND } from "./plugins/ImagePlugin"; // ← NEW

export default function EditorToolbar({
  editor,
  isBold,
  isItalic,
  isUnderline,
}) {
  const fileInputRef = useRef(null); // ← NEW: Reference to file input

  // Format text (bold, italic, underline)
  const formatText = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  // Format alignment
  const formatAlignment = (alignment) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
  };

  // Insert heading
  const formatHeading = (headingSize) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  // Insert quote
  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  // ← NEW: Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
          src: e.target.result, // Base64 image data
          altText: file.name,
          width: "auto",
          height: "auto",
        });
      };
      reader.readAsDataURL(file);
    }
    // Reset input so same file can be uploaded again
    event.target.value = "";
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-3 border-b border-gray-200 bg-white">
      {/* Text Formatting */}
      <ToolbarButton
        onClick={() => formatText("bold")}
        active={isBold}
        icon={<Bold size={18} />}
        title="Bold (Ctrl+B)"
      />
      <ToolbarButton
        onClick={() => formatText("italic")}
        active={isItalic}
        icon={<Italic size={18} />}
        title="Italic (Ctrl+I)"
      />
      <ToolbarButton
        onClick={() => formatText("underline")}
        active={isUnderline}
        icon={<Underline size={18} />}
        title="Underline (Ctrl+U)"
      />

      <Divider />

      {/* Headings */}
      <ToolbarButton
        onClick={() => formatHeading("h1")}
        icon={<Heading1 size={18} />}
        title="Heading 1"
      />
      <ToolbarButton
        onClick={() => formatHeading("h2")}
        icon={<Heading2 size={18} />}
        title="Heading 2"
      />

      <Divider />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)}
        icon={<List size={18} />}
        title="Bullet List"
      />
      <ToolbarButton
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND)}
        icon={<ListOrdered size={18} />}
        title="Numbered List"
      />

      <Divider />

      {/* Alignment */}
      <ToolbarButton
        onClick={() => formatAlignment("left")}
        icon={<AlignLeft size={18} />}
        title="Align Left"
      />
      <ToolbarButton
        onClick={() => formatAlignment("center")}
        icon={<AlignCenter size={18} />}
        title="Align Center"
      />
      <ToolbarButton
        onClick={() => formatAlignment("right")}
        icon={<AlignRight size={18} />}
        title="Align Right"
      />

      <Divider />

      {/* Quote */}
      <ToolbarButton
        onClick={formatQuote}
        icon={<Quote size={18} />}
        title="Quote"
      />

      <Divider />

      {/* ← NEW: Image Upload Button */}
      <ToolbarButton
        onClick={() => fileInputRef.current?.click()}
        icon={<Image size={18} />}
        title="Insert Image"
      />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}

// Toolbar Button Component
function ToolbarButton({ onClick, active, icon, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        p-2 rounded hover:bg-gray-100 transition-colors
        ${active ? "bg-blue-100 text-blue-600" : "text-gray-700"}
      `}
    >
      {icon}
    </button>
  );
}

// Divider Component
function Divider() {
  return <div className="w-px h-6 bg-gray-300 mx-1" />;
}
