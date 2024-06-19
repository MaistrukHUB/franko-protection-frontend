"use client";

import React, { useState, useEffect } from "react";
import * as Api from "../../../api";
import styles from "./Shop.module.scss";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { CardProduct, MyButton } from "@/app/components";
import { fetchDetails } from "@/lib/redux/slice/details";
import nookies from "nookies";
import DetailModal from "@/app/components/DetailModal/DetailModal";

const Shop = () => {
  const dispatch = useAppDispatch();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handelShowDetailModal = (): void => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const cookies = nookies.get(null);
      let token = cookies._token;

      if (token) {
        const admin = await Api.auth.checkRole(token);

        if (admin) {
          setIsAdmin(true);
        }
      }
    };
    dispatch(fetchDetails());
    fetchData();
  }, [dispatch]);

  const { details } = useAppSelector((state) => state.detailSlice);
  const [selectedCategory, setSelectedCategory] =
    useState("всі деталі");

  const filterItems = (category: string) => {
    if (category === "всі деталі") {
      return details;
    }
    return details.filter((detail) => detail.category === category);
  };

  const filteredItems = filterItems(selectedCategory);

  return (
    <div className={styles.root}>
      <div className={styles.detailContainer}>
        {isAdmin ? (
          <div className={styles.buttonContainer}>
            <MyButton
              onClick={() => handelShowDetailModal()}
              primary={true}
              size='lg'
            >
              Додати товар
            </MyButton>
          </div>
        ) : (
          ""
        )}
        {isModalOpen ? (
          <DetailModal
            isModalOpen={isModalOpen}
            onRequestClose={closeModal}
          />
        ) : (
          ""
        )}
        <ul className={styles.detailsList}>
          <div>
            <form>
              <h2>Оберіть категорію:</h2>
              <div className={styles.inputItem}>
                {" "}
                <input
                  type='radio'
                  id='all'
                  name='category'
                  value='всі деталі'
                  checked={selectedCategory === "всі деталі"}
                  onChange={() => setSelectedCategory("всі деталі")}
                />
                <label htmlFor='all'>Всі деталі</label>
              </div>
              <br />
              <div className={styles.inputItem}>
                <input
                  type='radio'
                  id='engineProtection'
                  name='category'
                  value='захист двигуна'
                  checked={selectedCategory === "захист двигуна"}
                  onChange={() =>
                    setSelectedCategory("захист двигуна")
                  }
                />
                <label htmlFor='engineProtection'>
                  Захист двигуна
                </label>
              </div>
              <br />
              <div className={styles.inputItem}>
                {" "}
                <input
                  type='radio'
                  id='radiatorProtection'
                  name='category'
                  value='Захист радіаторів'
                  checked={selectedCategory === "Захист радіаторів"}
                  onChange={() =>
                    setSelectedCategory("Захист радіаторів")
                  }
                />
                <label htmlFor='radiatorProtection'>
                  Захист радіаторів
                </label>
              </div>
              <br />
              <div className={styles.inputItem}>
                <input
                  type='radio'
                  id='otherProtection'
                  name='category'
                  value='Інший захист'
                  checked={selectedCategory === "Інший захист"}
                  onChange={() => setSelectedCategory("Інший захист")}
                />
                <label htmlFor='otherProtection'>Інший захист</label>
              </div>
              <br />
            </form>
          </div>
          {filteredItems &&
            filteredItems.map((detail) => (
              <li key={detail.id} className={styles.detailsItem}>
                <CardProduct detail={detail} isAdmin={isAdmin} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Shop;

// import axios from "axios";
// import { GetServerSideProps, GetServerSidePropsContext } from "next";
// import * as Api from "../../../api";
// import { parseCookies } from "nookies";
// const fetchData = async () => {
//   const { _token } = parseCookies();

//   if (_token) {
//     try {
//       const admin = await Api.auth.checkRole(_token);
//       console.log(admin);
//     } catch (error) {
//       console.error("Error while checking role:", error);
//     }
//   }
// };

// fetchData();

{
  /* <div>
        <h2>Фільтр захисту</h2>
        <form>
          <div className={styles.inputItem}>
            {" "}
            <input
              type='radio'
              id='all'
              name='category'
              value='всі деталі'
              checked={selectedCategory === "всі деталі"}
              onChange={() => setSelectedCategory("всі деталі")}
            />
            <label htmlFor='all'>Всі деталі</label>
          </div>
          <br />
          <div className={styles.inputItem}>
            <input
              type='radio'
              id='engineProtection'
              name='category'
              value='захист двигуна'
              checked={selectedCategory === "захист двигуна"}
              onChange={() => setSelectedCategory("захист двигуна")}
            />
            <label htmlFor='engineProtection'>Захист двигуна</label>
          </div>
          <br />
          <div className={styles.inputItem}>
            {" "}
            <input
              type='radio'
              id='radiatorProtection'
              name='category'
              value='Захист радіаторів'
              checked={selectedCategory === "Захист радіаторів"}
              onChange={() =>
                setSelectedCategory("Захист радіаторів")
              }
            />
            <label htmlFor='radiatorProtection'>
              Захист радіаторів
            </label>
          </div>
          <br />
          <div className={styles.inputItem}>
            <input
              type='radio'
              id='otherProtection'
              name='category'
              value='Інший захист'
              checked={selectedCategory === "Інший захист"}
              onChange={() => setSelectedCategory("Інший захист")}
            />
            <label htmlFor='otherProtection'>Інший захист</label>
          </div>
          <br />
        </form>
      </div> */
}
