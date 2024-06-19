"use client";
import React, { useState } from "react";
import styles from "./CardProduct.module.scss";
import { DetailDTO } from "@/app/@types/details";
import MyButton from "../ui/MyButton/MyButton";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { CartDetailType } from "@/app/@types/cart";
import { addProduct } from "@/lib/redux/slice/cart";

import ConfirmModal from "../confirmModal";
import DetailModal from "../DetailModal/DetailModal";
import { fetchDetails } from "@/lib/redux/slice/details";

interface ICardProductProps {
  detail: DetailDTO;
  isAdmin: boolean;
}

const CardProduct: React.FC<ICardProductProps> = ({
  detail,
  isAdmin,
}) => {
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);



  const dispatch = useAppDispatch();

  const handelDeleteDetail = (): void => {
    setShowConfirm(true);
  };

  const handelShowDetailModal = (): void => {
    setIsModalOpen(true);
  };

  const onConfirm = async (): Promise<void> => {
    try {
       // Або отримайте id з параметрів маршруту або стану
      const response = await fetch(`http://localhost:6969/api/products/${detail.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the product');
      }
  
      console.log('Product deleted successfully');
      dispatch(fetchDetails());
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setShowConfirm(false);
    }
  };
  

  const onDeny = (): void => {
    setShowConfirm(false);
  };

  const mouseEnterIconInfo = () => {
    setShowMoreInfo(true);
  };
  const mouseLeaveIconInfo = () => {
    setShowMoreInfo(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

    dispatch(addProduct(detailByCart));
  };
  return (
    <div className={styles.root}>
      {isAdmin ? (
        <>
          <div onClick={handelDeleteDetail}>
            <svg
              className={styles.deleteIcon}
              width='25px'
              height='25px'
              viewBox='0 0 1024 1024'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z' />
            </svg>
          </div>
          <div onClick={handelShowDetailModal}>
            <svg
              className={styles.settingIcon}
              width='25px'
              height='25px'
              version='1.1'
              id='Capa_1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 482.568 482.568'
            >
              <g>
                <g>
                  <path
                    d='M116.993,203.218c13.4-1.8,26.8,2.8,36.3,12.3l24,24l22.7-22.6l-32.8-32.7c-5.1-5.1-5.1-13.4,0-18.5s13.4-5.1,18.5,0
			l32.8,32.8l22.7-22.6l-24.1-24.1c-9.5-9.5-14.1-23-12.3-36.3c4-30.4-5.7-62.2-29-85.6c-23.8-23.8-56.4-33.4-87.3-28.8
			c-4.9,0.7-6.9,6.8-3.4,10.3l30.9,30.9c14.7,14.7,14.7,38.5,0,53.1l-19,19c-14.7,14.7-38.5,14.7-53.1,0l-31-30.9
			c-3.5-3.5-9.5-1.5-10.3,3.4c-4.6,30.9,5,63.5,28.8,87.3C54.793,197.518,86.593,207.218,116.993,203.218z'
                  />
                  <path
                    d='M309.193,243.918l-22.7,22.6l134.8,134.8c5.1,5.1,5.1,13.4,0,18.5s-13.4,5.1-18.5,0l-134.8-134.8l-22.7,22.6l138.9,138.9
			c17.6,17.6,46.1,17.5,63.7-0.1s17.6-46.1,0.1-63.7L309.193,243.918z'
                  />
                  <path
                    d='M361.293,153.918h59.9l59.9-119.7l-29.9-29.9l-119.8,59.8v59.9l-162.8,162.3l-29.3-29.2l-118,118
			c-24.6,24.6-24.6,64.4,0,89s64.4,24.6,89,0l118-118l-29.9-29.9L361.293,153.918z'
                  />
                </g>
              </g>
            </svg>
          </div>
        </>
      ) : (
        ""
      )}
      {showConfirm ? (
        <ConfirmModal
          message={`Видалити продукт ${detail.name}?`}
          confirmButtonText={"Видалити"}
          denyButtonText={"Відмінити"}
          onConfirm={onConfirm}
          onDeny={onDeny}
          setShowConfirm={setShowConfirm}
        />
      ) : (
        ""
      )}
      {isModalOpen ? (
        <DetailModal isModalOpen={isModalOpen} detail={detail} onRequestClose={closeModal}/>
      ) : (
        ""
      )}
      <div>
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
