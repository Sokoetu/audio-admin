import { Mark } from '@tiptap/core';
export default class Span extends Mark {
  get name() {
    return 'span'
  }
  get schema() {
    return {
      attrs: {
        class: {
          default: 'some-class',
        },
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'span[class]',
          getAttrs: dom => ({
            class: dom.getAttribute('class'),
          }),
        },
      ],
      toDOM: node => ['span', {
        ...node.attrs,
      }, 0],
    }
  }
}