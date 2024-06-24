import { DetailDTO } from "@/app/@types/details";
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import Modal from "react-modal";
import * as yup from "yup";
import MyInput from "../ui/MyInput/MyInput";
import MyButton from "../ui/MyButton/MyButton";
import styles from "./DetailModal.module.scss";
import axios from "axios";
import { parseCookies } from "nookies";
import { fetchDetails } from "@/lib/redux/slice/details";
import { useAppDispatch } from "@/lib/hooks/hooks";

interface FormData {
  name: string;
  about: string;
  cost: number;
  material: string;
  weight: number;
  imgs: string[];
  colors: string[];
  years: number[];
  sale: number;
  category: string;
  motorcycles: string[];
}

interface DetailModalProps {
  isModalOpen: boolean;
  onRequestClose: () => void;
  detail?: DetailDTO;
}

interface Errors {
  [key: string]: string;
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  about: yup.string().required("About is required"),
  cost: yup
    .number()
    .required("Cost is required")
    .positive("Cost must be positive"),
  material: yup.string().required("Material is required"),
  weight: yup
    .number()
    .required("Weight is required")
    .positive("Weight must be positive"),
  imgs: yup
    .array()
    .of(yup.string().url("Invalid URL"))
    .required("Images are required"),
  colors: yup
    .array()
    .of(yup.string())
    .required("Colors are required"),
  years: yup
    .array()
    .of(yup.number().positive("Year must be positive"))
    .required("Years are required"),
  sale: yup.number().required("Sale is required").min(0).max(100),
  category: yup.string().required("Category is required"),
  motorcycles: yup
    .array()
    .of(yup.string())
    .required("Motorcycles are required"),
});

const initialValues: FormData = {
  name: "",
  about: "",
  cost: 0,
  material: "",
  weight: 0,
  imgs: [""],
  colors: [""],
  years: [0],
  sale: 0,
  category: "",
  motorcycles: [""],
};

const DetailModal: React.FC<DetailModalProps> = ({
  isModalOpen,
  onRequestClose,
  detail,
}) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (detail) setFormData({ ...detail });
  }, [detail]);

  const customStyles = {
    modal: {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "var(--black)",
      padding: "20px",
      paddingTop: "250px",
      backgroundColor: "white",
      overflowY: "auto" as "auto",
      maxHeight: "90vh",
      width: "90%",
      maxWidth: "500px",
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
      position: "fixed" as "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
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

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const newValue =
      e.target.type === "number" ? parseFloat(value) : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  function handleArrayChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) {
    const { value } = e.target;

    if (field === "years") {
      // Обробка для поля years - масив чисел
      const newValue = value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => !isNaN(Number(item))) // фільтруємо тільки числа
        .map((item) => Number(item)); // перетворюємо до числа

      setFormData((prevData) => ({
        ...prevData,
        [field]: newValue,
      }));
    } else {
      // Інші поля (colors, imgs, motorcycles) - масиви строк
      const newValue = value.split(",").map((item) => item.trim());

      setFormData((prevData) => ({
        ...prevData,
        [field]: newValue,
      }));
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, {
        abortEarly: false,
      });

      let method = "POST"; // Default to POST

      const url = detail
        ? `http://localhost:6969/detail/${detail.id}`
        : "http://localhost:6969/detail/create";

      if (detail) {
        method = "PATCH"; // If detail with id is provided, use PATCH
      }
      const { _token } = parseCookies();

      const requestOptions: RequestInit = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${_token}`,
        },
        body: JSON.stringify(formData),
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (response.status === 200 || response.status === 201) {
        console.log("Data successfully submitted");
        dispatch(fetchDetails());
        onRequestClose();
      } else {
        console.log("Submission failed");
      }
    } catch (err: any) {
      const newErrors: Errors = {};
      if (err.response) {
        console.error("Server error:", err.response.data);
      } else if (err.message) {
        console.error("Error message:", err.message);
      }

      if (err.inner) {
        err.inner.forEach((error: yup.ValidationError) => {
          newErrors[error.path!] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <Modal
      className={styles.root}
      style={{
        content: customStyles.modal,
        overlay: customStyles.overlay,
      }}
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      {detail ? <h2>Налаштування товару</h2> : <h2>Додати товар</h2>}
      <form style={customStyles.form} onSubmit={handleSubmit}>
        <MyInput
          name='name'
          type='text'
          label='Назва деталі:'
          onChange={handleChange}
          value={formData.name}
        />
        {errors.name && (
          <p style={customStyles.warningText}>{errors.name}</p>
        )}
        <MyInput
          name='about'
          type='text'
          label='Опис:'
          onChange={handleChange}
          value={formData.about}
        />
        {errors.about && (
          <p style={customStyles.warningText}>{errors.about}</p>
        )}
        <MyInput
          name='cost'
          type='number'
          label='Ціна: '
          onChange={handleChange}
          value={`${formData.cost}`}
        />
        {errors.cost && (
          <p style={customStyles.warningText}>{errors.cost}</p>
        )}
        <MyInput
          name='material'
          type='text'
          label='Матеріал: '
          onChange={handleChange}
          value={formData.material}
        />
        {errors.material && (
          <p style={customStyles.warningText}>{errors.material}</p>
        )}
        <MyInput
          name='weight'
          type='number'
          label='Вага: '
          onChange={handleChange}
          value={`${formData.weight}`}
        />
        {errors.weight && (
          <p style={customStyles.warningText}>{errors.weight}</p>
        )}
        <MyInput
          name='imgs'
          type='text'
          label='Зображення (вказувати через кому) '
          onChange={(e) =>
            handleArrayChange(
              e as ChangeEvent<HTMLInputElement>,
              "imgs"
            )
          }
          value={formData.imgs.join(", ")}
        />
        {errors.imgs && (
          <p style={customStyles.warningText}>{errors.imgs}</p>
        )}
        <MyInput
          name='colors'
          type='text'
          label='Кольори (вказувати через кому) '
          onChange={(e) =>
            handleArrayChange(
              e as ChangeEvent<HTMLInputElement>,
              "colors"
            )
          }
          value={formData.colors.join(", ")}
        />
        {errors.colors && (
          <p style={customStyles.warningText}>{errors.colors}</p>
        )}
        <MyInput
          name='years'
          type='text'
          label='Роки: (вказувати через кому) '
          onChange={(e) =>
            handleArrayChange(
              e as ChangeEvent<HTMLInputElement>,
              "years"
            )
          }
          value={formData.years.join(", ")}
        />
        {errors.years && (
          <p style={customStyles.warningText}>{errors.years}</p>
        )}

        <MyInput
          name='sale'
          type='number'
          label='Знижка %:'
          onChange={handleChange}
          value={`${formData.sale}`}
        />
        {errors.sale && (
          <p style={customStyles.warningText}>{errors.sale}</p>
        )}
        <div className={styles.selectWrapper}>
          <label htmlFor='category'>Категорія: </label>
          <select
            name='category'
            value={formData.category}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value=''>Виберіть категорію:</option>
            <option value='Захист двигуна'>Захист двигуна</option>
            <option value='Захист радіаторів'>
              Захист радіаторів
            </option>
            <option value='Інший захист'>Інший захист</option>
          </select>
        </div>
        {errors.category && (
          <p style={customStyles.warningText}>{errors.category}</p>
        )}
        <MyInput
          name='motorcycles'
          type='text'
          label='Мотоцикли: (вказувати через кому) '
          onChange={(e) =>
            handleArrayChange(
              e as ChangeEvent<HTMLInputElement>,
              "motorcycles"
            )
          }
          value={formData.motorcycles.join(", ")}
        />
        {errors.motorcycles && (
          <p style={customStyles.warningText}>{errors.motorcycles}</p>
        )}
        <div style={customStyles.buttons} className={styles.buttons}>
          {detail ? (
            <MyButton primary={true} type='submit'>
              Оновити
            </MyButton>
          ) : (
            <MyButton primary={true} type='submit'>
              Додати
            </MyButton>
          )}
          <MyButton textColor='black' onClick={onRequestClose}>
            Скасувати
          </MyButton>
        </div>
      </form>
    </Modal>
  );
};

export default DetailModal;
