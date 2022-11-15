import { Typography } from '@mui/material';
import styled from 'styled-components';
import { useCommentContext } from '../../context/CommentContext';
import { SavedComment } from '../../interfaces';
import { ColumnContainer, RowContainer } from '../../layout';

const SidebarContainer = styled(ColumnContainer)`
  padding: 1rem;
  margin-right: 1rem;
  border: 1px solid #eaeaea;
`;

const SidebarItemContainer = styled(ColumnContainer)`
  max-width: 12rem;
  padding: 0 0 2rem 0;
`;

const DateAndTime = styled.span`
  font-size: 12px;
  color: #a1a1a1;
`;

const SelectedTextDefault = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  padding: 0.1rem 0;
`;

const PreChar = styled(SelectedTextDefault)`
  margin-right: 0.5rem;
`;
const SelectedText = styled(SelectedTextDefault)`
  font-style: italic;
`;

const SidebarItem = ({ date, selectedText, comment }: SavedComment) => {
  return (
    <SidebarItemContainer>
      <DateAndTime>{date.toDateString()}</DateAndTime>
      <RowContainer>
        <PreChar>|</PreChar>
        <SelectedText>{` ${selectedText}`}</SelectedText>
      </RowContainer>
      <Typography sx={{ fontSize: '14px', paddingTop: '10px', width: '200px' }}>
        {comment}
      </Typography>
    </SidebarItemContainer>
  );
};

const DEFAULT_SAVED_COMMENT = {
  selectedText: 'Nothing Selected',
  date: new Date(),
  comment: 'Sometimes commenting on these are great :)',
};

const Sidebar = () => {
  const { comments } = useCommentContext();

  const renderSideItems = comments.length ? comments : [DEFAULT_SAVED_COMMENT];

  //TODO: create an id generator for keys
  return (
    <SidebarContainer>
      {renderSideItems.map((items, i) => (
        <SidebarItem key={i} {...items} />
      ))}
    </SidebarContainer>
  );
};

export { Sidebar };
