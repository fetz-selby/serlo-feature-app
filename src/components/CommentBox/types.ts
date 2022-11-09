interface FormattingBarProps {
  onFormatClicked: (format: FormattingBarIconTypes) => void;
}

export enum FormattingBarIconTypes {
  FORMAT_BOLD = 'bold',
  FORMAT_ITALIC = 'italic',
  FORMAT_UNDERLINED = 'underlined',
  FORMAT_STRIKETHROUGHS = 'strike',
  FORMAT_DEFAULT = 'default',
}

export type { FormattingBarProps };
