import { RenderLeafProps } from 'slate-react/dist/components/editable';
import { FormattingBarIconTypes } from '../CommentBox/types';

const CustomLeaf = (props: RenderLeafProps) => {
  let style = {};
  switch (props.leaf.format) {
    case FormattingBarIconTypes.FORMAT_BOLD:
      style = { fontWeight: 'bold' };
      break;

    case FormattingBarIconTypes.FORMAT_ITALIC:
      style = { fontStyle: 'italic' };
      break;

    case FormattingBarIconTypes.FORMAT_UNDERLINED:
      style = { textDecoration: 'underline' };
      break;

    case FormattingBarIconTypes.FORMAT_STRIKETHROUGHS:
      style = { textDecoration: 'line-through' };
      break;

    case FormattingBarIconTypes.FORMAT_DEFAULT:
      style = { fontWeight: 'normal' };
      break;

    default:
      style = {};
  }

  return (
    <span {...props.attributes} style={style}>
      {props.children}
    </span>
  );
};

export { CustomLeaf };
