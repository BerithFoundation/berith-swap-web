import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SwapInfo } from "../actions/types";

const initialState: SwapInfo = {
  swapAddress: "",
  swapAmount: 0,
  explorURL: "",
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
    setExplorURL: (state, action: PayloadAction<string>) => {
      state.explorURL = action.payload;
    },
  },
});

export const { setSwapAddress, setSwapAmount, setExplorURL } =
  swapInfoSlice.actions;
export default swapInfoSlice.reducer;
