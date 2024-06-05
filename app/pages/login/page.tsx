"use client";
import { useAppDispatch } from "@/lib/hooks/hooks";
import styles from "./Login.module.scss";
import React, { useState } from "react";
import MyInput from "../../components/ui/MyInput/MyInput";
import MyButton from "../../components/ui/MyButton/MyButton";
import { useRouter } from "next/navigation";
import * as Api from "../../../api";
import { setCookie } from "nookies";
import { setLogin } from "@/lib/redux/slice/user";
import * as yup from "yup"; // Імпортуємо бібліотеку Yup
import { ToastContainer, toast } from "react-toastify";
import { configToast } from "../../../lib/toastify";
import "react-toastify/dist/ReactToastify.css";

// Створюємо схему валідації за допомогою Yup
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Невірний формат електронної пошти")
    .required("Електронна пошта обов'язкова"),
  password: yup
    .string()
    .min(6, "Пароль повинен містити принаймні 6 символів")
    .required("Пароль обов'язковий"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    [key: string]: string;
  } | null>(null); // Стан для зберігання помилок валідації
  const [serverError, setServerError] = useState<string | null>(null); // Стан для зберігання помилки з сервера

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const onClickSubmitButton = async () => {
    const existUser = {
      email,
      password,
    };

    // Валідуємо дані перед відправкою
    try {
      await validationSchema.validate(existUser, {
        abortEarly: false,
      });
      setErrors(null); // Очищуємо помилки, якщо валідація пройшла успішно
    } catch (error) {
      // Якщо помилка валідації
      if (error instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors); // Встановлюємо помилки в стані
        return; // Повертаємося, якщо є помилки валідації
      }
    }

    // Якщо валідація пройшла успішно, спробуємо надіслати дані на сервер
    try {
      setServerError(null); // Очищуємо помилку сервера перед новою спробою
      const { token, user } = await Api.auth.login(existUser);
      console.log("Token: ", token);
      console.log("user: ", user);

      dispatch(setLogin(user));

      toast.success("Вітаємо!", { ...configToast });

      setCookie(null, "_token", token, {
        path: "/",
      });
      // router.push("/");
    } catch (error) {
      console.warn("LoginForm", error);
      toast.error(
        "Помилка авторизації. Перевірте ваші дані та спробуйте знову."
      ); // Використовуємо toast.error для виведення помилки
      setServerError(null); // Очистимо serverError, якщо це потрібно
    }
  };

  const notify = () => toast("Wow so easy!");
  return (
    <form className={styles.root} autoComplete='off'>
      <div>
        {/* <button onClick={notify}>Notify!</button> */}
        <ToastContainer />
      </div>
      {serverError && (
        <p className={styles.serverError}>{serverError}</p>
      )}{" "}
      {/* Виведення серверної помилки */}
      <MyInput
        onChange={handleChangeName}
        value={email}
        label='Email'
      />
      {errors && errors.email && (
        <p className={styles.error}>{errors.email}</p>
      )}
      <MyInput
        onChange={handleChangePassword}
        value={password}
        label='Password'
        type='password'
      />
      {errors?.password && (
        <p className={styles.error}>{errors.password}</p>
      )}{" "}
      {/* Виведення помилки для password */}
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
    </form>
  );
};

export default Login;
