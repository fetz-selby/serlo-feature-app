import { FormattingBarIconTypes } from '../components/CommentBox/types';

export type Maybe<T> = T | null | undefined;

export interface CommentBoxProps {
  selectedText: Maybe<string>;
  x: number;
  y: number;
  onFormatActionClicked: (action: FormattingBarIconTypes) => void;
}

export type CommentValueProps = Omit<CommentBoxProps, 'onFormatActionClicked'>;

export type CommentBoxComponentProps = CommentValueProps & {
  onHide: (comment?: string) => void;
  onFormatActionClicked: (action: FormattingBarIconTypes) => void;
};

export type SavedComment = CommentValueProps & {
  date: Date;
  comment: string;
};
