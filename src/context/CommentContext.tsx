import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { SavedComment } from "../interfaces";

interface Props {
  children: ReactNode;
}

interface DataProps {
  comments: SavedComment[];
  saveComment: (e: SavedComment) => void;
}

const initialData: DataProps = {
  comments: [],
  saveComment: (e: SavedComment) => {},
};
const CommentContext = createContext(initialData);
const useCommentContext = () => useContext(CommentContext);

const CommentProvider = ({ children }: Props) => {
  const [comments, setComment] = useState(initialData.comments);

  useEffect(() => {
    console.log("comments now, ", comments);
  }, [comments]);

  const contextValue = {
    comments,
    saveComment: (comment: SavedComment) => {
      // Put latest comment on top
      setComment((prev) => [comment, ...prev]);
    },
  };

  return (
    <CommentContext.Provider value={contextValue}>
      {children}
    </CommentContext.Provider>
  );
};

export { CommentProvider, useCommentContext };
