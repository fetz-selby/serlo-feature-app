import { RowContainer } from '../../layout';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  StrikethroughS,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FormattingBarIconTypes, FormattingBarProps } from './types';

const FormattingBar = ({ onFormatClicked }: FormattingBarProps) => {
  return (
    <RowContainer>
      <IconButton
        onClick={() => onFormatClicked(FormattingBarIconTypes.FORMAT_BOLD)}
      >
        <FormatBold />
      </IconButton>
      <IconButton
        onClick={() => onFormatClicked(FormattingBarIconTypes.FORMAT_ITALIC)}
      >
        <FormatItalic />
      </IconButton>
      <IconButton
        onClick={() =>
          onFormatClicked(FormattingBarIconTypes.FORMAT_UNDERLINED)
        }
      >
        <FormatUnderlined />
      </IconButton>
      <IconButton
        onClick={() =>
          onFormatClicked(FormattingBarIconTypes.FORMAT_STRIKETHROUGHS)
        }
      >
        <StrikethroughS />
      </IconButton>
    </RowContainer>
  );
};

export { FormattingBar };
