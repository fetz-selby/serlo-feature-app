import { RowContainer } from '../../layout';
import { Sidebar } from '../Sidebar';
import styled from 'styled-components';
import { SlateCommentBox } from '../SlateCommentBox';
import { Preview } from '../Preview';
import { useState } from 'react';
import { useCommentContext } from '../../context/CommentContext';
import { Button, Stack, Typography } from '@mui/material';
import svg from '../../assets/images/serlo-logo.svg';

interface Props {
  sentence: string;
}

const Container = styled(RowContainer)`
  padding: 0 10rem 2rem 10rem;
`;

const ImageContainer = styled(RowContainer)`
  padding: 1;
  align-items: center;
  justify-content: center;
`;

const SentenceContainer = styled.div`
  padding: 2rem;
  border: 1px solid #eaeaea;
`;

const Editor = ({ sentence }: Props) => {
  const [showDialog, setShowDialog] = useState(false);
  const { jsonToBeSaved } = useCommentContext();

  return (
    <Stack>
      <ImageContainer>
        <img width="164px" height="164px" src={svg} />
        <Typography
          sx={{
            padding: '65px 10px 5px 10px',
            fontSize: '12px',
            letterSpacing: '1px',
            fontWeight: '600',
          }}
        >
          Text Formatter and Commenter
        </Typography>
      </ImageContainer>
      <Container>
        <Sidebar />
        <SentenceContainer>
          <SlateCommentBox />
        </SentenceContainer>
        <Preview
          open={showDialog}
          jsonToBeSaved={jsonToBeSaved}
          onClose={() => setShowDialog(false)}
        />
      </Container>
      <Button color="primary" onClick={() => setShowDialog(true)}>
        View Data to be Saved
      </Button>
    </Stack>
  );
};

export { Editor };
