"use client";

import { useAppSelector } from "@/lib/hooks/hooks";
import styles from "./Cart.module.scss";
import React, { useState } from "react";
import { MyButton } from "@/app/components";
import CartItem from "@/app/components/cartItem";
import CreateOrderForm from "@/app/components/createOrderForm";
import CartEmpty from "@/app/components/cartEmpty";

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { detailsCart, totalCount, totalPrice } = useAppSelector(
    (state) => state.cartSlice
  );
  const { user, isLogged } = useAppSelector(
    (state) => state.userSlice
  );

  const handleCreateOrder = (): void => {
    setIsModalOpen(true);
  };
  console.log(detailsCart);
  return (
    <div className={styles.root}>
      {detailsCart.length !== 0 ? (
        <>
          <div className={styles.cartContainer}>
            <div className={styles.orderList}>
              <h2 className={styles.titleCart}>КОРЗИНА</h2>
              <ul className={styles.orderListItems}>
                {detailsCart &&
                  detailsCart.map((detailCart, index) => (
                    <li
                      className={styles.orderListItem}
                      key={detailCart.idCartDetail}
                    >
                      <CartItem detailCart={detailCart} />
                    </li>
                  ))}
              </ul>
            </div>
            <div className={styles.confirmOrder}>
              <div className={styles.totalPrice}>
                Загальна сума: {totalCount}
              </div>
              <div className={styles.totalCount}>
                Занальна кількість: {totalPrice}
              </div>
              <MyButton
                onClick={handleCreateOrder}
                size={"lg"}
                primary={true}
              >
                Купити
              </MyButton>
            </div>
          </div>
          <CreateOrderForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            detailsCart={detailsCart}
          />
        </>
      ) : (
        <CartEmpty />
      )}
    </div>
  );
};

export default Cart;
