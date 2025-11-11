import React from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link,
  Image,
  Undo,
  Redo,
} from "lucide-react";
import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";

import ToolbarButton from "./ToolbarButton";
import BlockFormatDropdown from "./BlockFormatDropdown";
import { $createImageNode } from "../nodes/ImageNode";
import { $insertNodes } from "lexical";

const Divider = () => <div className="toolbar-divider" />;

export default function Toolbar({
  editor,
  canUndo,
  canRedo,
  isBold,
  isItalic,
  isUnderline,
  isStrikethrough,
  isCode,
  isLink,
  blockType,
}) {
  const formatText = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatAlignment = (alignment) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
  };

  const insertLink = () => {
    if (!isLink) {
      const url = prompt("Enter URL:");
      if (url) {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
      }
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  };

  const formatList = (listType) => {
    if (blockType !== listType) {
      editor.dispatchCommand(
        listType === "ul"
          ? INSERT_UNORDERED_LIST_COMMAND
          : INSERT_ORDERED_LIST_COMMAND
      );
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
  };

  return (
    <div className="toolbar">
      {/* Undo/Redo */}
      <ToolbarButton
        onClick={() => editor.dispatchCommand(UNDO_COMMAND)}
        disabled={!canUndo}
        icon={<Undo size={18} />}
        title="Undo (Ctrl+Z)"
      />
      <ToolbarButton
        onClick={() => editor.dispatchCommand(REDO_COMMAND)}
        disabled={!canRedo}
        icon={<Redo size={18} />}
        title="Redo (Ctrl+Y)"
      />

      <Divider />

      {/* Block Format */}
      <BlockFormatDropdown editor={editor} blockType={blockType} />

      <Divider />

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
      <ToolbarButton
        onClick={() => formatText("strikethrough")}
        active={isStrikethrough}
        icon={<Strikethrough size={18} />}
        title="Strikethrough"
      />
      <ToolbarButton
        onClick={() => formatText("code")}
        active={isCode}
        icon={<Code size={18} />}
        title="Code"
      />

      <Divider />

      {/* Lists */}
      <ToolbarButton
        onClick={() => formatList("ul")}
        active={blockType === "ul"}
        icon={<List size={18} />}
        title="Bullet List"
      />
      <ToolbarButton
        onClick={() => formatList("ol")}
        active={blockType === "ol"}
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
      <ToolbarButton
        onClick={() => formatAlignment("justify")}
        icon={<AlignJustify size={18} />}
        title="Justify"
      />

      <Divider />

      {/* Link */}
      <ToolbarButton
        onClick={insertLink}
        active={isLink}
        icon={<Link size={18} />}
        title="Insert Link"
      />
      {/* Image (insert via URL or file upload) */}
      <ToolbarButton
        onClick={() => {
          // Create file input for image upload
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
              // Create a FileReader to convert file to data URL
              const reader = new FileReader();
              reader.onload = (event) => {
                const dataUrl = event.target.result;
                try {
                  editor.update(() => {
                    const img = $createImageNode({
                      src: dataUrl,
                      altText: file.name || "Image",
                      width: "auto",
                      height: "auto",
                    });
                    $insertNodes([img]);
                  });
                } catch (err) {
                  console.error("Failed to insert image:", err);
                }
              };
              reader.onerror = () => {
                console.error("Failed to read file");
              };
              reader.readAsDataURL(file);
            }
          };
          input.click();
        }}
        icon={<Image size={18} />}
        title="Insert Image (Upload or URL)"
      />
    </div>
  );
}
