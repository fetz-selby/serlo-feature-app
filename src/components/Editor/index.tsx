import { useEffect, useState, useRef } from 'react';
import { CommentBox } from '../CommentBox';
import { CommentBoxProps } from '../../interfaces';
import { RowContainer } from '../../layout';
import { Sidebar } from '../Sidebar';
import styled from 'styled-components';
import { SlateCommentBox } from '../SlateCommentBox';

interface Props {
  sentence: string;
}

const Container = styled(RowContainer)`
  padding: 1rem;
`;

const SentenceContainer = styled.div`
  padding: 0 2rem;
`;

const Editor = ({ sentence }: Props) => {
  const [isShow, setIsShow] = useState(false);
  const [selected, setSelected] = useState<CommentBoxProps>({
    x: 0,
    y: 0,
    selectedText: null,
  });

  const ref = useRef<HTMLParagraphElement>(null);

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
      setSelected({ x: clientX, y: clientY, selectedText });
    }
    setIsShow(isShow);
  };

  const { x, y, selectedText } = selected;

  return (
    <Container>
      <Sidebar />
      <SentenceContainer>
        {/* <p ref={ref}>{sentence}</p> */}
        {/* {isShow && (
          <CommentBox
            x={x}
            y={y}
            beginsAt={beginsAt}
            endsAt={endsAt}
            selectedText={selectedText}
            onHide={() => setIsShow(false)}
          />
        )} */}
        <SlateCommentBox />
      </SentenceContainer>
    </Container>
  );
};

export { Editor };
