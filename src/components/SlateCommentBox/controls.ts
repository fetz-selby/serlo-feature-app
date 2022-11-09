import { BaseEditor, Transforms, Text } from 'slate';
import { ReactEditor } from 'slate-react';

const getControl = (control: string, editor: BaseEditor & ReactEditor) => {
  switch (control) {
    case 'b': {
      Transforms.setNodes(
        editor,
        // @ts-ignore
        { bold: true },
        // Apply it to text nodes, and split the text node up if the
        // selection is overlapping only part of it.
        // @ts-ignore
        {
          match: (n) => {
            console.log('Text.isText(n), ', n);
            return Text.isText(n);
          },
          split: true,
        }
      );
    }
  }
};

export { getControl };
