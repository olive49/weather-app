import React from 'react';
import { Button as MaterialButton } from '@mui/material';

interface IButton {
  btnText: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  endIcon?: React.ReactNode;
}
const Button = ({
  btnText,
  onClick = () => {},
  variant = 'contained',
  size = 'small',
  endIcon,
}: IButton) => {
  return (
    <MaterialButton
      variant={variant}
      size={size}
      onClick={onClick}
      endIcon={endIcon && endIcon}
    >
      {btnText}
    </MaterialButton>

  );
};

export default Button;
