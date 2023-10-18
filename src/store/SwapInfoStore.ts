import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SwapInfo } from "../actions/types";

const initialState: SwapInfo = {
  swapAddress: "",
  swapAmount: 0,
};

const swapInfoSlice = createSlice({
  name: "swapInfo",
  initialState,
  reducers: {
    setSwapAddress: (state, action: PayloadAction<string>) => {
      state.swapAddress = action.payload;
    },
    setSwapAmount: (state, action: PayloadAction<number>) => {
      state.swapAmount = action.payload;
    },
  },
});

export const { setSwapAddress, setSwapAmount } = swapInfoSlice.actions;
export default swapInfoSlice.reducer;
