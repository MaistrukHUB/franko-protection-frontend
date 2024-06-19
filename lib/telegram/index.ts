import { CartDetailType } from "@/app/@types/cart";
import axios from "axios";


export interface IFormDataByOrder {
  name: string;
  phone: number | null;
  email: string;
}

const TOKEN: string =
  "6035490675:AAHiOj1PMoKX3yYW3cuz4Ai0FNP_da5iFbE";
const CHAT_ID: string = "-1001972265061";
const URI_API: string = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

let LIST_BY_MESSAGE: string = "";

export const handelSandOrder = (
  formData: IFormDataByOrder,
  totalPrice: number,
  item: CartDetailType[]
) => {
  let message: string = "";

  message += `<b>ЗАЯВКА НА ПОКУПКУ</b>\n`;
  message += `<b>Замовник: </b>${formData.name} \n`;
  message += `<b>Телефон: </b>${formData.phone} \n`;
  message += `<b>Email: </b>${formData.email} \n`;
  message += `<b>Загальна сума: </b>${totalPrice} грн. \n`;

  axios.post(URI_API, {
    chat_id: CHAT_ID,
    parse_mode: "html",
    text: message + LIST_BY_MESSAGE,
  });
  LIST_BY_MESSAGE = "";
};

export const createListByOrder = (productsCart: CartDetailType[]) => {
  const LIST_BY_ORDER: string[] =
    productsCart &&
    productsCart.map((product) => {
      return (LIST_BY_MESSAGE +=
        `<b>Продукт: </b>${product.name}` +
        `<b>  Кількість:</b>${product.count} \n`);
    });
  return LIST_BY_ORDER;
};

export const createNewOrder = (
  productsCart: CartDetailType[],
  formData: IFormDataByOrder,
  totalPrice: number
) => {
  createListByOrder(productsCart);
  handelSandOrder(formData, totalPrice, productsCart);
};
export const sendNewQuestion = (
  question: string,
  formData: IFormDataByOrder
) => {
  handelSandQuestion(question, formData);
};

export const handelSandQuestion = (
  question: string,
  formData: IFormDataByOrder
) => {
  let message: string = "";

  message += `<b>Запитання від: </b>${formData.name} \n`;
  message += `<b>Телефон: </b>${formData.phone} \n`;
  message += `<b>Email: </b>${formData.email} \n`;
  message += `<b>Запитання: </b>${question} \n`;

  axios.post(URI_API, {
    chat_id: CHAT_ID,
    parse_mode: "html",
    text: message,
  });
  LIST_BY_MESSAGE = "";
};
