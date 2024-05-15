import React from "react";
import styles from "./CarouselSale.module.scss";

const CarouselSale = () => {
  return (
    <div className={styles.root}>
      <div className={styles.infoBlock}>
        <h2 className={styles.subtitle}>Aкційні пропозиції</h2>
        <p className={styles.title}>Продукти</p>
      </div>
    </div>
  );
};

export default CarouselSale;
