"use client";
import { useAppStore } from "@/lib/hooks/hooks";
import styles from "./Login.module.scss";
import React, { useState } from "react";
import MyInput from "../components/ui/MyInput/MyInput";
import MyButton from "../components/ui/MyButton/MyButton";
import { useRouter } from "next/navigation";
import * as Api from "../../api";
import { parseCookies, setCookie } from "nookies";

const Login = () => {
  const store = useAppStore();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChangeName = (event: any) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const onClickSubmitButton = async () => {
    const user = {
      email,
      password,
    };
    try {
      const { token } = await Api.auth.login(user);

      setCookie(null, "_token", token, {
        path: "/",
      });

      console.log("вітаємо", token);
    } catch (error) {
      console.warn("LoginForm", error);
    }
  };

  console.log(store);
  return (
    <div className={styles.root}>
      <MyInput
        onChange={(e) => handleChangeName(e)}
        value={email}
        label='Name'
      />
      <MyInput
        onChange={(e) => handleChangePassword(e)}
        value={password}
        label='Password'
        type='password'
      />
      <div className={styles.buttons}>
        <MyButton
          textColor={"black"}
          onClick={onClickSubmitButton}
          size='lg'
        >
          Увійти
        </MyButton>
        <MyButton
          onClick={() => router.push("/register")}
          primary={true}
          size='lg'
        >
          Зареєструватись
        </MyButton>
      </div>
    </div>
  );
};

export default Login;
