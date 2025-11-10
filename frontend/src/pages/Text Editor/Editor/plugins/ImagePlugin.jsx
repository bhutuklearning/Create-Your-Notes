import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { COMMAND_PRIORITY_EDITOR } from "lexical";
import { $insertNodes } from "lexical";
import { $createImageNode } from "../nodes/ImageNode";

// Custom command to insert image
export const INSERT_IMAGE_COMMAND = "INSERT_IMAGE_COMMAND";

export default function ImagePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Listen for INSERT_IMAGE_COMMAND
    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const imageNode = $createImageNode(payload);
        $insertNodes([imageNode]);
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
