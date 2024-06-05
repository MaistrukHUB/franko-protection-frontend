import React, { FC } from "react";
import style from "./CartEmpty.module.scss";
import cartEmptyImg from "../../../assets/img/empty-cart.png";
import Link from "next/link";
import Image from "next/image";
import MyButton from "../ui/MyButton/MyButton";
import { useRouter } from "next/navigation";

const CartEmpty: FC = () => {
  const router = useRouter();

  return (
    <div className={style.root}>
      <h2>Корзина пуста</h2>
      <p>
        Скоріш за все, ви ще не додали продуктів до корзини.
        <br />
        Для того щоб замовити продукцію потрібно, перейдіть на
        сторінку магазину.
      </p>
      <Image width={200} src={cartEmptyImg} alt='Empty cart' />
      <MyButton onClick={() => router.push("/shop")} primary={true}>
        <span>Перейти до покупок</span>
      </MyButton>
    </div>
  );
};

export default CartEmpty;
