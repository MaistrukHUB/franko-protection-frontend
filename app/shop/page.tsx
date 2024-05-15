import React from "react";
import styles from "./Shop.module.scss";

import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import nookies from "nookies";
import * as Api from "../../api";

const Shop = () => {
  return <div className={styles.root}>Shop</div>;
};

// export const getServerSideProps: GetServerSideProps = async (
//   ctx: GetServerSidePropsContext
// ) => {
//   const { _token } = nookies.get(ctx);
//   axios.defaults.headers.Authorization = "Bearer" + _token;

//   try {
//     await Api.auth.checkRole();
//     return {
//       props: {},
//     };
//   } catch (error) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }
// };
export default Shop;
