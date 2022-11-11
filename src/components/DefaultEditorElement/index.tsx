import { Typography } from '@mui/material';
import { RenderElementProps } from 'slate-react';

//TODO: create a theme scheme for handling colors, and stardard metrics
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
