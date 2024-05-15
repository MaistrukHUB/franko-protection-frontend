"use client";
import React from "react";
import styles from "./MainBlock.module.scss";
import MyButton from "../ui/MyButton/MyButton";
import { useRouter } from "next/navigation";

const MainBlock = () => {
  const router = useRouter();

  return (
    <div className={styles.root}>
      <div className={styles.infoBlock}>
        <h1 className={styles.title}>
          Виготовлення захисту для вашого моциклу
        </h1>
        <p className={styles.subtitle}>
          Якщо ви бажаєте виготовити деталь під замовлення
        </p>
        <MyButton
          onClick={() => router.push("/register")}
          size='lg'
          buttonColor={"var(--linear-button)"}
        >
          Звязаться з нами
        </MyButton>
      </div>
      <div className={styles.imgBlock}>
        <img
          src='https://kovi.dp.ua/content/images/1/400x309l85nn0/53362290680631.png'
          alt=''
        />
      </div>
      <div className={styles.bottomGeometry}>
        <div className={styles.geometryOne}></div>
        <svg
          className={styles.geometryTwo}
          viewBox='0 0 800 100'
          preserveAspectRatio='xMinYMin meet'
        >
          <path d='M0,100 C150,500 50,0 400,400 V100,0 C130,0 200,200 0,0 Z'></path>
        </svg>

        <div className={styles.geometryThree}></div>
      </div>
    </div>
  );
};

export default MainBlock;
