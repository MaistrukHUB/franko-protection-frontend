import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { CartDetailType, CartSliceState } from "@/app/@types/cart";

const initialState: CartSliceState = {
  detailsCart: [],
  totalPrice: 0,
  totalCount: 0,
};

const updateTotalPriceCount = (state: CartSliceState) => {
  state.totalCount = state.detailsCart.reduce((sum, obj) => {
    return obj.count + sum;
  }, 0);

  state.totalPrice = state.detailsCart.reduce((sum, obj) => {
    return obj.cost * obj.count + sum;
  }, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartDetailType>) {
      const findProduct = state.detailsCart.find(
        (obj) =>
          obj.name === action.payload.name &&
          obj.cost === action.payload.cost
      );
      if (findProduct) {
        findProduct.count++;
      } else {
        state.detailsCart.push({
          ...action.payload,
          count: action.payload.count ? action.payload.count : 1,
        });
      }
      updateTotalPriceCount(state);
    },
    minusProduct(state, action: PayloadAction<CartDetailType>) {
      const findProduct = state.detailsCart.find(
        (obj) => obj.idCartDetail === action.payload.idCartDetail
      );
      if (findProduct && findProduct.count <= 1) {
        state.detailsCart = state.detailsCart.filter(
          (obj) => obj.idCartDetail !== action.payload.idCartDetail
        );
      } else if (findProduct && findProduct.count > 1) {
        findProduct.count--;
      }
      updateTotalPriceCount(state);
    },
    removeProduct(state, action: PayloadAction<CartDetailType>) {
      state.detailsCart = state.detailsCart.filter(
        (obj) => obj.idCartDetail !== action.payload.idCartDetail
      );
      updateTotalPriceCount(state);
    },
    clearCart(state) {
      state.detailsCart = [];
      updateTotalPriceCount(state);
    },
  },
});

export const selectCartProducts = (state: RootState) =>
  state.cartSlice.detailsCart;
export const selectCart = (state: RootState) => state.cartSlice;

export const { addProduct, removeProduct, minusProduct, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
