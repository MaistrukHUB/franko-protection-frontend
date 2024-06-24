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
        setQuestion("");
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setServerError([error.response.data.message]);
      } else {
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
            <li className={styles.contactsItem}>
              <a
                href='https://www.facebook.com/menspireinternational'
                title='MENSPIRE | Male Image &amp; Grooming on Facebook'
                target='_blank'
              >
                <svg
                  aria-hidden='true'
                  focusable='false'
                  role='presentation'
                  className='icon icon-facebook'
                  viewBox='0 0 20 20'
                >
                  <path d='M18.05.811q.439 0 .744.305t.305.744v16.637q0 .439-.305.744t-.744.305h-4.732v-7.221h2.415l.342-2.854h-2.757v-1.83q0-.659.293-1t1.073-.342h1.488V3.762q-.976-.098-2.171-.098-1.634 0-2.635.964t-1 2.72V9.47H7.951v2.854h2.415v7.221H1.413q-.439 0-.744-.305t-.305-.744V1.859q0-.439.305-.744T1.413.81H18.05z'></path>
                </svg>
                <span className='visually-hidden'>Facebook</span>
              </a>
            </li>
            <li className={styles.contactsItem}>
              <a
                href='https://instagram.com/menspiresalon'
                title='MENSPIRE | Male Image &amp; Grooming on Instagram'
                target='_blank'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 50 50'
                  width='50px'
                  height='50px'
                >
                  <path d='M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z' />
                </svg>
                <span className='visually-hidden'>Instagram</span>
              </a>
            </li>
            <li className={styles.contactsItem}>
              <a
                href='https://instagram.com/menspiresalon'
                title='MENSPIRE | Male Image &amp; Grooming on Instagram'
                target='_blank'
              >
                <svg
                  aria-hidden='true'
                  focusable='false'
                  role='presentation'
                  className='icon icon-instagram'
                  viewBox='0 0 512 512'
                >
                  <path d='M256 49.5c67.3 0 75.2.3 101.8 1.5 24.6 1.1 37.9 5.2 46.8 8.7 11.8 4.6 20.2 10 29 18.8s14.3 17.2 18.8 29c3.4 8.9 7.6 22.2 8.7 46.8 1.2 26.6 1.5 34.5 1.5 101.8s-.3 75.2-1.5 101.8c-1.1 24.6-5.2 37.9-8.7 46.8-4.6 11.8-10 20.2-18.8 29s-17.2 14.3-29 18.8c-8.9 3.4-22.2 7.6-46.8 8.7-26.6 1.2-34.5 1.5-101.8 1.5s-75.2-.3-101.8-1.5c-24.6-1.1-37.9-5.2-46.8-8.7-11.8-4.6-20.2-10-29-18.8s-14.3-17.2-18.8-29c-3.4-8.9-7.6-22.2-8.7-46.8-1.2-26.6-1.5-34.5-1.5-101.8s.3-75.2 1.5-101.8c1.1-24.6 5.2-37.9 8.7-46.8 4.6-11.8 10-20.2 18.8-29s17.2-14.3 29-18.8c8.9-3.4 22.2-7.6 46.8-8.7 26.6-1.3 34.5-1.5 101.8-1.5m0-45.4c-68.4 0-77 .3-103.9 1.5C125.3 6.8 107 11.1 91 17.3c-16.6 6.4-30.6 15.1-44.6 29.1-14 14-22.6 28.1-29.1 44.6-6.2 16-10.5 34.3-11.7 61.2C4.4 179 4.1 187.6 4.1 256s.3 77 1.5 103.9c1.2 26.8 5.5 45.1 11.7 61.2 6.4 16.6 15.1 30.6 29.1 44.6 14 14 28.1 22.6 44.6 29.1 16 6.2 34.3 10.5 61.2 11.7 26.9 1.2 35.4 1.5 103.9 1.5s77-.3 103.9-1.5c26.8-1.2 45.1-5.5 61.2-11.7 16.6-6.4 30.6-15.1 44.6-29.1 14-14 22.6-28.1 29.1-44.6 6.2-16 10.5-34.3 11.7-61.2 1.2-26.9 1.5-35.4 1.5-103.9s-.3-77-1.5-103.9c-1.2-26.8-5.5-45.1-11.7-61.2-6.4-16.6-15.1-30.6-29.1-44.6-14-14-28.1-22.6-44.6-29.1-16-6.2-34.3-10.5-61.2-11.7-27-1.1-35.6-1.4-104-1.4z'></path>
                  <path d='M256 126.6c-71.4 0-129.4 57.9-129.4 129.4s58 129.4 129.4 129.4 129.4-58 129.4-129.4-58-129.4-129.4-129.4zm0 213.4c-46.4 0-84-37.6-84-84s37.6-84 84-84 84 37.6 84 84-37.6 84-84 84z'></path>
                  <circle cx='390.5' cy='121.5' r='30.2'></circle>
                </svg>
                <span className='visually-hidden'>Instagram</span>
              </a>
            </li>
            <li className={styles.contactsItem}>
              <a
                href='https://www.youtube.com/channel/UCPHbC3ilQLCZoYDmc-4VLEw'
                title='MENSPIRE | Male Image &amp; Grooming on YouTube'
                target='_blank'
              >
                <svg
                  aria-hidden='true'
                  focusable='false'
                  role='presentation'
                  className='icon icon-youtube'
                  viewBox='0 0 21 20'
                >
                  <path d='M-.196 15.803q0 1.23.812 2.092t1.977.861h14.946q1.165 0 1.977-.861t.812-2.092V3.909q0-1.23-.82-2.116T17.539.907H2.593q-1.148 0-1.969.886t-.82 2.116v11.894zm7.465-2.149V6.058q0-.115.066-.18.049-.016.082-.016l.082.016 7.153 3.806q.066.066.066.164 0 .066-.066.131l-7.153 3.806q-.033.033-.066.033-.066 0-.098-.033-.066-.066-.066-.131z'></path>
                </svg>
                <span className='visually-hidden'>YouTube</span>
              </a>
            </li>
            <li className={styles.contactsItem}>
              <a href='tel:380961094354'>
                <svg
                  height='800px'
                  width='800px'
                  version='1.1'
                  id='Capa_1'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 473.806 473.806'
                >
                  <g>
                    <g>
                      <path
                        d='M374.456,293.506c-9.7-10.1-21.4-15.5-33.8-15.5c-12.3,0-24.1,5.3-34.2,15.4l-31.6,31.5c-2.6-1.4-5.2-2.7-7.7-4
			c-3.6-1.8-7-3.5-9.9-5.3c-29.6-18.8-56.5-43.3-82.3-75c-12.5-15.8-20.9-29.1-27-42.6c8.2-7.5,15.8-15.3,23.2-22.8
			c2.8-2.8,5.6-5.7,8.4-8.5c21-21,21-48.2,0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5c-6-6.2-12.3-12.6-18.8-18.6
			c-9.7-9.6-21.3-14.7-33.5-14.7s-24,5.1-34,14.7c-0.1,0.1-0.1,0.1-0.2,0.2l-34,34.3c-12.8,12.8-20.1,28.4-21.7,46.5
			c-2.4,29.2,6.2,56.4,12.8,74.2c16.2,43.7,40.4,84.2,76.5,127.6c43.8,52.3,96.5,93.6,156.7,122.7c23,10.9,53.7,23.8,88,26
			c2.1,0.1,4.3,0.2,6.3,0.2c23.1,0,42.5-8.3,57.7-24.8c0.1-0.2,0.3-0.3,0.4-0.5c5.2-6.3,11.2-12,17.5-18.1c4.3-4.1,8.7-8.4,13-12.9
			c9.9-10.3,15.1-22.3,15.1-34.6c0-12.4-5.3-24.3-15.4-34.3L374.456,293.506z M410.256,398.806
			C410.156,398.806,410.156,398.906,410.256,398.806c-3.9,4.2-7.9,8-12.2,12.2c-6.5,6.2-13.1,12.7-19.3,20
			c-10.1,10.8-22,15.9-37.6,15.9c-1.5,0-3.1,0-4.6-0.1c-29.7-1.9-57.3-13.5-78-23.4c-56.6-27.4-106.3-66.3-147.6-115.6
			c-34.1-41.1-56.9-79.1-72-119.9c-9.3-24.9-12.7-44.3-11.2-62.6c1-11.7,5.5-21.4,13.8-29.7l34.1-34.1c4.9-4.6,10.1-7.1,15.2-7.1
			c6.3,0,11.4,3.8,14.6,7c0.1,0.1,0.2,0.2,0.3,0.3c6.1,5.7,11.9,11.6,18,17.9c3.1,3.2,6.3,6.4,9.5,9.7l27.3,27.3
			c10.6,10.6,10.6,20.4,0,31c-2.9,2.9-5.7,5.8-8.6,8.6c-8.4,8.6-16.4,16.6-25.1,24.4c-0.2,0.2-0.4,0.3-0.5,0.5
			c-8.6,8.6-7,17-5.2,22.7c0.1,0.3,0.2,0.6,0.3,0.9c7.1,17.2,17.1,33.4,32.3,52.7l0.1,0.1c27.6,34,56.7,60.5,88.8,80.8
			c4.1,2.6,8.3,4.7,12.3,6.7c3.6,1.8,7,3.5,9.9,5.3c0.4,0.2,0.8,0.5,1.2,0.7c3.4,1.7,6.6,2.5,9.9,2.5c8.3,0,13.5-5.2,15.2-6.9
			l34.2-34.2c3.4-3.4,8.8-7.5,15.1-7.5c6.2,0,11.3,3.9,14.4,7.3c0.1,0.1,0.1,0.1,0.2,0.2l55.1,55.1
			C420.456,377.706,420.456,388.206,410.256,398.806z'
                      />
                      <path
                        d='M256.056,112.706c26.2,4.4,50,16.8,69,35.8s31.3,42.8,35.8,69c1.1,6.6,6.8,11.2,13.3,11.2c0.8,0,1.5-0.1,2.3-0.2
			c7.4-1.2,12.3-8.2,11.1-15.6c-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3,3.7-15.6,11
			S248.656,111.506,256.056,112.706z'
                      />
                      <path
                        d='M473.256,209.006c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2,3.7-15.5,11
			c-1.2,7.4,3.7,14.3,11.1,15.6c46.6,7.9,89.1,30,122.9,63.7c33.8,33.8,55.8,76.3,63.7,122.9c1.1,6.6,6.8,11.2,13.3,11.2
			c0.8,0,1.5-0.1,2.3-0.2C469.556,223.306,474.556,216.306,473.256,209.006z'
                      />
                    </g>
                  </g>
                </svg>{" "}
                380961094354
              </a>
            </li>
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
    </div>
  );
};

export default Footer;
