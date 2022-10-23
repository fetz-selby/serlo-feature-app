import styled from "styled-components";
import { useCommentContext } from "../../context/CommentContext";
import { SavedComment } from "../../interfaces";
import { ColumnContainer, RowContainer } from "../../layout";

const SidebarContainer = styled(ColumnContainer)`
  padding: 1rem;
  margin-right: 1rem;
  border: 1px solid #eaeaea;
`;

const SidebarItemContainer = styled(ColumnContainer)`
  max-width: 12rem;
  padding: 0 0 2rem 0;
`;

const UserLabel = styled.h4`
  margin: 0;
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

const CommentText = styled.p`
  margin: 0;
  padding-top: 0.5rem;
  font-size: 14px;
`;

const SidebarItem = ({ date, selectedText, comment }: SavedComment) => {
  return (
    <SidebarItemContainer>
      <UserLabel>Unknow User</UserLabel>
      <DateAndTime>{date.toDateString()}</DateAndTime>
      <RowContainer>
        <PreChar>|</PreChar>
        <SelectedText>{` ${selectedText}`}</SelectedText>
      </RowContainer>
      <CommentText>{comment}</CommentText>
    </SidebarItemContainer>
  );
};

const Sidebar = () => {
  const { comments } = useCommentContext();

  return (
    <SidebarContainer>
      {comments.map((items) => (
        <SidebarItem {...items} />
      ))}
    </SidebarContainer>
  );
};

export { Sidebar };
