

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export default function AutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor after component mounts
    editor.focus();
  }, [editor]);

  return null; // This plugin doesn't render anything
}
