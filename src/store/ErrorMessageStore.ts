import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorType, ErrorMessage } from "../actions/types";

const initialState: ErrorMessage = {
  type: ErrorType.NoError,
  message: "",
};

const errorMessageSlice = createSlice({
  name: "walletConn",
  initialState,
  reducers: {
    setErrorMessage: (
      state,
      action: PayloadAction<{ err: ErrorType; isEng: boolean }>
    ) => {
      if (action.payload.isEng) {
        switch (action.payload.err) {
          case ErrorType.NotInstalled:
            state.type = ErrorType.NotInstalled;
            state.message = "Please install the Metamask";
            break;
          case ErrorType.NotConnected:
            state.type = ErrorType.NotConnected;
            state.message = "Please connect the metamask";
            break;
          case ErrorType.CannotSwitchNetwork:
            state.type = ErrorType.CannotSwitchNetwork;
            state.message = "Failed to switch Berith network.";
            break;
          case ErrorType.CannotAddNetwork:
            state.type = ErrorType.CannotAddNetwork;
            state.message = "Failed to add Berith network.";
            break;
          case ErrorType.InvalidNetwork:
            state.type = ErrorType.InvalidNetwork;
            state.message = "Select the Berith-chain network in the Metamask";
            break;
          case ErrorType.NoAccounts:
            state.type = ErrorType.NoAccounts;
            state.message = "There is no account registered with Metamask.";
            break;
          case ErrorType.InvalidAddress:
            state.type = ErrorType.InvalidAddress;
            state.message = "The receiving address is not formatted correctly.";
            break;
          case ErrorType.InvalidAmount:
            state.type = ErrorType.InvalidAmount;
            state.message =
              "The quantity you entered is not formatted correctly.";
            break;
          case ErrorType.ZeroBalance:
            state.type = ErrorType.ZeroBalance;
            state.message = "You don't have any BERS coins.";
            break;
          case ErrorType.InsufficientBalance:
            state.type = ErrorType.InsufficientBalance;
            state.message = "BERS on hand is less than the requested quantity.";
            break;
          case ErrorType.DepositFailed:
            state.type = ErrorType.DepositFailed;
            state.message = "BERS deposit failed.";
            break;
          case ErrorType.NoError:
            state.type = ErrorType.NoError;
            state.message = "";
            break;
        }
      } else {
        switch (action.payload.err) {
          case ErrorType.NotInstalled:
            state.type = ErrorType.NotInstalled;
            state.message = "Metamask를 설치해 주세요";
            break;
          case ErrorType.NotConnected:
            state.type = ErrorType.NotConnected;
            state.message = "Metamask를 연결해 주세요";
            break;
          case ErrorType.CannotSwitchNetwork:
            state.type = ErrorType.CannotSwitchNetwork;
            state.message = "Berith network로 전환에 실패하였습니다.";
            break;
          case ErrorType.CannotAddNetwork:
            state.type = ErrorType.CannotAddNetwork;
            state.message = "Berith network 추가에 실패하였습니다.";
            break;
          case ErrorType.InvalidNetwork:
            state.type = ErrorType.InvalidNetwork;
            state.message =
              "Metamask에서 Berith-chain 네트워크를 선택해 주세요";
            break;
          case ErrorType.NoAccounts:
            state.type = ErrorType.NoAccounts;
            state.message = "Metamask에 등록된 Account가 없습니다.";
            break;
          case ErrorType.InvalidAddress:
            state.type = ErrorType.InvalidAddress;
            state.message = "수신 Address의 형식이 올바르지 않습니다.";
            break;
          case ErrorType.InvalidAmount:
            state.type = ErrorType.InvalidAmount;
            state.message = "입력한 수량의 형식이 올바르지 않습니다.";
            break;
          case ErrorType.ZeroBalance:
            state.type = ErrorType.ZeroBalance;
            state.message = "보유한 BERS 코인이 없습니다.";
            break;
          case ErrorType.InsufficientBalance:
            state.type = ErrorType.InsufficientBalance;
            state.message = "보유 BERS가 요청한 수량보다 부족합니다.";
            break;
          case ErrorType.DepositFailed:
            state.type = ErrorType.DepositFailed;
            state.message = "전송에 실패하였습니다.";
            break;
          case ErrorType.NoError:
            state.type = ErrorType.NoError;
            state.message = "";
            break;
        }
      }
    },
  },
});

export const { setErrorMessage } = errorMessageSlice.actions;
export default errorMessageSlice.reducer;
