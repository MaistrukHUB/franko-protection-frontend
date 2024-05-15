import React, { ChangeEvent } from "react";
import styles from "./MyInput.module.scss";

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const MyInput: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  label,
}) => {
  return (
    <div className={`${styles.form__group} ${styles.field}`}>
      <input
        type={type}
        className={styles.form__field}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <label className={styles.form__label}>{label}</label>
    </div>
  );
};

export default MyInput;
