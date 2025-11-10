import { DecoratorNode } from "lexical";

// This class defines an Image Node
export class ImageNode extends DecoratorNode {
  __src; // Image URL
  __altText; // Alt text for accessibility
  __width; // Image width
  __height; // Image height

  // Create new image node
  static getType() {
    return "image";
  }

  // Make a copy of this node
  static clone(node) {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__width,
      node.__height,
      node.__key
    );
  }

  // Constructor - called when creating new image
  constructor(src, altText, width, height, key) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width || "auto";
    this.__height = height || "auto";
  }

  // Save/Load from JSON (for saving notes)
  exportJSON() {
    return {
      type: "image",
      src: this.__src,
      altText: this.__altText,
      width: this.__width,
      height: this.__height,
      version: 1,
    };
  }

  static importJSON(serializedNode) {
    const { src, altText, width, height } = serializedNode;
    return $createImageNode({ src, altText, width, height });
  }

  // Render the actual image component
  decorate() {
    return (
      <ImageComponent
        src={this.__src}
        altText={this.__altText}
        width={this.__width}
        height={this.__height}
        nodeKey={this.getKey()}
      />
    );
  }
}

// Helper function to create image node
export function $createImageNode({ src, altText, width, height }) {
  return new ImageNode(src, altText, width, height);
}

// Check if node is an image
export function $isImageNode(node) {
  return node instanceof ImageNode;
}
