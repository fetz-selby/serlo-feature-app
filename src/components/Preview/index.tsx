import { DialogTitle, Dialog, TextareaAutosize } from '@mui/material';

export interface PreviewDialogProps {
  open: boolean;
  jsonToBeSaved: string;
  onClose: () => void;
}

const Preview = ({ onClose, open, jsonToBeSaved }: PreviewDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Preview JSON to be Saved</DialogTitle>
      <TextareaAutosize
        style={{ width: 600, height: 400 }}
        minRows={3}
        defaultValue={jsonToBeSaved}
      />
    </Dialog>
  );
};

export { Preview };
