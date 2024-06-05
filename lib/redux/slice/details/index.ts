import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { instance } from "../../../../utils/axios";
import { DetailDTO } from "@/app/@types/details";
import { Status } from "@/app/@types/status";

export const fetchDetails = createAsyncThunk(
  "details/fetchDetails",
  async () => {
    const { data } = await instance.get(
      "http://localhost:6969/detail/get-all"
    );
    return data as DetailDTO[];
  }
);

interface DetailSliceState {
  details: DetailDTO[];
  status: Status;
}

const initialState: DetailSliceState = {
  details: [],
  status: Status.LOADING,
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setDetails(state, action) {
      state.details = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDetails.pending, (state) => {
      state.details = [];
      state.status = Status.LOADING;
    });
    builder.addCase(
      fetchDetails.fulfilled,
      (state, action: PayloadAction<DetailDTO[]>) => {
        state.details = action.payload;
        state.status = Status.SUCCESS;
      }
    );
    builder.addCase(fetchDetails.rejected, (state) => {
      state.details = [];
      state.status = Status.ERROR;
    });
  },
});

export const selectDetails = (state: RootState) =>
  state.detailSlice.details;

export const { setDetails } = detailSlice.actions;

export default detailSlice.reducer;
