"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import styles from "./MainSwiper.module.scss";
import CardProduct from "../CardProduct/CardProduct";
import { DetailDTO } from "@/app/@types/details";

interface IMainSwiperProps {
  details: DetailDTO[];
}

const MainSwiper: React.FC<IMainSwiperProps> = ({ details }) => {
  const swiperRef = useRef<any>(null);

  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.swiper.autoplay) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.swiper.autoplay) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return (
    <div
      className={styles.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Swiper
        ref={swiperRef}
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          1450: {
            slidesPerView: 2,
          },
          1600: {
            slidesPerView: 3,
          },
        }}
        className='mySwiper'
      >
        {details &&
          details.map((detail: DetailDTO) => (
            <SwiperSlide key={detail.id} className={styles.slide}>
              <CardProduct detail={detail} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MainSwiper;
