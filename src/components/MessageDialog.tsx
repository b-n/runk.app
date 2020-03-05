import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface MessageDialogProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const MessageDialog: React.FC<MessageDialogProps> = ({ title, open, children, onClose }) => (
  <div>
    <Dialog
      open={open}
      onClose={onClose}
    >
      { title && <DialogTitle>{title}</DialogTitle> }
      <DialogContent>
        <DialogContentText>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default MessageDialog;
