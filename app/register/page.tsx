"use client";
import styles from "./Register.module.scss";
import React, { useState } from "react";
import MyInput from "../components/ui/MyInput/MyInput";
import MyButton from "../components/ui/MyButton/MyButton";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleChangeName = (event: any) => {
    setName(event.target.value);
  };
  const handleChangePassword = (event: any) => {
    setPassword(event.target.value);
  };
  const handleChangesRepeatPassword = (event: any) => {
    setRepeatPassword(event.target.value);
  };

  const onClickButton = () => {
    if (password === repeatPassword) {
      const user = {
        name,
        password,
      };
      console.log(user);
    } else {
      console.log("паролі не співпадають");
    }
  };
  return (
    <div className={styles.root}>
      <MyInput
        onChange={(e) => handleChangeName(e)}
        value={name}
        label='Name'
      />
      <MyInput
        onChange={(e) => handleChangePassword(e)}
        value={password}
        label='Password'
        type='password'
      />
      <MyInput
        onChange={(e) => handleChangesRepeatPassword(e)}
        value={repeatPassword}
        label='Password'
        type='password'
      />
      <div className={styles.buttons}>
        <MyButton textColor={'black'} onClick={onClickButton} size='lg'>
          Зареєструватись
        </MyButton>
        <MyButton
          onClick={() => router.push("/login")}
          primary={true}
          size='lg'
        >
          Увійти
        </MyButton>
      </div>
    </div>
  );
};

export default Register;
