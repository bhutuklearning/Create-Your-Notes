import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { $getRoot } from "lexical";

export default function CharacterCountPlugin() {
  const [editor] = useLexicalComposerContext();
  const [stats, setStats] = useState({ characters: 0, words: 0 });

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const text = root.getTextContent();

        const characters = text.length;
        const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

        setStats({ characters, words });
      });
    });
  }, [editor]);

  return (
    <div className="stats-bar">
      <span>Words: {stats.words}</span>
      <span className="separator">•</span>
      <span>Characters: {stats.characters}</span>
    </div>
  );
}
