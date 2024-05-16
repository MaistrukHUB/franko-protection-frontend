// pages/index.tsx

import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import nookies from "nookies";
import * as Api from "../api";
import React from "react";
import { CarouselSale, MainBlock } from "./components";

const Home = async () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      <MainBlock />
      <CarouselSale />
    </div>
  );
};

export default Home;
