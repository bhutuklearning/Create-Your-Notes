import React, { useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";
// Custom nodes
import { ImageNode } from "./nodes";

import EditorTheme from "./theme/EditorTheme";
import AutoFocusPlugin from "./plugins/AutoFocusPlugin";
import OnChangePlugin from "./plugins/OnChangePlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import Toolbar from "./toolbar/Toolbar";
import LexicalContentEditable from "./ui/ContentEditable";
import Placeholder from "./ui/Placeholder";

import "./styles/editor.css";

// Plugins (new)
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatPlugin";
import CharacterCountPlugin from "./plugins/CharacterCountPlugin";
import MaxLengthPlugin from "./plugins/MaxLengthPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

function ToolbarPluginWrapper() {
  const toolbarData = ToolbarPlugin();
  return <Toolbar {...toolbarData} />;
}

export default function LexicalEditor({
  onSave,
  showDebug = false,
  showStats = true,
  maxLength = null,
  initialContent = null,
}) {
  const [editorState, setEditorState] = useState(null);

  // Handle content changes
  const handleChange = (newEditorState) => {
    // Convert to JSON for saving
    const json = newEditorState.toJSON();
    const jsonString = JSON.stringify(json);
    setEditorState(jsonString);

    // Call parent's save function if provided
    if (onSave) {
      onSave(jsonString);
    }
  };

  const initialConfig = {
    namespace: "MyAwesomeEditor",
    theme: EditorTheme,
    onError: (error) => {
      console.error("Lexical Error:", error);
    },
    editorState: initialContent ? JSON.stringify(initialContent) : undefined,
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      CodeNode,
      ImageNode,
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        {/* Toolbar */}
        <ToolbarPluginWrapper />

        {/* Editor */}
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<LexicalContentEditable />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>

        {/* Floating Toolbar (appears on text selection) */}
        <FloatingTextFormatToolbarPlugin />

        {/* Core Plugins */}
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <LinkPlugin />
        <OnChangePlugin onChange={handleChange} />
        <AutoLinkPlugin />

        {/* Optional Plugins */}
        {showStats && <CharacterCountPlugin />}
        {maxLength && <MaxLengthPlugin maxLength={maxLength} />}
        {showDebug && <TreeViewPlugin />}
      </div>
    </LexicalComposer>
  );
}
