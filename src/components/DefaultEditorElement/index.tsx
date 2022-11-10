import { Typography } from '@mui/material';
import { RenderElementProps } from 'slate-react';

const DefaultEditorElement = (props: RenderElementProps) => {
  return (
    <Typography
      {...props.attributes}
      sx={{ color: '#333333', letterSpacing: '1px', wordSpacing: '5px' }}
    >
      {props.children}
    </Typography>
  );
};

export { DefaultEditorElement };
