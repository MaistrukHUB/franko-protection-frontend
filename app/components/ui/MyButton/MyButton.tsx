import React, { FC, MouseEvent } from "react";
import styles from "./MyButton.module.scss";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  primary?: boolean;
  size?: "sm" | "md" | "lg";
  disabledMode?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  textColor?: string; // Новий пропс для кольору тексту
  buttonColor?: string; // Новий пропс для кольору кнопки
}

const MyButton: FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  primary,
  size,
  className,
  disabledMode,
  textColor = "white", // Значення за замовчуванням для кольору тексту
  buttonColor, // Значення за замовчуванням для кольору кнопки
  ...props
}) => {
  const buttonMode = primary ? "primary" : "";
  const buttonSize = size || "md";

  return (
    <button
      type={type}
      className={`${styles.button} ${className ? className : ""} ${
        styles[`button_${buttonMode}`]
      } ${styles[`button_${buttonSize}`]}`}
      onClick={onClick}
      disabled={disabledMode ? true : false}
      style={{ color: textColor, background: buttonColor }} // Додаємо стилі для кольору тексту і фону кнопки
      {...props}
    >
      {children}
    </button>
  );
};

export default MyButton;
