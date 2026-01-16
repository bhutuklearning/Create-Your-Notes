const EditorTheme = {
  // Block-level elements
  paragraph: "editor-paragraph",
  quote: "editor-quote",

  // Headings
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
  },

  // Lists
  list: {
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
    listitem: "editor-listitem",
    listitemChecked: "editor-listitem-checked",
    listitemUnchecked: "editor-listitem-unchecked",
  },

  // Text formatting
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
    strikethrough: "editor-text-strikethrough",
    code: "editor-text-code",
    subscript: "editor-text-subscript",
    superscript: "editor-text-superscript",
  },

  // Links
  link: "editor-link",

  // Code blocks
  code: "editor-code",
  codeHighlight: {
    comment: "editor-token-comment",
    punctuation: "editor-token-punctuation",
    property: "editor-token-property",
    selector: "editor-token-selector",
    operator: "editor-token-operator",
    attr: "editor-token-attr",
    variable: "editor-token-variable",
    function: "editor-token-function",
  },

  // Images
  image: "editor-image",

  // Tables (optional)
  table: "editor-table",
  tableCell: "editor-table-cell",
  tableCellHeader: "editor-table-cell-header",
};

export default EditorTheme;
