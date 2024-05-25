import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import Button from '../Button/Button';

interface IProps {
  open: boolean;
  handleClose: () => void;
  msg: string;
}

const Alert = ({ open, handleClose, msg }: IProps) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {msg || 'Unknown error'}
        </Typography>
        <Button onClick={handleClose} btnText="Close" />
      </Box>
    </Modal>
  );
};

export default Alert;
