import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export default function AutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when component mounts, but only if there's no initial content
    // Delay to ensure editor is fully initialized
    const timer = setTimeout(() => {
      try {
        const rootElement = editor.getRootElement();
        if (rootElement && rootElement.childNodes.length > 0) {
          // Editor has content, focus without selection to avoid IndexSizeError
          rootElement.focus();
        } else {
          // Editor is empty, safe to focus normally
          editor.focus();
        }
      } catch (error) {
        // Silently handle selection errors
        console.warn("AutoFocus error:", error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [editor]);

  return null;
}
