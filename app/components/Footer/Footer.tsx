"use client";
import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import styles from "./Footer.module.scss";
import MyButton from "../ui/MyButton/MyButton";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { configToast } from "../../../lib/toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  IFormDataByOrder,
  IHandleValidationErrors,
} from "../createOrderForm";
import { handelSandQuestion } from "@/lib/telegram";
import MyInput from "../ui/MyInput/MyInput";
export interface FormErrorsQuestion {
  name?: string;
  phone?: string;
  email?: string;
  question?: string; // Додайте це
}

const Footer = () => {
  const dispatch = useAppDispatch();

  const { isLogged, user } = useAppSelector(
    (state) => state.userSlice
  );

  const [formData, setFormData] = useState<IFormDataByOrder>({
    name: "",
    phone: null,
    email: "",
  });
  const [question, setQuestion] = useState<string>("");
  const [errors, setErrors] = useState<FormErrorsQuestion>({});
  const [serverError, setServerError] = useState<string[] | null>(
    null
  );
  const [validationErrors, setValidationErrors] =
    useState<FormErrorsQuestion>({});

  // Assuming FormErrorsQuestion is defined in createOrderForm.ts

  useEffect(() => {
    if (isLogged) {
      setFormData({
        name: user.name,
        phone: user.phone,
        email: user.email,
      });
    }
    setValidationErrors({});
    setServerError(null);
  }, [user, isLogged]);

  const handleValidation = async () => {
    try {
      const createSchema = yup.object().shape({
        name: yup.string().required("Поле Ім'я є обов'язковим"),
        phone: yup.number().required("Поле телефон є обов'язковим"),
        email: yup.string().required("Поле email є обов'язковим"),
        question: yup
          .string()
          .required("Поле питання є обов'язковим"),
      });
      await createSchema.validate(
        { ...formData, question },
        { abortEarly: false }
      );
      setValidationErrors({});
      return {};
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const formError: FormErrorsQuestion = {};
        error.inner.forEach((err: yup.ValidationError) => {
          if (err.path) {
            formError[err.path as keyof FormErrorsQuestion] =
              err.message;
          }
          setValidationErrors(formError);
        });
        return formError;
      } else {
        console.error("Помилка при відправці запиту:", error);
        setServerError(["Сталася невідома помилка"]);
        return { errorForm: "Сталася невідома помилка" };
      }
    }
  };

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "question") {
      setQuestion(value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    try {
      const handleValidationErrors: IHandleValidationErrors =
        await handleValidation();
      if (Object.keys(handleValidationErrors).length === 0) {
        handelSandQuestion(question, formData);
        toast.success("Виконано!", { ...configToast });
        setQuestion("");
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.info("Вітаємо!", { ...configToast });
        setServerError([error.response.data.message]);
      } else {
        toast.info("Вітаємо!", { ...configToast });
        setServerError(["Сталася невідома помилка."]);
      }
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.footerContainer}>
        <div className={styles.contactsContainer}>
          {/* <div className={styles.footerLogo}>
            <img
              src='https://i.postimg.cc/4y0JwnYb/FP.png'
              alt='Logo'
            />
          </div> */}
          <ul className={styles.listContacts}>
            <li className={styles.contactsItem}>@ instagram</li>
            <li className={styles.contactsItem}>@ facebook</li>
            <li className={styles.contactsItem}>@ youtube</li>
            <li className={styles.contactsItem}>@ 380961094354</li>
          </ul>
        </div>
        <div className={styles.questionContainer}>
          <p className={styles.formTitle}>Зв'язатись з нами:</p>
          <form className={styles.formByQuestion}>
            <MyInput
              name='name'
              type='text'
              label="Ваше ім'я:"
              onChange={handleChange}
              value={formData.name}
            />
            {validationErrors.name && (
              <p className={styles.warningText}>
                {validationErrors.name}
              </p>
            )}

            <MyInput
              name='phone'
              label={"Номер телефону:"}
              type='number'
              onChange={handleChange}
              value={String(formData.phone ?? "")}
            />
            {validationErrors.phone && (
              <p className={styles.warningText}>
                {validationErrors.phone}
              </p>
            )}
            <MyInput
              name='email'
              label={"Email:"}
              type='text'
              onChange={handleChange}
              value={formData.email}
            />
            {validationErrors.email && (
              <p className={styles.warningText}>
                {validationErrors.email}
              </p>
            )}
            <MyInput
              name='question'
              label={"Ваше питання:"}
              type='text'
              onChange={handleChange}
              value={question}
            />
            {validationErrors.question && (
              <p className={styles.warningText}>
                {validationErrors.question}
              </p>
            )}
          </form>
          <MyButton
            textColor='white'
            buttonColor={"black"}
            onClick={handleSubmit}
          >
            Запитати
          </MyButton>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Footer;
