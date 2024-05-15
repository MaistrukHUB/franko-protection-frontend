import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../index";

export type VisibleType = {
  visible: boolean;
};

const initialState: VisibleType = {
  visible: false,
};

const overflowHidden = createSlice({
  name: "overflowHidden",
  initialState,
  reducers: {
    changeVisibleValue(state, action: PayloadAction<VisibleType>) {
      state.visible = action.payload.visible;
    },
  },
});

export const visibleValue = (state: RootState) =>
  state.overflowHiddenSlice.visible;

export const { changeVisibleValue } = overflowHidden.actions;

export default overflowHidden.reducer;
