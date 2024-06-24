import React, { ChangeEvent } from "react";
import styles from "./MyInput.module.scss";

interface InputProps {
  name?: string; // Додайте 'name' як властивість
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
  name,
}) => {
  const id = name
    ? name
    : `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className={`${styles.form__group} ${styles.field}`}>
      <input
        id={id}
        name={name ? name : ""}
        autoComplete='new-password'
        type={type}
        className={styles.form__field}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <label htmlFor={id} className={styles.form__label}>
        {label}
      </label>
    </div>
  );
};

export default MyInput;
