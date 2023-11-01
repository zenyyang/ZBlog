"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";
import { useEffect } from "react";

type Props = {
  content?: string;
};

function ContentView({ content }: Props) {
  const { resolvedTheme } = useTheme();
  const editor: BlockNoteEditor = useBlockNote({
    editable: false,
    initialContent: content
      ? (JSON.parse(content) as PartialBlock[])
      : undefined,
  });

  return (
    <div>
      <BlockNoteView
        className="-pl-20"
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
}

export default ContentView;
