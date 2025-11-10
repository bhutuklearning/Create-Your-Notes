import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { $getRoot } from "lexical";

export default function MaxLengthPlugin({ maxLength = 5000 }) {
  const [editor] = useLexicalComposerContext();
  const [length, setLength] = useState(0);
  const [isOverLimit, setIsOverLimit] = useState(false);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const text = root.getTextContent();
        const currentLength = text.length;

        setLength(currentLength);
        setIsOverLimit(currentLength > maxLength);

        if (currentLength > maxLength) {
          console.warn(
            `Character limit exceeded: ${currentLength}/${maxLength}`
          );
        }
      });
    });
  }, [editor, maxLength]);

  return (
    <div className={`character-count ${isOverLimit ? "over-limit" : ""}`}>
      <span>{length}</span> / {maxLength}
    </div>
  );
}
