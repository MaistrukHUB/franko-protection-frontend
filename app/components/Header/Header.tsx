"use client";
import NavHeader from "../NavHeader/NavHeader";
import MyButton from "../ui/MyButton/MyButton";
import styles from "./Header.module.scss";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import * as Api from "../../../api";
import { initializeUser, setLogout } from "@/lib/redux/slice/user";

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state.userSlice.user);

  const handelLogin = () => {
    router.push("/login");
  };
  const handelLogout = async () => {
    await Api.auth.logout();
    dispatch(setLogout());
    router.push("/");
  };

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <Link href={"/"} className={styles.headerLogo}>
          <img
            src='https://i.postimg.cc/4y0JwnYb/FP.png'
            alt='Logo'
          />
          Hard enduro
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
              onClick={() => handelLogout()}
              size={"md"}
            >
              Вийти
            </MyButton>
          </div>
        ) : (
          <MyButton
            buttonColor='black'
            textColor='white'
            onClick={() => handelLogin()}
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
