import { useState, useCallback } from 'react';
import { Editor, createEditor, Descendant, Transforms, Text } from 'slate';
import {
  Slate,
  Editable,
  withReact,
  RenderLeafProps,
  RenderElementProps,
} from 'slate-react';
import { useCommentContext } from '../../context/CommentContext';
import { CommentValueProps, CustomTextOption, Maybe } from '../../interfaces';
import { removeItem } from '../../utils';
import { CommentBox } from '../CommentBox';
import { CustomLeaf } from '../CustomLeaf';
import { DefaultEditorElement } from '../DefaultEditorElement';
import { FormattingBarIconTypes } from '../Toolbar/types';

const getInitialValue = (text: string): Descendant[] => [
  {
    type: 'paragraph',
    children: [
      {
        text,
        options: { format: [FormattingBarIconTypes.DEFAULT], comment: null },
      },
    ],
  },
];

const SlateCommentBox = ({ initialText }: { initialText: string }) => {
  // Create a Slate editor object that won't change across renders.
  const [isShow, setIsShow] = useState(false);
  const { saveJSON } = useCommentContext();
  const [customTextAttr, setCustomTextAttr] = useState<{
    options: CustomTextOption;
  }>({
    options: {
      format: [FormattingBarIconTypes.DEFAULT],
      comment: null,
    },
  });
  const [editor] = useState(() => withReact(createEditor()));
  const [selected, setSelected] = useState<CommentValueProps>({
    x: 0,
    y: 0,
    selectedText: null,
  });

  const renderElement = useCallback(
    (props: RenderElementProps) => <DefaultEditorElement {...props} />,
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <CustomLeaf {...props} />,
    []
  );

  const handleOnHighlight = (e: { clientX: number; clientY: number }) => {
    /*
        Upon highlighting check if the selection indeed has a string
        of length greater than 0. If true then show the dialog else hide
    */

    const { clientX, clientY } = e;

    if (
      editor &&
      editor.selection &&
      Editor.string(editor, editor.selection).length > 1
    ) {
      setIsShow(true);
      setSelected({
        x: clientX,
        y: clientY,
        selectedText: Editor.string(editor, editor.selection),
      });

      /* This re-initializes the formatting because previous format
       * still exists. Could be improved by first checking if a formatting
       * has already been applied. if yes, it uses that value and if no, it continues
       * with re-initialization
       */
      setCustomTextAttr((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          format: [FormattingBarIconTypes.DEFAULT],
        },
      }));
    } else {
      setIsShow(false);
    }
  };
  const handleOnFormatActionClicked = (
    action: FormattingBarIconTypes,
    state: boolean
  ) => {
    /**
     * If icon is singly clicked apply the effect, else if doubly clicked, undo the effect.
     * And if none is available, apply the default
     */

    setCustomTextAttr((prev) => {
      const { format } = prev.options;
      if (state) {
        return {
          ...prev,
          options: {
            ...prev.options,
            format: [...format, action],
          },
        };
      }
      if (format.includes(action)) {
        return {
          ...prev,
          options: { ...prev.options, format: removeItem(action, format) },
        };
      }
      return {
        ...prev,
        options: { ...prev.options, format: [FormattingBarIconTypes.DEFAULT] },
      };
    });
  };

  const handleOnCommentBoxHide = (comment: Maybe<string>) => {
    setCustomTextAttr((prev) => {
      return { ...prev, options: { ...prev.options, comment } };
    });

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
    <Slate
      editor={editor}
      value={getInitialValue(initialText)}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => 'set_selection' !== op.type
        );
        if (isAstChange) {
          // Push data to context (CommentProvider)
          saveJSON(JSON.stringify(value));
        }
      }}
    >
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
