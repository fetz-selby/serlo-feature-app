import { createContext, ReactNode, useState, useContext } from 'react';
import { SavedComment } from '../interfaces';

interface Props {
  children: ReactNode;
}

interface DataProps {
  comments: SavedComment[];
  saveComment: (e: SavedComment) => void;
  jsonToBeSaved: string;
  saveJSON: (json: string) => void;
}

const initialData: DataProps = {
  comments: [],
  saveComment: (e: SavedComment) => {},
  jsonToBeSaved: '',
  saveJSON: (json: string) => {},
};

const CommentContext = createContext(initialData);
const useCommentContext = () => useContext(CommentContext);

const CommentProvider = ({ children }: Props) => {
  const [comments, setComment] = useState(initialData.comments);
  const [jsonToBeSaved, setJsonToBeSaved] = useState('');

  const contextValue = {
    comments,
    saveComment: (comment: SavedComment) => {
      // Put latest comment on top
      setComment((prev) => [comment, ...prev]);
    },
    saveJSON: (json: string) => {
      setJsonToBeSaved(json);
    },
    jsonToBeSaved,
  };

  return (
    <CommentContext.Provider value={contextValue}>
      {children}
    </CommentContext.Provider>
  );
};

export { CommentProvider, useCommentContext };
