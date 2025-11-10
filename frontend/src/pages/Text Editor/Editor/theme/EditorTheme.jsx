const EditorTheme = {
  // Paragraph styling
  paragraph: 'mb-2 text-gray-800',
  
  // Heading styles
  heading: {
    h1: 'text-4xl font-bold mb-4 text-gray-900',
    h2: 'text-3xl font-bold mb-3 text-gray-900',
    h3: 'text-2xl font-bold mb-2 text-gray-900',
  },
  
  // List styles
  list: {
    nested: {
      listitem: 'list-none',
    },
    ol: 'list-decimal ml-6 mb-2',
    ul: 'list-disc ml-6 mb-2',
    listitem: 'mb-1',
  },
  
  // Text formatting
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    code: 'bg-gray-100 px-1 py-0.5 rounded font-mono text-sm',
  },
  
  // Link styling
  link: 'text-blue-600 underline hover:text-blue-800',
  
  // Code block
  code: 'bg-gray-900 text-white p-4 rounded-lg font-mono text-sm block my-4',
  
  // Quote
  quote: 'border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4',
};

export default EditorTheme;



