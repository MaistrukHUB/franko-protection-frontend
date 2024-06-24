import React, { useRef } from "react";
import styles from "./CarouselImg.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";

interface ICarouselImgProps {
  imgs: string[];
}

const CarouselImg: React.FC<ICarouselImgProps> = ({ imgs }) => {
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={styles.root}
    >
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
      
        className='mySwiper'
      >
        {imgs &&
          imgs.map((img: string) => (
            <SwiperSlide key={img} className={styles.slide}>
              <img
                className={styles.pagesProductImg}
                src={img}
                alt='product'
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default CarouselImg;
