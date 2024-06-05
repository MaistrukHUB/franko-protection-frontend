import React, { useState } from "react";
import { useDispatch } from "react-redux";

import style from "./CartItem.module.scss";
import {
  Theme,
  toast,
  ToastContainer,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmModal from "../confirmModal";
import { CartDetailType } from "@/app/@types/cart";
import {
  addProduct,
  minusProduct,
  removeProduct,
} from "@/lib/redux/slice/cart";
import { configToast } from "../../../lib/toastify";
import Link from "next/link";

export interface ICartItemProps {
  detailCart: CartDetailType;
}

const CartItem: React.FC<ICartItemProps> = ({ detailCart }) => {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const onClickPlus = (): void => {
    dispatch(addProduct(detailCart));
    toast.success("Продукт додано!", { ...configToast });
  };

  const onClickMinus = (): void => {
    if (detailCart.count <= 1) {
      setShowConfirm(true);
    } else {
      dispatch(minusProduct(detailCart));
      toast.info("Видалено!", { ...configToast });
    }
  };

  const onClickRemove = (): void => {
    setShowConfirm(true);
  };

  const onConfirmDeleteProduct = async (): Promise<void> => {
    dispatch(removeProduct(detailCart));
    toast.info("Видалено!", { ...configToast });
  };

  const onDeny = (): void => {
    setShowConfirm(false);
  };

  return (
    <div className={style.cartItem}>
      <div className={style.cartItemLeft}>
        <div className={style.cartItemImg}>
          <Link href={`/product/${detailCart.idDetail}`}>
            <img
              className={style.pizzaBlockImage}
              src={detailCart.img}
              alt='product'
            />
          </Link>
        </div>
        <div className={style.cartItemInfo}>
          <div className={style.cartItemInfoTitle}>
            {detailCart.name}
          </div>
          <div className={style.cartItemInfoText}>
            ціна: {detailCart.cost} ₴.
          </div>
        </div>
      </div>
      <div className={style.cartItemRight}>
        <div className={style.cartItemCount}>
          <div onClick={onClickMinus} className={style.buttonMinus}>
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
                fill='#EB5A1E'
              />
              <path
                d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                fill='#EB5A1E'
              />
            </svg>
          </div>
          <b>{detailCart.count}</b>
          <div onClick={onClickPlus} className={style.buttonPlus}>
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
                fill='#EB5A1E'
              />
              <path
                d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                fill='#EB5A1E'
              />
            </svg>
          </div>
        </div>
        <div className={style.cartItemPrice}>
          <b>{detailCart.count * detailCart.cost} ₴</b>
        </div>
        <div className={style.cartItemRemove}>
          <div onClick={onClickRemove} className={style.buttonRemove}>
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
                fill='#EB5A1E'
              />
              <path
                d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                fill='#EB5A1E'
              />
            </svg>
          </div>
        </div>
      </div>
      {showConfirm ? (
        <ConfirmModal
          message={`Видалити продукт?`}
          confirmButtonText={"Видалити"}
          denyButtonText={"Відмінити"}
          onConfirm={onConfirmDeleteProduct}
          onDeny={onDeny}
          setShowConfirm={setShowConfirm}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default CartItem;
