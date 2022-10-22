import { SyntheticEvent } from "react";
import styled from "styled-components";
import { CommentBoxProps } from "../../interfaces";

enum ControlEvent {
  SAVE = "save",
  CANCEL = "cancel",
}

interface ControlProps {
  onControlClicked: (controlType: ControlEvent) => (e: SyntheticEvent) => void;
}

const Box = styled.div<{ x: number; y: number }>`
  top: ${(props) => props.y + 10}px;
  left: ${(props) => props.x}px;
  position: absolute;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  background: black;
  min-width: 100px;
  color: white;
  border-radius: 0.2rem;
  padding: 0.2rem;
`;

const Title = styled.h3`
  padding: 0;
  margin: 0;
`;

const CommentArea = styled.textarea`
  width: 97%;
`;

const CancelLink = styled.a`
  text-decoration: none;
`;

const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  background: #1976d2;
  color: #fefefe;
  border: 0;
  cursor: pointer;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
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
}: CommentBoxProps & { onHide: () => void }) => {
  const handleControlEvent =
    (controlEvent: ControlEvent) => (e: SyntheticEvent) => {
      switch (controlEvent) {
        case ControlEvent.CANCEL: {
          break;
        }
        case ControlEvent.SAVE: {
          break;
        }
      }
      onHide();
    };

  return selectedText ? (
    <Box x={x} y={y}>
      <Title>Unknown Title</Title>
      <CommentArea />
      <Controls onControlClicked={handleControlEvent} />
      {selectedText}
    </Box>
  ) : null;
};

export { CommentBox };
