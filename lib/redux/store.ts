import { configureStore } from "@reduxjs/toolkit";
import overflowHiddenSlice from "./slice/overflowHidden/index";
import detailSlice from "./slice/details/index";
import userSlice from "./slice/user/index";
import cartSlice from "./slice/cart";

export const makeStore = () => {
  return configureStore({
    reducer: {
      overflowHiddenSlice,
      userSlice,
      detailSlice,
      cartSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
