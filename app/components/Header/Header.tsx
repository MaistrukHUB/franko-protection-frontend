"use client";
import NavHeader from "../NavHeader/NavHeader";
import MyButton from "../ui/MyButton/MyButton";
import styles from "./Header.module.scss";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks/hooks";

const Header = () => {
  const router = useRouter();

  const user = useAppSelector((state) => state.userSlice.user);

  const handelLogout = () => {
    router.push("/login");
  };

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <Link href={"/admin"} className={styles.headerLogo}>
          <img
            src='https://i.postimg.cc/4y0JwnYb/FP.png'
            alt='Logo'
          />
        </Link>
        <div className={styles.navHeader1}>
          <NavHeader />
        </div>
        {user.id ? (
          <div className={styles.userLogout}>
            Кориcтувач:
            <h2>{user.name}</h2>
            <MyButton
              buttonColor='black'
              textColor='white'
              onClick={() => router.push("/")}
              size={"md"}
            >
              Вийти
            </MyButton>
          </div>
        ) : (
          <MyButton
            buttonColor='black'
            textColor='white'
            onClick={() => handelLogout()}
            size={"lg"}
          >
            Увійти
          </MyButton>
        )}
      </div>

      <div className={styles.navHeader2}>
        <NavHeader />
      </div>
    </div>
  );
};

export default Header;
