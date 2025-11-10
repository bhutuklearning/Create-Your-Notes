import { $isRangeSelection, $getSelection } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { Bold, Italic, Underline, Link as LinkIcon } from "lucide-react";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";

export default function FloatingTextFormatToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isText, setIsText] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isLink, setIsLink] = useState(false);

  const toolbarRef = useRef(null);

  const updateToolbar = useCallback(() => {
    const nativeSelection = window.getSelection();
    const toolbarElem = toolbarRef.current;

    if (toolbarElem === null) return;

    const rootElement = editor.getRootElement();
    if (
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0);
      const rect = domRange.getBoundingClientRect();

      toolbarElem.style.opacity = "1";
      toolbarElem.style.top = `${
        rect.top + window.pageYOffset - toolbarElem.offsetHeight - 10
      }px`;
      toolbarElem.style.left = `${
        rect.left +
        window.pageXOffset +
        rect.width / 2 -
        toolbarElem.offsetWidth / 2
      }px`;

      // Update button states
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat("bold"));
          setIsItalic(selection.hasFormat("italic"));
          setIsUnderline(selection.hasFormat("underline"));
        }
      });
    } else {
      toolbarElem.style.opacity = "0";
    }
  }, [editor]);

  useEffect(() => {
    document.addEventListener("selectionchange", updateToolbar);
    return () => {
      document.removeEventListener("selectionchange", updateToolbar);
    };
  }, [updateToolbar]);

  const formatText = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    }
  };

  return (
    <div ref={toolbarRef} className="floating-text-format-toolbar">
      <button
        onClick={() => formatText("bold")}
        className={`toolbar-item ${isBold ? "active" : ""}`}
        aria-label="Format Bold"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => formatText("italic")}
        className={`toolbar-item ${isItalic ? "active" : ""}`}
        aria-label="Format Italic"
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => formatText("underline")}
        className={`toolbar-item ${isUnderline ? "active" : ""}`}
        aria-label="Format Underline"
      >
        <Underline size={16} />
      </button>
      <button
        onClick={insertLink}
        className={`toolbar-item ${isLink ? "active" : ""}`}
        aria-label="Insert Link"
      >
        <LinkIcon size={16} />
      </button>
    </div>
  );
}
