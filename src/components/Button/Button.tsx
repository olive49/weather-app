import React from 'react';
import styles from './Button.module.css';

interface IButton {
  btnText: string;
  btnStyle?: string;
  onPress?: () => void;
}
const Button = ({ btnText, btnStyle, onPress = () => {} }: IButton) => {
  return (
    <button onClick={onPress} className={`${styles.button} ${btnStyle}`}>
      {btnText}
    </button>
  );
};

export default Button;
