import { useEffect, useState, useRef } from "react";
import { CommentBox } from "../CommentBox";
import { CommentBoxProps } from "../../interfaces";

interface Props {
  sentence: string;
}

const SentenceBox = ({ sentence }: Props) => {
  const [isShow, setIsShow] = useState(false);
  const [selected, setSelected] = useState<CommentBoxProps>({
    x: 0,
    y: 0,
    beginsAt: 0,
    endsAt: 0,
    selectedText: null,
  });

  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.onmouseup = handlerText;
  }, [ref]);

  const handlerText = ({ clientX, clientY }: MouseEvent) => {
    const selection = document.getSelection() as Selection;
    const { anchorOffset: beginsAt, focusOffset: endsAt } = selection;

    const selectedText = selection.toString();
    const isShow = !!selectedText.trim().length;

    if (isShow) {
      setSelected({ x: clientX, y: clientY, selectedText, beginsAt, endsAt });
    }
    setIsShow(isShow);
  };

  const { x, y, beginsAt, endsAt, selectedText } = selected;

  return (
    <>
      <pre ref={ref}>{sentence}</pre>
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
    </>
  );
};

export { SentenceBox };
