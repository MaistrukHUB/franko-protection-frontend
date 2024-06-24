// app/pages/detail/page.tsx
"use client";

import styles from "./Detail.module.scss";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { CartDetailType } from "@/app/@types/cart";
import { DetailDTO } from "@/app/@types/details";
import { addProduct } from "@/lib/redux/slice/cart";
import { useSearchParams } from "next/navigation"; // Використання useSearchParams
import { MyButton } from "@/app/components";
import CarouselImg from "@/app/components/CarouselImg/CarouselImg";

interface SelectedProductProps {}

const Detail: React.FC<SelectedProductProps> = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Отримання id з параметрів запиту

  const [detail, setDetail] = useState<DetailDTO>({
    id: -1,
    name: "",
    about: "",
    material: "",
    weight: 0,
    cost: 0,
    finalCost: 0,
    imgs: [],
    colors: [],
    years: [0],
    sale: 0,
    category: "Інший захист",
    motorcycles: [],
  });

  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedExtent, setSelectedExtent] = useState<number>(0);

  const items = useAppSelector((state) =>
    state.cartSlice.detailsCart.filter(
      (obj: { name: string }) => obj.name === detail.name
    )
  );

  const countItems = items.reduce((sum, obj: { count: number }) => {
    return obj.count + sum;
  }, 0);

  const handleExtent = (index: number): void => {
    setSelectedExtent(index);
  };

  const handleAddProduct = (): void => {
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

  useEffect(() => {
    async function fetchProduct() {
      if (id) {
        try {
          setIsLoading(true);
          const response = await fetch(
            `http://localhost:6969/detail/get-one/${id}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setDetail(data);
          console.log(data);
          setIsLoading(false);
          window.scrollTo(0, 0);
        } catch (error) {
          console.error("Fetch error:", error);
          setError(true);
          setIsLoading(false);
        }
      }
    }

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading product</div>;
  }

  return (
    <div className={`${styles.selectedProduct} content`}>
      <div className={styles.pagesProduct}>
        <div className={styles.pagesProductCart}>
          {/* {detail.imgs.length > 0 && (
            <img
              className={styles.pagesProductImg}
              src={detail.imgs[0]}
              alt='product'
            />
          )} */}
          <CarouselImg imgs={detail.imgs}/>
          <div className={styles.pagesProductInfo}>
            <h2 className={styles.pagesProductName}>{detail.name}</h2>
            <p className={styles.pagesProductAbout}>
              {" "}
              <span className={styles.subtitel}>Категорія: </span>
              {detail.category}
            </p>
            <p className={styles.pagesProductAbout}>
              {" "}
              <span className={styles.subtitel}>
                Застосовується на:{" "}
              </span>
              {detail.motorcycles.map((motorcycles, index) => (
                <>{motorcycles}, </>
              ))}
            </p>
            <p className={styles.pagesProductAbout}>
              {" "}
              <span className={styles.subtitel}>Роки: </span>
              {detail.years.map((year, index) => (
                <>{year}, </>
              ))}
            </p>
            <p className={styles.pagesProductAbout}>
              {" "}
              <span className={styles.subtitel}>Кольори: </span>
              {detail.colors.map((color, index) => (
                <>{color}, </>
              ))}
            </p>
            <p className={styles.pagesProductAbout}>
              {" "}
              <span className={styles.subtitel}>Вага: </span>
              {detail.weight} г.
            </p>

            <p className={styles.pagesProductAbout}>
              {" "}
              <span className={styles.subtitel}>Матеріал: </span>
              {detail.material}
            </p>
            <p className={styles.pagesProductAbout}>
              {" "}
              <span className={styles.subtitel}>Детальніше: </span>
              {detail.about}
            </p>

            <div className={styles.pagesProductParams}>
              <div
                className={styles.button}
                onClick={handleAddProduct}
              >
            
                <div
                  className={styles.paramsBottomProductBlockBottom}
                >
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
                          {detail.cost} ₴
                        </span>
                      </p>
                    ) : (
                      ""
                    )}

                    <p className={styles.finalCost}>
                      {detail.finalCost}₴
                    </p>
                  </div>
                
                  <div className={styles.button}>
                   
                    <MyButton size={"lg"} primary={true}>
                      Додати
                    </MyButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
