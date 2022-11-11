import { RowContainer } from '../../layout';
import { FormattingBarProps } from './types';
import { FormattingBarIconTypes } from '../Toolbar/types';
import { ToolbarElement } from '../../hoc/ToolbarElement';

const ICONS = [
  FormattingBarIconTypes.BOLD,
  FormattingBarIconTypes.ITALIC,
  FormattingBarIconTypes.UNDERLINED,
  FormattingBarIconTypes.STRIKETHROUGHS,
];

const FormattingBar = ({ onFormatClicked }: FormattingBarProps) => {
  const renderIcons = () =>
    ICONS.map((icon) => (
      <ToolbarElement key={icon} icon={icon} onIconClicked={onFormatClicked} />
    ));

  return <RowContainer>{renderIcons()}</RowContainer>;
};

export { FormattingBar };
