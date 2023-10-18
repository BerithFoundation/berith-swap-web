import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WalletConnection } from "../actions/types";
import Web3 from "web3";

const initialState: WalletConnection = {
  isWalletConnected: false,
  chainId: "0x0",
  web3: null,
};

const walletConnSlice = createSlice({
  name: "walletConn",
  initialState,
  reducers: {
    setWalletConn: (state, action: PayloadAction<boolean>) => {
      state.isWalletConnected = action.payload;
    },
    setChainId: (state, action: PayloadAction<string>) => {
      state.chainId = action.payload;
    },
    setWeb3: (state, action: PayloadAction<Web3>) => {
      state.web3 = action.payload;
    },
  },
});

export const { setWalletConn, setChainId, setWeb3 } = walletConnSlice.actions;
export default walletConnSlice.reducer;
