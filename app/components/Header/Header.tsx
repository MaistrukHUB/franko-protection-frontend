"use client";
import NavHeader from "../NavHeader/NavHeader";
import MyButton from "../ui/MyButton/MyButton";
import styles from "./Header.module.scss";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  return (
    <div className={styles.root}>
      <Link href={"/admin"} className={styles.headerLogo}>
        <img src='https://i.postimg.cc/4y0JwnYb/FP.png' alt='Logo' />
      </Link>
      <NavHeader />
      <MyButton
        buttonColor='black'
        textColor='white'
        onClick={() => router.push("/login")}
        size={"lg"}
      >
        Увійти
      </MyButton>
    </div>
  );
};

export default Header;
