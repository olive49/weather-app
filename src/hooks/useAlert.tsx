import React, { useState } from 'react';
import Alert from '../components/Alert/Alert';

export default function useAlert() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const handleOpen = (msg: string) => {
    setOpen(true);
    setMsg(msg);
  };
  const handleClose = () => setOpen(false);

  const component = <Alert open={open} handleClose={handleClose} msg={msg} />;

  return {
    open,
    handleOpen,
    handleClose,
    alert: component,
  };
}
