import React from "react";
import styles from "./CarouselSale.module.scss";
import MainSwiper from "../MainSwiper/MainSwiper";
import { useAppSelector } from "@/lib/hooks/hooks";

const CarouselSale = () => {
  const { details } = useAppSelector((state) => state.detailSlice);

  const detailsWithPositiveSale = details.filter(
    (detail) => detail.sale
  );

  return (
    <div className={styles.root}>
      <div className={styles.infoBlock}>
        <h2 className={styles.subtitle}>Aкційні пропозиції</h2>
      </div>
      <MainSwiper details={detailsWithPositiveSale} />
    </div>
  );
};

export default CarouselSale;
