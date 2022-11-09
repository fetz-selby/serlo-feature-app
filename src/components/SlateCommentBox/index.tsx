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
    beginsAt: 0,
    endsAt: 0,
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

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  const handleOnHighlight = (e: { clientX: number; clientY: number }) => {
    setSelected({
      x: e.clientX,
      y: e.clientY,
      selectedText: null,
      beginsAt: 0,
      endsAt: 0,
    });

    Transforms.setNodes(
      editor,
      // @ts-ignore
      { bold: true },
      // @ts-ignore
      {
        match: (n) => {
          // @ts-ignore
          setSelected((prev) => ({ ...prev, selectedText: n.text }));
          // @ts-ignore
          setIsShow(!!n.text);
          return Text.isText(n);
        },
        split: true,
      }
    );
    console.log('Event, ', e);
    console.log('Editor, ', editor);
  };

  const { x, y, beginsAt, endsAt, selectedText } = selected;

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
          beginsAt={beginsAt}
          endsAt={endsAt}
          selectedText={selectedText}
          onHide={() => setIsShow(false)}
        />
      )}
    </Slate>
  );
};

export { SlateCommentBox };
