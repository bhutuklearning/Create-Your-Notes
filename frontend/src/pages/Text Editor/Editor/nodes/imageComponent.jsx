import React, { useRef, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  KEY_DELETE_COMMAND,
  KEY_BACKSPACE_COMMAND,
} from "lexical";
import { Trash2 } from "lucide-react";

export default function ImageComponent({
  src,
  altText,
  width,
  height,
  nodeKey,
}) {
  const [editor] = useLexicalComposerContext();
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = useState(false);
  const imageRef = useRef(null);

  // Handle image selection
  const onDelete = (event) => {
    if (isSelected && $isNodeSelection($getSelection())) {
      event.preventDefault();
      const node = $getNodeByKey(nodeKey);
      if (node) {
        node.remove();
      }
    }
    return false;
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CLICK_COMMAND,
        (event) => {
          if (event.target === imageRef.current) {
            if (!event.shiftKey) {
              clearSelection();
            }
            setSelected(!isSelected);
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, isSelected, nodeKey]);

  return (
    <div className="relative inline-block my-4">
      <img
        ref={imageRef}
        src={src}
        alt={altText}
        style={{ width, height }}
        className={`
          max-w-full h-auto cursor-pointer rounded-lg
          ${isSelected ? "ring-4 ring-blue-500" : ""}
        `}
        draggable={false}
      />

      {/* Delete button when selected */}
      {isSelected && (
        <button
          onClick={() => {
            editor.update(() => {
              const node = $getNodeByKey(nodeKey);
              if (node) {
                node.remove();
              }
            });
          }}
          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
          title="Delete Image"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
