import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Status } from "@/app/@types/status";
import { IUserDTO } from "@/api/dto/auth.dto";

const getUserFromSessionStorage = (): IUserDTO | null => {
  if (typeof window !== "undefined") {
    const userString = sessionStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  }
  return null;
};

interface IDetailSliceState {
  user: IUserDTO;
  isLogged: boolean;
}

const initialState: IDetailSliceState = {
  user: getUserFromSessionStorage() || {
    id: null,
    name: "",
    phone: null,
    email: "",
  },
  isLogged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<IUserDTO>) {
      state.user = action.payload;
      state.isLogged = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setLogout(state) {
      state.user = initialState.user;
      state.isLogged = false;
      localStorage.removeItem("user");
    },
  },
});

export const selectUser = (state: RootState) => state.userSlice.user;

export const { setLogin, setLogout } = userSlice.actions;

// Експорт редуктору
export default userSlice.reducer;
