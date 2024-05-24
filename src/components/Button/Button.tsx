import React from 'react';
import { Button as MaterialButton } from '@mui/material';


interface IButton {
  btnText: string;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  endIcon?: React.ReactNode;
  onClick?: () => void;
}
const Button = ({ btnText, variant = 'contained', size = 'small', endIcon, onClick = () => {} }: IButton) => {
  return (
    <MaterialButton variant={variant} size={size} onClick={onClick} endIcon={endIcon && endIcon}>
      {btnText}
    </MaterialButton>
  );
};

export default Button;
