export type Maybe<T> = T | null | undefined;

export interface CommentBoxProps {
  selectedText: Maybe<string>;
  x: number;
  y: number;
}

export type SavedComment = CommentBoxProps & {
  date: Date;
  comment: string;
};
