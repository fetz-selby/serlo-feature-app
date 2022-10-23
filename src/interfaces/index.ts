export type Maybe<T> = T | null | undefined;

export interface CommentBoxProps {
  selectedText: Maybe<string>;
  beginsAt: number;
  endsAt: number;
  x: number;
  y: number;
}

export type SavedComment = CommentBoxProps & {
  date: Date;
  comment: string;
};
