// Import necessary modules from '@tiptap/core'
import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core';

// Define the ImageOptions interface
export interface ImageOptions {
  inline: boolean;
  allowBase64: boolean;
  HTMLAttributes: Record<string, any>;
}

// Extend the Commands interface to include the custom image commands
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      setImage: (options: { src: string, alt?: string, title?: string, style?: string }) => ReturnType;
    };
  }
}

// Define the input regex for image
export const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

// Create a custom Image extension
export const CustomImage = Node.create<ImageOptions>({
  name: 'image', // Change the extension name if needed

  // Add options for the extension
  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    };
  },

  // Define whether the extension is inline or block
  inline() {
    return this.options.inline;
  },

  // Define the group for the extension
  group() {
    return this.options.inline ? 'inline' : 'block';
  },

  // Enable dragging for the extension
  draggable: true,

  // Add attributes for the extension
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      style: {
        default: null,
      },
    };
  },

  // Specify how to parse HTML for the extension
  parseHTML() {
    return [
      {
        tag: this.options.allowBase64 ? 'img[src]' : 'img[src]:not([src^="data:"])',
      },
    ];
  },

  // Specify how to render HTML for the extension
  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  // Add custom commands for the extension
  addCommands() {
    return {
      setImage: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        });
      },
    };
  },

  // Add input rules for the extension
  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: match => {
          const [,, alt, src, title, style] = match;
          return { src, alt, title, style };
        },
      }),
    ];
  },
});

export default CustomImage;


