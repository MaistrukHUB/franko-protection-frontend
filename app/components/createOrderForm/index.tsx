// Імпортуємо необхідні бібліотеки та компоненти
import React, {
  useEffect,
  useState,
  ChangeEvent,
  MouseEventHandler,
} from "react";
import Modal from "react-modal";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { clearCart } from "@/lib/redux/slice/cart";
import { CartDetailType } from "@/app/@types/cart";
import MyButton from "../ui/MyButton/MyButton";
import MyInput from "../ui/MyInput/MyInput";
import styles from "./CreateOrder.module.scss";
import ConfirmModal from "../confirmModal";
import { createNewOrder } from "@/lib/telegram";

// Оголошуємо інтерфейси для типізації даних форми та помилок
export interface IHandleValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  errorForm?: string;
}

export interface IFormDataByOrder {
  name: string;
  phone: number | null;
  email: string;
}

export interface ICreateOrderFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  detailsCart?: CartDetailType[];
}

export interface FormErrorsOrder {
  name?: string;
  phone?: string;
  email?: string;
}

// Інлайн-стилі
const customStyles = {
  modal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "var(--black)",
    padding: "20px",
    height: "max-content" as "max-content",
    backgroundColor: "white",
    overflow: "scroll" as "scroll",
    width: "50%",
    minWidth: "350px",
    display: "flex" as "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
  },
  warningText: {
    marginBottom: "10px",
    padding: "10px",
    color: "red",
  },
  overlay: {
    zIndex: "1000000",
    overflow: "hidden",
    overflowY: "auto" as "auto",
    position: "fixed" as "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  form: {
    marginBottom: "20px",
    display: "flex",
    width: "100%",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    marginLeft: "20px",
    width: "200px",
    display: "flex",
    justifyContent: "space-between",
  },
};

// Оголошуємо компонент CreateOrderForm
const CreateOrderForm: React.FC<ICreateOrderFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  detailsCart,
}) => {
  const dispatch = useAppDispatch();

  console.log(isModalOpen);

  const { isLogged, user } = useAppSelector(
    (state) => state.userSlice
  );
  const { totalPrice } = useAppSelector((state) => state.cartSlice);

  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const [errors, setErrors] = useState<FormErrorsOrder>({});
  const [serverError, setServerError] = useState<string[] | null>(
    null
  );
  const [validationErrors, setValidationErrors] =
    useState<FormErrorsOrder>({});

  const [formData, setFormData] = useState<IFormDataByOrder>({
    name: "",
    phone: null,
    email: "",
  });

  useEffect(() => {
    if (document.getElementById("__next")) {
      Modal.setAppElement("#__next");
    }

    if (isLogged) {
      setFormData({
        name: user.name,
        phone: user.phone,
        email: user.email,
      });
    }
    setValidationErrors({});
    setServerError(null);
  }, [isModalOpen, detailsCart, user, isLogged]);

  const closeModal: MouseEventHandler<HTMLButtonElement> = () => {
    setIsModalOpen(false);
    setValidationErrors({});
    setServerError(null);
  };

  const handleValidation = async () => {
    try {
      const createSchema = yup.object().shape({
        name: yup.string().required("Поле Ім'я є обов'язковим"),
        phone: yup.number().required("Поле телефон є обов'язковим"),
        email: yup.string().required("Поле email є обов'язковим"),
      });
      await createSchema.validate(formData, { abortEarly: false });
      setValidationErrors({});
      return {};
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const formError: FormErrorsOrder = {};
        error.inner.forEach((err: yup.ValidationError) => {
          if (err.path) {
            formError[err.path as keyof FormErrorsOrder] =
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    try {
      const handleValidationErrors: IHandleValidationErrors =
        await handleValidation();
      if (Object.keys(handleValidationErrors).length === 0) {
        detailsCart &&
          createNewOrder(detailsCart, formData, totalPrice);
        dispatch(clearCart());
        closeModal(event);
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

  const onConfirm: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    console.log("confirm");
    try {
      if (detailsCart) {
        console.log(detailsCart, formData, totalPrice);
        detailsCart &&
          createNewOrder(detailsCart, formData, totalPrice);
        dispatch(clearCart());
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

  const onDeny: MouseEventHandler<HTMLButtonElement> = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.root}>
      {isLogged ? (
        <>
          {isModalOpen ? (
            <ConfirmModal
              message={`Підтвердження замовлення`}
              confirmButtonText={"Підтвердити"}
              denyButtonText={"Скасувати"}
              onConfirm={onConfirm}
              onDeny={onDeny}
              setShowConfirm={setIsModalOpen}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel='Створити замовлення'
          style={{
            content: customStyles.modal,
            overlay: customStyles.overlay,
          }}
          ariaHideApp={false}
        >
          <form style={customStyles.form}>
            <MyInput
              name='name'
              type='text'
              label="Ваше ім'я:"
              onChange={handleChange}
              value={formData.name}
            />
            {validationErrors.name && (
              <p style={customStyles.warningText}>
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
              <p style={customStyles.warningText}>
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
              <p style={customStyles.warningText}>
                {validationErrors.email}
              </p>
            )}
          </form>
          <div
            style={customStyles.buttons}
            className={styles.buttons}
          >
            <MyButton primary={true} onClick={handleSubmit}>
              Замовити
            </MyButton>
            <MyButton textColor='black' onClick={closeModal}>
              Скасувати
            </MyButton>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CreateOrderForm;
