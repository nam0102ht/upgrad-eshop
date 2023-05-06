import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog(props) {

  return (
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        zDepth={4}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Deletion of product!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            "Are you sure want to delete the product?"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={props.handleOk}>OK</Button>
          <Button onClick={props.handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  );
}