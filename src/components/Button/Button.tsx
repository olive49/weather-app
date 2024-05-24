import React from 'react';
import styles from './Button.module.css';

interface IButton {
  btnText: string;
  btnStyle?: string;
  onClick?: () => void;
}
const Button = ({ btnText, btnStyle, onClick = () => {} }: IButton) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${btnStyle}`}>
      {btnText}
    </button>
  );
};

export default Button;
