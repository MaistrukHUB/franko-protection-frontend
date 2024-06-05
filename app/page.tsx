// pages/index.tsx
"use client";
import React from "react";
import { CarouselSale, MainBlock } from "./components";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { fetchDetails } from "@/lib/redux/slice/details";

const Home = async () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchDetails());
  }, [dispatch]);
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      <MainBlock />
      <CarouselSale />
    </div>
  );
};

export default Home;
