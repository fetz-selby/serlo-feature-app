import { FormattingBarIconTypes } from '../Toolbar/types';

interface FormattingBarProps {
  onFormatClicked: (format: FormattingBarIconTypes, state: boolean) => void;
}

export type { FormattingBarProps };
