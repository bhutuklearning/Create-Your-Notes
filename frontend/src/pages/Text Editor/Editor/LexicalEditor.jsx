import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";

import EditorTheme from "./theme/EditorTheme";
import AutoFocusPlugin from "./plugins/AutoFocusPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import EditorToolbar from "./EditorToolbar";
import ImagePlugin from "./plugins/ImagePlugin"; // ← NEW
import { ImageNode } from "./nodes/ImageNode"; // ← NEW

export default function LexicalEditor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme: EditorTheme,
    onError: (error) => {
      console.error(error);
    },
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      ImageNode, // ← NEW: Register ImageNode
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative bg-white rounded-lg border border-gray-200">
        {/* Toolbar */}
        <ToolbarPluginWrapper />
        {/* Editor Area */}
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[450px] p-8 outline-none text-gray-800" />
            }
            placeholder={
              <div className="absolute top-8 left-8 text-gray-400 pointer-events-none">
                Start typing your notes here...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        {/* Plugins */}
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <ImagePlugin /> {/* ← NEW: Enable image functionality */}
      </div>
    </LexicalComposer>
  );
}

function ToolbarPluginWrapper() {
  const toolbarData = ToolbarPlugin();
  return <EditorToolbar {...toolbarData} />;
}
