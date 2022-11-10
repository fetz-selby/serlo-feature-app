import { RowContainer } from '../../layout';
import { Sidebar } from '../Sidebar';
import styled from 'styled-components';
import { SlateCommentBox } from '../SlateCommentBox';

interface Props {
  sentence: string;
}

const Container = styled(RowContainer)`
  padding: 10rem;
`;

const SentenceContainer = styled.div`
  padding: 2rem;
  border: 1px solid #eaeaea;
`;

const Editor = ({ sentence }: Props) => {
  return (
    <Container>
      <Sidebar />
      <SentenceContainer>
        <SlateCommentBox />
      </SentenceContainer>
    </Container>
  );
};

export { Editor };
