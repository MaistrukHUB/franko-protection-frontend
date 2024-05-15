import { configureStore } from "@reduxjs/toolkit";
import overflowHiddenSlice from "./slice/overflowHidden/index";

export const makeStore = () => {
  return configureStore({
    reducer: {
      overflowHiddenSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
