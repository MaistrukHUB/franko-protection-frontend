export type CartDetailType = {
  idCartDetail: string;
  idDetail: number | undefined;
  img: string;
  name: string;
  cost: number;
  count: number;
};

export interface CartSliceState {
  detailsCart: CartDetailType[];
  totalPrice: number;
  totalCount: number;
}
