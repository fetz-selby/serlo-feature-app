import { useState, useCallback } from 'react';
import {
  Editor,
  createEditor,
  BaseEditor,
  Descendant,
  Transforms,
  Text,
} from 'slate';
import { Slate, Editable, ReactEditor, withReact } from 'slate-react';
import { CommentBoxProps } from '../../interfaces';
import { CommentBox } from '../CommentBox';

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const Leaf = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
};

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Please call me Mr. as in Herr in German!' }],
  },
];

const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const SlateCommentBox = () => {
  // Create a Slate editor object that won't change across renders.
  const [isShow, setIsShow] = useState(false);
  const [editor] = useState(() => withReact(createEditor()));
  const [selected, setSelected] = useState<CommentBoxProps>({
    x: 0,
    y: 0,
    selectedText: null,
  });

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  const handleOnHighlight = (e: { clientX: number; clientY: number }) => {
    /*
        Upon highlighting check if the selection indeed has a string
        of length greater than 0
    */

    if (
      editor &&
      editor.selection &&
      Editor.string(editor, editor.selection).length
    ) {
      console.log('[PASSED]came here!');

      setIsShow(true);
      setSelected({
        x: e.clientX,
        y: e.clientY,
        selectedText: Editor.string(editor, editor.selection),
      });
    }

    // Transforms.setNodes(
    //   editor,
    //   // @ts-ignore
    //   { bold: true },
    //   {
    //     match: (n) => Text.isText(n),
    //     split: true,
    //   }
    // );
    console.log('Event, ', e);
    console.log('Editor, ', editor);
  };

  const { x, y, selectedText } = selected;

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onMouseUp={handleOnHighlight}
      />
      {isShow && (
        <CommentBox
          x={x}
          y={y}
          selectedText={selectedText}
          onHide={() => setIsShow(false)}
        />
      )}
    </Slate>
  );
};

export { SlateCommentBox };
