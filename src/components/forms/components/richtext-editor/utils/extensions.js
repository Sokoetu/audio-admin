import { Extension } from '@tiptap/react';
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";

import { lowlight } from "lowlight";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import python from "highlight.js/lib/languages/python";

import Span from './span';
import Image from './custom-image';

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
lowlight.registerLanguage("python", python);

const CodeExtension = Extension.create({
  name: 'code',
  content: 'text*',
  group: 'block',
  parseHTML() {
    return [
      {
        tag: 'code',
        contentElement: (el) => {
          const spanElements = Array.from(el.getElementsByTagName('span'));

          const content = spanElements.map((span) => ({
            type: 'text',
            text: span.innerText,
          }));

          return { content };
        },
        getAttrs: (dom) => ({
          class: dom.getAttribute('class'),
        }),
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['code', HTMLAttributes, 0];
  },
  addAttributes() {
    return {
      class: { default: null },
    };
  },
  toDOM(node) {
    return ['code', { class: node.attrs.class }, 0];
  },
});

let extensions = [
    CharacterCount,
    CodeExtension,
    // Image, 
    Span,
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    CodeBlockLowlight.configure({
      lowlight,
      defaultLanguage: "javascript",
    }),
    Image.configure({

      inline: true,
      allowBase64: true,
      HTMLAttributes: {
        class: "tiptap-img",
      },
      renderHTML: {
        style: ""
      }
      
    }),
    Link,
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
      heading: {
        levels: [2, 3, 4, 5, 6],
      },
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
      alignments: ["left", "center", "right", "justify"],
    }),
    Underline,
]

export default extensions; 