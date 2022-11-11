import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { FormattingBarIconTypes } from '../components/Toolbar/types';

export type Maybe<T> = T | null | undefined;

export type CustomTextOption = {
  format: FormattingBarIconTypes[];
  comment: Maybe<string>;
};
type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = {
  options: CustomTextOption;
  text: string;
};
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export interface CommentBoxProps {
  selectedText: Maybe<string>;
  x: number;
  y: number;
  onFormatActionClicked: (action: FormattingBarIconTypes) => void;
}

export type CommentValueProps = Omit<CommentBoxProps, 'onFormatActionClicked'>;

export type CommentBoxComponentProps = CommentValueProps & {
  onHide: (comment: Maybe<string>) => void;
  onFormatActionClicked: (
    action: FormattingBarIconTypes,
    state: boolean
  ) => void;
};

export type SavedComment = {
  selectedText: Maybe<string>;
  date: Date;
  comment: string;
};
