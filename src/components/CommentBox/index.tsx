import { SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import { CommentBoxComponentProps, CommentBoxProps } from '../../interfaces';
import { useCommentContext } from '../../context/CommentContext';
import { ColumnContainer, RowContainer } from '../../layout';
import { FormattingBar } from './FormattingBar';
import { FormattingBarIconTypes } from './types';

enum ControlEvent {
  SAVE = 'save',
  CANCEL = 'cancel',
}

interface ControlProps {
  onControlClicked: (controlType: ControlEvent) => (e: SyntheticEvent) => void;
}

const Box = styled(ColumnContainer)<{ x: number; y: number }>`
  top: ${(props) => props.y + 10}px;
  left: ${(props) => props.x}px;
  position: absolute;
  font-size: 12px;
  min-width: 200px;
  border-radius: 0.2rem;
  border: 1px solid #eaeaea;
  padding: 0.5rem;
`;

const Title = styled.h4`
  padding: 0;
  margin: 0;
  padding: 0.2rem 0 0.5rem 0;
`;

const CommentArea = styled.textarea`
  width: 97%;
  min-height: 4rem;
  border-color: #dedede;
`;

const CancelLink = styled.a`
  display: flex;
  align-items: center;
  margin: 0 1rem;
  cursor: pointer;
  color: #1565c0;
  text-decoration: none;
`;

const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  background: #90caf9;
  color: #fefefe;
  border: 0;
  cursor: pointer;
`;

const ControlsContainer = styled(RowContainer)`
  padding: 1rem 0 0 0;
  justify-content: flex-end;
`;

const Controls = ({ onControlClicked }: ControlProps) => {
  return (
    <ControlsContainer>
      <CancelLink onClick={onControlClicked(ControlEvent.CANCEL)}>
        Cancel
      </CancelLink>
      <SaveButton onClick={onControlClicked(ControlEvent.SAVE)}>
        Save
      </SaveButton>
    </ControlsContainer>
  );
};

const CommentBox = ({
  selectedText,
  x,
  y,
  onHide,
  onFormatActionClicked,
}: CommentBoxComponentProps) => {
  const { saveComment } = useCommentContext();
  const [comment, setComment] = useState('');

  const handleControlEvent =
    (controlEvent: ControlEvent) => (e: SyntheticEvent) => {
      switch (controlEvent) {
        case ControlEvent.CANCEL: {
          break;
        }
        case ControlEvent.SAVE: {
          saveComment({
            x,
            y,
            selectedText,
            comment,
            date: new Date(),
          });
          break;
        }
      }
      onHide(comment);
    };

  return selectedText ? (
    <Box x={x} y={y}>
      {/* <Title>Unknown Title</Title> */}
      <FormattingBar onFormatClicked={onFormatActionClicked} />
      <CommentArea onChange={(e) => setComment(e.target.value)} />
      <Controls onControlClicked={handleControlEvent} />
    </Box>
  ) : null;
};

export { CommentBox };
