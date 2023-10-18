import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Account } from "../actions/types";

const initialState: Account = {
  address: "",
  balance: 0,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
  },
});

export const { setAddress, setBalance } = accountSlice.actions;
export default accountSlice.reducer;
