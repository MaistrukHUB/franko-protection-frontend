"use client";
import React, { useState } from "react";
import styles from "./CardProduct.module.scss";
import { DetailDTO } from "@/app/@types/details";
import MyButton from "../ui/MyButton/MyButton";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { CartDetailType } from "@/app/@types/cart";
import { addProduct } from "@/lib/redux/slice/cart";
import { ToastContainer, toast } from "react-toastify";
import { configToast } from "../../../lib/toastify";
import "react-toastify/dist/ReactToastify.css";

interface ICardProductProps {
  detail: DetailDTO;
}

const CardProduct: React.FC<ICardProductProps> = ({ detail }) => {
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const mouseEnterIconInfo = () => {
    setShowMoreInfo(true);
  };
  const mouseLeaveIconInfo = () => {
    setShowMoreInfo(false);
  };

  const handelAddProduct = (): void => {
    const detailByCart: CartDetailType = {
      idCartDetail: Date.now().toString(),
      idDetail: detail.id,
      name: detail.name,
      img: detail.imgs[0],
      cost: detail.cost,
      count: 0,
    };
    toast.success("Продукт додано!", { ...configToast });

    dispatch(addProduct(detailByCart));
  };
  return (
    <div className={styles.root}>
      <div>
        {/* <button onClick={notify}>Notify!</button> */}
        <ToastContainer />
      </div>
      <div className={styles.contentSlide}>
        <img
          src='https://i.postimg.cc/3rCNyf9W/photo-2024-05-13-11-25-49-removebg-preview.png'
          alt=''
        />
      </div>
      <h3 className={styles.nameDetail}>{detail.name}</h3>
      <div className={styles.infoText}>
        <div className={styles.bottomBlock}>
          <div className={styles.costBlock}>
            {detail.sale ? (
              <p className={styles.cost}>
                <span
                  style={{
                    color: detail.sale > 0 ? "red" : "",
                    textDecoration:
                      detail.sale > 0 ? "line-through" : "",
                  }}
                >
                  {detail.cost}грн.
                </span>
              </p>
            ) : (
              ""
            )}

            <p className={styles.finalCost}>{detail.finalCost}грн</p>
          </div>
          <MyButton
            onClick={() => handelAddProduct()}
            size={"md"}
            primary={true}
          >
            Купити
          </MyButton>
        </div>
      </div>

      <div
        onMouseEnter={() => mouseEnterIconInfo()}
        onMouseLeave={() => mouseLeaveIconInfo()}
        className={styles.iconInfo}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 50 50'
          width='25px'
          height='25px'
        >
          <path d='M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z' />
        </svg>
        {showMoreInfo ? (
          <div className={styles.modalMoreInfo}>
            <div className={styles.moreInfoText}>
              {/* <p> Застосовується на:</p> */}
              <ul className={styles.listMotos}>
                <p>Мотоцикли:</p>
                {detail &&
                  detail.motorcycles &&
                  detail.motorcycles.map((moto, index) => (
                    <li className={styles.listMotoItem} key={index}>
                      <p>
                        {moto}{" "}
                        {index < detail.motorcycles.length - 1
                          ? ","
                          : ""}
                      </p>
                    </li>
                  ))}
              </ul>

              <ul className={styles.listYers}>
                <p>Роки:</p>
                {detail &&
                  detail.years &&
                  detail.years.map((year, index) => (
                    <li className={styles.listMotoItem} key={index}>
                      <p>
                        {" "}
                        {year}{" "}
                        {index < detail.years.length - 1 ? "," : ""}
                      </p>
                    </li>
                  ))}
              </ul>
              <ul className={styles.listYers}>
                <p>Кольори:</p>
                {detail &&
                  detail.colors &&
                  detail.colors.map((year, index) => (
                    <li className={styles.listMotoItem} key={index}>
                      <p>
                        {" "}
                        {year}{" "}
                        {index < detail.colors.length - 1 ? "," : ""}
                      </p>
                    </li>
                  ))}
              </ul>
              <div className={styles.listYers}>
                <p>Вага: </p>{" "}
                <div className={styles.infoItem}>
                  {" "}
                  {detail.weight}г.
                </div>
              </div>
              <div className={styles.listYers}>
                Детальніше:
                <div className={styles.infoItem}>{detail.about}</div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.circle}></div>
    </div>
  );
};

export default CardProduct;
