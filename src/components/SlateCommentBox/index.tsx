import { useState, useCallback } from 'react';
import {
  Editor,
  createEditor,
  BaseEditor,
  Descendant,
  Transforms,
  Text,
} from 'slate';
import {
  Slate,
  Editable,
  ReactEditor,
  withReact,
  RenderLeafProps,
  RenderElementProps,
} from 'slate-react';
import { CommentValueProps } from '../../interfaces';
import { CommentBox } from '../CommentBox';
import { FormattingBarIconTypes } from '../CommentBox/types';
import { CustomLeaf } from '../CustomLeaf';

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = {
  format: FormattingBarIconTypes;
  comment?: string;
  text: string;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'Please call me Mr. as in Herr in German!',
        format: FormattingBarIconTypes.FORMAT_DEFAULT,
      },
    ],
  },
];

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const SlateCommentBox = () => {
  // Create a Slate editor object that won't change across renders.
  const [isShow, setIsShow] = useState(false);
  const [customTextAttr, setCustomTextAttr] = useState({
    format: FormattingBarIconTypes.FORMAT_DEFAULT,
    comment: '',
  });
  const [editor] = useState(() => withReact(createEditor()));
  const [selected, setSelected] = useState<CommentValueProps>({
    x: 0,
    y: 0,
    selectedText: null,
  });

  const renderElement = useCallback(
    (props: RenderElementProps) => <DefaultElement {...props} />,
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <CustomLeaf {...props} />,
    []
  );

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
      setIsShow(true);
      setSelected({
        x: e.clientX,
        y: e.clientY,
        selectedText: Editor.string(editor, editor.selection),
      });
    }
  };

  const handleOnFormatActionClicked = (action: FormattingBarIconTypes) => {
    setCustomTextAttr((prev) => ({ ...prev, format: action }));
  };

  const handleOnCommentBoxHide = (comment?: string) => {
    if (comment) {
      setCustomTextAttr((prev) => ({ ...prev, comment }));
    }
    setIsShow(false);
  };

  Transforms.setNodes(
    editor,
    { ...customTextAttr },
    {
      match: (n) => Text.isText(n),
      split: true,
    }
  );

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
          onHide={handleOnCommentBoxHide}
          onFormatActionClicked={handleOnFormatActionClicked}
        />
      )}
    </Slate>
  );
};

export { SlateCommentBox };
