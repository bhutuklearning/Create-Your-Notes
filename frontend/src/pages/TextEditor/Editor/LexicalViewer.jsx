import React, { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";
// Custom nodes
import { ImageNode } from "./nodes";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

import EditorTheme from "./theme/EditorTheme";
import "./styles/editor.css";

// Plugin to load initial content
function LoadContentPlugin({ content }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (content) {
      try {
        // Parse the content and set it as editor state
        const editorState = editor.parseEditorState(JSON.stringify(content));
        editor.setEditorState(editorState);
      } catch (error) {
        console.error("Error loading content:", error);
      }
    }
  }, [content, editor]);

  return null;
}

export default function LexicalViewer({ content }) {
  const initialConfig = {
    namespace: "LexicalViewer",
    theme: EditorTheme,
    editable: false, // Make it read-only
    onError: (error) => {
      console.error("Lexical Viewer Error:", error);
    },
    editorState: content ? JSON.stringify(content) : undefined,
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
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input prose prose-lg max-w-none"
                style={{
                  outline: "none",
                  cursor: "default",
                  userSelect: "text",
                }}
              />
            }
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <ListPlugin />
        <LinkPlugin />
        {content && <LoadContentPlugin content={content} />}
      </div>
    </LexicalComposer>
  );
}
