import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  StrikethroughS,
  Brush,
} from '@mui/icons-material';
import { ReactElement } from 'react';
import { FormattingBarIconTypes } from './types';

const ICON_RENDERS = new Map([
  [FormattingBarIconTypes.BOLD, <FormatBold />],
  [FormattingBarIconTypes.ITALIC, <FormatItalic />],
  [FormattingBarIconTypes.UNDERLINED, <FormatUnderlined />],
  [FormattingBarIconTypes.STRIKETHROUGHS, <StrikethroughS />],
  [FormattingBarIconTypes.BRUSH, <Brush />],
]);

const getIconRender = (icon: FormattingBarIconTypes): ReactElement =>
  ICON_RENDERS.get(icon) || <></>;

export { getIconRender };
