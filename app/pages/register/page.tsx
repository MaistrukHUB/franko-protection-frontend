"use client";
import styles from "./Register.module.scss";
import React, { useState } from "react";
import MyInput from "../../components/ui/MyInput/MyInput";
import MyButton from "../../components/ui/MyButton/MyButton";
import { useRouter } from "next/navigation";
import * as yup from "yup"; // Імпортуємо бібліотеку Yup
import * as Api from "../../../api"; // Імпортуємо ваш API
import { useAppDispatch } from "@/lib/hooks/hooks";
import { setCookie } from "nookies";
import { setLogin } from "@/lib/redux/slice/user";

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<number | null>(null); // Тепер поле phone має тип number | null
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string | null>>(
    {}
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const handleChangePhone = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPhone(value === "" ? null : parseInt(value, 10));
  };

  const handleChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleChangesRepeatPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(event.target.value);
  };

  // Створюємо схему валідації за допомогою Yup
  const validationSchema = yup.object().shape({
    name: yup.string().required("Ім'я обов'язкове"),
    email: yup
      .string()
      .email("Невірний формат електронної пошти")
      .required("Електронна пошта обов'язкова"),
    phone: yup
      .number()
      .required("Телефон обов'язковий")
      .typeError("Телефон повинен бути числом"),
    password: yup
      .string()
      .min(6, "Пароль повинен містити принаймні 6 символів")
      .required("Пароль обов'язковий"),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Паролі повинні співпадати"), // Заміна undefined на ""
  });

  const handelSubmitButton = async () => {
    const newUser = {
      name,
      email,
      phone: phone!, // Використовуємо non-null assertion для phone
      password,
    };

    try {
      // Валідуємо дані перед відправкою
      validationSchema.validateSync(
        { ...newUser, repeatPassword },
        { abortEarly: false }
      );

      // Перевірка, чи паролі співпадають
      if (password !== repeatPassword) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          repeatPassword: "Паролі не співпадають",
        }));
        return;
      }

      // Очищуємо помилки
      setErrors({});
      setServerError(null);

      // Запит на реєстрацію користувача
      const { token, user } = await Api.auth.register(newUser);
      console.log("Token: ", token);
      console.log("user: ", user);

      dispatch(setLogin(user));

      setCookie(null, "_token", token, {
        path: "/",
      });
      router.push("/");
    } catch (error: any) {
      // Обробка помилок валідації
      if (error instanceof yup.ValidationError) {
        const validationErrors: Record<string, string | null> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
      } else {
        // Виведення повідомлення про помилку з респонсу сервера
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setServerError(error.response.data.message.join(", "));
        } else {
          setServerError("Помилка реєстрації. Спробуйте знову.");
        }
        console.error(error.message); // Виводимо повідомлення про помилку в консоль
      }
    }
  };

  return (
    <form autoComplete='off' className={styles.root}>
      <div>
      </div>
      {serverError && (
        <p className={styles.serverError}>{serverError}</p>
      )}{" "}
      {/* Виведення серверної помилки */}
      <MyInput
        onChange={handleChangeName}
        value={name}
        label='Name'
      />
      {errors && errors.name && (
        <p className={styles.error}>{errors.name}</p>
      )}
      <MyInput
        type='number'
        onChange={handleChangePhone}
        value={phone === null ? "" : phone.toString()} // Перетворюємо число на рядок для введення
        label='Phone'
      />
      {errors && errors.phone && (
        <p className={styles.error}>{errors.phone}</p>
      )}
      <MyInput
        onChange={handleChangeEmail}
        value={email}
        label='email'
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
      {errors && errors.password && (
        <p className={styles.error}>{errors.password}</p>
      )}
      <MyInput
        onChange={handleChangesRepeatPassword}
        value={repeatPassword}
        label='Repeat Password'
        type='password'
      />
      {errors && errors.repeatPassword && (
        <p className={styles.error}>{errors.repeatPassword}</p>
      )}
      <div className={styles.buttons}>
        <MyButton
          textColor={"black"}
          onClick={handelSubmitButton}
          size='lg'
        >
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
    </form>
  );
};

export default Register;
