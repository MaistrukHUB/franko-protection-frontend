"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import styles from "./MainSwiper.module.scss";
import MainSlide from "../MainSlide/MainSlide";

const MainSwiper = () => {
  return (
    <div className={styles.root}>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{
          delay: 4500,
          disableOnInteraction: true,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        className='mySwiper'
      >
        <SwiperSlide className={styles.slide}>
          <MainSlide />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <MainSlide />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <MainSlide />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <MainSlide />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainSwiper;
